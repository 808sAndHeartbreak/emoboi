# SF6 帧数计算器 - 更新影响分析

## 📊 本次更新内容总结

### 新增功能
1. ✅ 收藏页面"合并同压制"开关
2. ✅ 收藏卡片重新设计（显示Hit/Block帧数）
3. ✅ 收藏页面可删除单个场景
4. ✅ 自动扩展场景可删除（隐藏）
5. ✅ 布兰卡新规则：禁止"民工连滑铲+轻滚接近"
6. ✅ 收藏模板支持 `excludedScenarios`（排除特定场景）

### 数据结构变更
1. **收藏模板新增字段**：`excludedScenarios: {}`
2. **新增全局状态**：`state.excludedAutoExpanded`
3. **新增localStorage键**：`sf6_{char}_excludedAutoExpanded`

---

## 🔍 对现有用户的影响分析

### 1️⃣ **收藏数据兼容性** ✅ 完全兼容

#### 旧数据结构
```javascript
{
    id: 'my',
    name: '我的收藏',
    favorites: ["5LP||2MP|20", ...],
    mixupFavorites: [...]
}
```

#### 新数据结构
```javascript
{
    id: 'my',
    name: '我的收藏',
    favorites: ["5LP||2MP|20", ...],
    mixupFavorites: [...],
    excludedScenarios: {}  // ← 新增，默认为空对象
}
```

**兼容性处理**：
- ✅ `initCharacterTemplates` 函数会自动为所有模板添加 `excludedScenarios: {}`
- ✅ 旧用户的收藏完全保留，不会丢失
- ✅ 导入旧版导出文件时，`excludedScenarios` 默认为 `{}`

**代码位置**：
```javascript
// 确保所有模板都有 excludedScenarios 字段（兼容旧数据）
Object.values(state.favoriteTemplates[char].templates).forEach(template => {
    if (!template.excludedScenarios) {
        template.excludedScenarios = {};
    }
});
```

---

### 2️⃣ **场景数据兼容性** ✅ 完全兼容

#### 变更内容
- 新增：自动扩展场景可以被"隐藏"（添加到排除列表）
- 新增：`state.excludedAutoExpanded[char] = []`

**兼容性处理**：
- ✅ 旧用户没有排除列表，`loadExcludedAutoExpanded` 返回空数组 `[]`
- ✅ 所有场景正常显示，和之前一样
- ✅ 只有用户主动删除自动扩展场景后，才会写入排除列表

**影响**：
- **0影响**：旧用户看到的场景和之前完全一样
- **新功能**：用户现在可以删除不需要的自动扩展场景

---

### 3️⃣ **预设数据更新** ✅ 自动同步

#### 变更内容
- 布兰卡新规则：禁止"民工连滑铲+轻滚接近"
- 数据版本号：`DATA_VERSION = 2`

**兼容性处理**：
```javascript
// 检查数据版本，如果版本不匹配则清除缓存
const savedVersion = localStorage.getItem('sf6_data_version');
if (savedVersion !== String(DATA_VERSION)) {
    console.log(`数据版本更新: ${savedVersion} -> ${DATA_VERSION}，清除角色缓存`);
    localStorage.setItem('sf6_data_version', String(DATA_VERSION));
    state.characterCache = {}; // 清除角色数据缓存，但保留用户数据
}
```

**影响**：
- ✅ 旧用户刷新页面后，自动清除角色数据缓存
- ✅ 重新加载最新的预设 moves 和 scenarios
- ✅ **用户自定义数据不受影响**（用户添加的场景、规则、收藏等都保留）
- ✅ 新规则自动生效（布兰卡的"民工连滑铲"不再生成"+轻滚接近"的扩展）

---

### 4️⃣ **收藏页面UI变化** ✅ 向后兼容

#### 变更内容
- 新增"合并同压制"开关（默认关闭）
- 卡片布局优化（显示Hit/Block帧数）
- 删除按钮从 `★` 改为 `×`（悬停显示）

**兼容性处理**：
- ✅ `state.favoriteMergeSameMeaty` 默认值为 `false`
- ✅ 默认显示和之前类似的布局（非合并模式）
- ✅ 所有收藏的方案都能正常显示

**影响**：
- **UI变化**：布局更清晰，信息更完整
- **体验提升**：用户可以看到Hit/Block帧数
- **新功能**：用户可以开启"合并同压制"查看不同帧数下的同一压制招式

---

### 5️⃣ **导入导出兼容性** ✅ 双向兼容

#### 导出格式变化
```javascript
// 旧版导出
{
    name: "我的收藏",
    character: "BLANKA",
    favorites: [...],
    mixupFavorites: [...]
}

// 新版导出
{
    name: "我的收藏",
    character: "BLANKA",
    favorites: [...],
    mixupFavorites: [...],
    excludedScenarios: {}  // ← 新增
}
```

**兼容性处理**：
```javascript
// 导入时
excludedScenarios: data.excludedScenarios || {}  // 旧文件没有此字段时默认为 {}
```

**影响**：
- ✅ **新版可导入旧版文件**：缺失的 `excludedScenarios` 自动补全为 `{}`
- ✅ **旧版无法导入新版文件**：但只是忽略 `excludedScenarios` 字段，不会报错
- ✅ 用户的收藏方案完整保留

---

### 6️⃣ **性能影响** ✅ 可忽略

#### 新增计算
- 每次加载场景时过滤 `excludedAutoExpanded` 列表
- 收藏页面渲染时过滤 `excludedScenarios`

**影响**：
- ✅ 过滤操作时间复杂度 O(n)，n 为场景数量（通常 < 100）
- ✅ 对用户体验无影响（毫秒级）

---

## ✅ 兼容性结论

### 🎯 对旧用户的影响：**零破坏性更新**

1. **数据保留**：
   - ✅ 所有用户收藏完整保留
   - ✅ 用户自定义场景完整保留
   - ✅ 用户自定义规则完整保留
   - ✅ 所有设置（排序、模板等）完整保留

2. **功能增强**：
   - ✅ 收藏页面信息更完整（显示Hit/Block）
   - ✅ 新增"合并同压制"功能
   - ✅ 可删除单个收藏场景
   - ✅ 可隐藏自动扩展场景

3. **预设数据更新**：
   - ✅ 自动同步最新的角色数据
   - ✅ 新规则自动生效
   - ✅ 不影响用户自定义内容

4. **导入导出**：
   - ✅ 新版可导入旧版文件
   - ✅ 导出包含完整信息

---

## 🚀 推荐上线步骤

1. **直接发布**：本次更新完全向后兼容，可直接发布
2. **监控**：关注用户反馈，特别是：
   - 收藏页面显示是否正常
   - 自动扩展场景是否正确生成
   - 删除功能是否正常工作
3. **文档更新**（可选）：
   - 更新说明文档，介绍新功能
   - 添加"合并同压制"功能说明

---

## 📝 潜在问题和解决方案

### 问题1：旧版本Chrome缓存
**症状**：用户可能看到旧版本的页面
**解决**：用户刷新页面（Ctrl+F5 / Cmd+Shift+R）

### 问题2：localStorage容量
**症状**：如果用户添加了大量场景和收藏，可能接近5MB限制
**解决**：当前数据结构非常紧凑，正常使用不会超限

### 问题3：布兰卡规则生效时机
**症状**：旧用户可能已经收藏了"民工连滑铲+轻滚接近"
**解决**：
- ✅ 新规则只影响**新生成的自动扩展场景**
- ✅ 已收藏的不会被删除
- ✅ 但刷新后不再自动生成"民工连滑铲+轻滚接近"

---

## ✨ 总结

**本次更新对旧用户影响：几乎为0**

- ✅ 数据完整保留
- ✅ 功能向后兼容
- ✅ 性能无影响
- ✅ UI优化提升体验
- ✅ 新功能可选使用

**建议：直接发布上线** 🚀

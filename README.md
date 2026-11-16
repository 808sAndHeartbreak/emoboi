# EMOBOI.COM

> Personal multimedia archive. Drain-core aesthetics.

## Structure

```
├── index.html      # Homepage
├── sf6/            # SF6 Frame Data Tool
├── clocktower/     # 钟楼手记 · 血染钟楼记录与 DeepSeek 推理
├── gojuon/         # Japanese Gojūon Learning
├── english/        # English Lexicon
├── gallery/        # Visual Gallery
└── music/          # Music Player
```

## 钟楼手记

[打开血染钟楼推理工具](https://emoboi.com/clocktower/)。主页导航和菜单均有钟楼入口。

入口为 clocktower/index.html，内嵌脚本、样式、字体和背景。clocktower/scripts/ 存放常驻剧本与导入示例；当前架构见 [reasoning-v30.md](clocktower/docs/reasoning-v30.md)，JSON标准与资料来源见同目录文档。

手机优先，兼容平板和电脑。内置官三及常驻重见天日、山雨欲来、华灯初上；支持JSON导入、自定义角色与常驻剧本。游戏页集中显示圆桌座位、阶段和线索，推理页选择模型和重点问题。新分析独立使用最新资料，追问沿所选报告补充上下文；默认V4 Pro、不深度思考。

分析先核对身份数量与信息条件，优先收窄恶魔范围；合并不影响结论的爪牙互换，中毒解释保留来源与夜次。正文接收时显示进度，核对完成后一次展示报告；深度模式可实时查看思考。费用仅在详情末尾显示。

数据保存在当前浏览器，支持备份及恢复。Key由使用者在设置中填写或粘贴，不进入对局备份。当前282项检查通过；推理范围与验证边界见当前架构文档，其他版本文档保留为历史记录。

## Run Locally

```bash
python -m http.server 8000
```

---

*Design by 天*  
*© 2026 emoboi.com*


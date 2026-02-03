// ZANGIEF 角色数据 - 现代操作
CHARACTER_DATA["ZANGIEF_MODERN"] = {
  "moves": [
    // ========== 普通技 ==========
    // 站立轻脚
    { "name": "L", "startup": 7, "active": "7-8", "recovery": 17, "hit": -2, "block": -4 },
    // 站立中拳
    { "name": "M", "startup": 9, "active": "9-12", "recovery": 17, "hit": 2, "block": -2 },
    // 站立重拳
    { "name": "H", "startup": 16, "active": "16-18", "recovery": 22, "hit": 3, "block": -3 },
    
    // 蹲轻拳
    { "name": "↓L", "startup": 6, "active": "6-7", "recovery": 8, "hit": 6, "block": 1 },
    // 蹲轻脚
    { "name": "Auto L", "startup": 4, "active": "4-6", "recovery": 12, "hit": 0, "block": -3 },
    // 蹲中拳
    { "name": "↓M", "startup": 8, "active": "8-10", "recovery": 16, "hit": 3, "block": -1 },
    // 蹲重拳
    { "name": "↓H", "startup": 11, "active": "11-19", "recovery": 35, "hit": 0, "block": -20, "isKnockdown": true },
    
    // ========== 特殊技 ==========
    // 地狱刺
    { "name": "↘M", "startup": 7, "active": "7-9", "recovery": 21, "hit": -1, "block": -3 },
    // 膝锤
    { "name": "→M", "startup": 14, "active": "14-20", "recovery": 13, "hit": 1, "block": -4 },
    // 头槌
    { "name": "Auto H", "startup": 14, "active": "14-18", "recovery": 15, "hit": 8, "block": 4 },
    // 旋风轮踢
    { "name": "→H", "startup": 22, "active": "22-28", "recovery": 25, "hit": 0, "block": -9, "isKnockdown": true },
    // 大践踏
    { "name": "↘H", "startup": 12, "active": "12-14", "recovery": 27, "hit": 0, "block": -13, "isKnockdown": true },
    //踩脚
    { "name": "↓↓M", "startup": 9, "active": "9-11", "recovery": 17, "hit": 2, "block": -6 },


    // ========== 必需项 ==========
    // 投技（用于打投择计算）
    { "name": "投", "startup": 5, "active": "5-7", "recovery": 23, "isThrow": true, "isKnockdown": true },
    // 前进（用于前进卡帧计算）
    { "name": "66", "isDash": true, "dashFrames": 22 }
  ],
  "scenarios": [
    { "adv": 22, "context": "投", "requiresDash": true },
    { "adv": 27, "context": "正常转圈圈" },
    { "adv": 27, "context": "三连手刀" },
    { "adv": 28, "context": "下前投" },
    { "adv": 36, "context": "下重脚" },
    { "adv": 38, "context": "OD转圈圈" },
    { "adv": 40, "context": "蓄力重拳" },
    // 模糊帧数场景（范围）
    { "advRange": [28, 31], "context": "大飞脚" }
  ]
};

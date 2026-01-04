// SAGAT 角色数据
CHARACTER_DATA["SAGAT"] = {
  "moves": [
    // 普通技 - 站立
    { "name": "5LP", "startup": 5, "active": "5-7", "recovery": 11, "hit": 4, "block": -3 },
    { "name": "5LK", "startup": 7, "active": "7-8", "recovery": 15, "hit": -1, "block": -4 },
    { "name": "5MP", "startup": 6, "active": "6-9", "recovery": 15, "hit": 6, "block": 2 },
    { "name": "5MK", "startup": 11, "active": "11-14", "recovery": 19, "hit": 3, "block": -3 },
    { "name": "5HP", "startup": 15, "active": "15-18", "recovery": 22, "hit": 0, "block": -5 },
    { "name": "5HK", "startup": 10, "active": "10-15", "recovery": 21, "hit": 1, "block": -5 },
    // 普通技 - 蹲下
    { "name": "2LP", "startup": 4, "active": "4-5", "recovery": 10, "hit": 5, "block": -1 },
    { "name": "2LK", "startup": 5, "active": "5-7", "recovery": 12, "hit": 1, "block": -3 },
    { "name": "2MP", "startup": 7, "active": "7-9", "recovery": 17, "hit": 4, "block": -1 },
    { "name": "2MK", "startup": 9, "active": "9-11", "recovery": 18, "hit": 5, "block": -2 },
    { "name": "2HP", "startup": 11, "active": "11-14", "recovery": 21, "hit": 1, "block": -5 },
    { "name": "2HK", "startup": 11, "active": "11-13", "recovery": 26, "hit": 0, "block": -12, "isKnockdown": true },
    // 特殊技 (Unique Attacks)
    { "name": "6MP", "startup": 22, "active": "22-24", "recovery": 19, "hit": 3, "block": -2 },
    { "name": "4HP", "startup": 8, "active": "8-15", "recovery": 25, "hit": 0, "block": -10 },
    { "name": "6LK", "startup": 18, "active": "18-20", "recovery": 18, "hit": 3, "block": -3 },
    { "name": "6HK", "startup": 16, "active": "16-19", "recovery": 21, "hit": 7, "block": 4 },
    // 投技和冲刺
    { "name": "投", "startup": 5, "active": "5-7", "recovery": 23, "isThrow": true, "isKnockdown": true },
    { "name": "66", "isDash": true, "dashFrames": 23 }
  ],
  "scenarios": [
    // TODO: 补充 SAGAT 的常用压制场景
    { "adv": 17, "context": "投技" },
    { "adv": 39, "context": "轻升龙" }
  ]
};


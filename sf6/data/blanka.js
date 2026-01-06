// BLANKA 角色数据
CHARACTER_DATA["BLANKA"] = {
  "moves": [
    // 普通技 - 站立
    { "name": "5LP", "startup": 5, "active": "5-7", "recovery": 10, "hit": 3, "block": -3 },
    { "name": "5LK", "startup": 4, "active": "4-7", "recovery": 7, "hit": 5, "block": -2 },
    { "name": "5MP", "startup": 10, "active": "10-12", "recovery": 15, "hit": 3, "block": -4 },
    { "name": "5MK", "startup": 8, "active": "8-10", "recovery": 17, "hit": 4, "block": -2 },
    { "name": "5HP", "startup": 10, "active": "10-16", "recovery": 22, "hit": 3, "block": -3 },
    { "name": "5HK", "startup": 7, "active": "7-15", "recovery": 18, "hit": 6, "block": -4 },
    // 普通技 - 蹲下
    { "name": "2LP", "startup": 6, "active": "6-8", "recovery": 8, "hit": 5, "block": -2 },
    { "name": "2LK", "startup": 5, "active": "5-6", "recovery": 10, "hit": 3, "block": -3 },
    { "name": "2MP", "startup": 9, "active": "9-13", "recovery": 16, "hit": -1, "block": -5 },
    { "name": "2MK", "startup": 8, "active": "8-10", "recovery": 16, "hit": 5, "block": -5 },
    { "name": "2HP", "startup": 15, "active": "15-19", "recovery": 20, "hit": 0, "block": -5 },
    { "name": "2HK", "startup": 11, "active": "11-14", "recovery": 23, "hit": 0, "block": -12, "isKnockdown": true },
    // 特殊技
    { "name": "6MP", "startup": 20, "active": "20-22", "recovery": 20, "hit": 3, "block": -3 },
    { "name": "6MK", "startup": 9, "active": "9-20", "recovery": 18, "hit": 6, "block": -2 },
    { "name": "4MK", "startup": 9, "active": "9-14", "recovery": 12, "hit": 8, "block": 2 },
    { "name": "6HP", "startup": 18, "active": "18-21", "recovery": 31, "hit": 0, "block": -15, "isKnockdown": true },
    { "name": "3HP", "startup": 14, "active": "14-23", "recovery": 22, "hit": 0, "block": -18, "isKnockdown": true },
    // 投技和冲刺类移动
    { "name": "投", "startup": 5, "active": "5-7", "recovery": 23, "isThrow": true, "isKnockdown": true },
    { "name": "66", "isDash": true, "dashFrames": 19 },
    { "name": "6KKK", "isDash": true, "dashFrames": 27 },
    { "name": "4KKK", "isDash": true, "dashFrames": 32 }
  ],
  "scenarios": [
    { "adv": 46, "context": "版边民工连升龙" },
    { "adv": 44, "context": "民工连升龙" },
    { "adv": 39, "context": "电" },
    { "adv": 35, "context": "民工连滑铲" },
    { "adv": 29, "context": "滑铲" },
    { "adv": 25, "context": "下重脚" },
    { "adv": 16, "context": "民工连滑铲+前前" },
    { "adv": 13, "context": "民工连升龙+轻滚接近" },
    { "adv": 11, "context": "投+前前" }
  ]
};

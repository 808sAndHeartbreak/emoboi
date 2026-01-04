// RYU 角色数据
CHARACTER_DATA["RYU"] = {
  "moves": [
    { "name": "5LP", "startup": 4, "active": "4-6", "recovery": 7, "hit": 4, "block": -1 },
    { "name": "5LK", "startup": 5, "active": "5-7", "recovery": 11, "hit": 2, "block": -4 },
    { "name": "5MP", "startup": 6, "active": "6-9", "recovery": 11, "hit": 7, "block": -1 },
    { "name": "5MK", "startup": 9, "active": "9-11", "recovery": 18, "hit": 4, "block": -4 },
    { "name": "5HP", "startup": 10, "active": "10-14", "recovery": 18, "hit": 4, "block": -2 },
    { "name": "5HK", "startup": 12, "active": "12-15", "recovery": 20, "hit": 9, "block": 1 },
    { "name": "2LP", "startup": 4, "active": "4-5", "recovery": 9, "hit": 4, "block": -1 },
    { "name": "2LK", "startup": 5, "active": "5-6", "recovery": 10, "hit": 3, "block": -1 },
    { "name": "2MP", "startup": 6, "active": "6-9", "recovery": 15, "hit": 5, "block": 0 },
    { "name": "2MK", "startup": 8, "active": "8-10", "recovery": 19, "hit": 1, "block": -6 },
    { "name": "2HP", "startup": 9, "active": "9-14", "recovery": 21, "hit": 1, "block": -7 },
    { "name": "2HK", "startup": 9, "active": "9-11", "recovery": 23, "hit": 0, "block": -12, "isKnockdown": true },
    { "name": "6MP", "startup": 20, "active": "20-23", "recovery": 19, "hit": 3, "block": -1 },
    { "name": "6HP", "startup": 20, "active": "20-24", "recovery": 16, "hit": 6, "block": 3 },
    { "name": "4HP", "startup": 7, "active": "7-10", "recovery": 25, "hit": 1, "block": -13 },
    { "name": "4HK", "startup": 10, "active": "10-14,20-22", "recovery": 21, "hit": 0, "block": -4 },
    { "name": "6HK", "startup": 16, "active": "16-19", "recovery": 20, "hit": 2, "block": -4 },
    { "name": "轻波掌击", "startup": 12, "active": "12-17", "recovery": 18, "hit": 2, "block": -3 },
    { "name": "投", "startup": 5, "active": "5-7", "recovery": 23, "isThrow": true, "isKnockdown": true },
    { "name": "66", "isDash": true, "dashFrames": 19 }
  ],
  "scenarios": [
    { "adv": 7,  "context": "蓄电TC" },
    { "adv": 17, "context": "投技" },
    { "adv": 20, "context": "重波掌击浮空绿冲重升龙+前前" },
    { "adv": 29, "context": "OD升龙" },
    { "adv": 32, "context": "版边民工连-中升龙" },
    { "adv": 34, "context": "中升龙" },
    { "adv": 37, "context": "重升龙" },
    { "adv": 38, "context": "轻升龙" },
    { "adv": 39, "context": "浮空绿冲重升龙" },
    { "adv": 39, "context": "浮空轻波掌-下重脚" },
    { "adv": 38, "context": "前重脚-旋风脚" },
    { "adv": 40, "context": "下重脚 (2HK)" },
    { "adv": 40, "context": "中驴踢" },
    { "adv": 47, "context": "下重脚确反 (2HK)" }
  ]
};


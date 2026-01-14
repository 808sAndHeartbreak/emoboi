// JURI 角色数据
CHARACTER_DATA["JURI"] = {
  "moves": [
    // 普通技 - 站立
    { "name": "5LP", "startup": 4, "active": "4-7", "recovery": 7, "hit": 5, "block": -2 },
    { "name": "5LK", "startup": 5, "active": "5-7", "recovery": 9, "hit": 2, "block": -3 },
    { "name": "5MP", "startup": 6, "active": "6-9", "recovery": 12, "hit": 7, "block": 2 },
    { "name": "5MK", "startup": 5, "active": "5-10", "recovery": 17, "hit": 3, "block": -4 },
    { "name": "5HP", "startup": 10, "active": "10-12", "recovery": 24, "hit": -1, "block": -5 },
    { "name": "5HK", "startup": 17, "active": "17-20", "recovery": 19, "hit": 2, "block": -3 },
    // 普通技 - 蹲下
    { "name": "2LP", "startup": 4, "active": "4-6", "recovery": 8, "hit": 4, "block": -1 },
    { "name": "2LK", "startup": 5, "active": "5-7", "recovery": 8, "hit": 3, "block": -1 },
    { "name": "2MP", "startup": 6, "active": "6-9", "recovery": 14, "hit": 5, "block": -2 },
    { "name": "2MK", "startup": 8, "active": "8-10", "recovery": 19, "hit": 1, "block": -6 },
    { "name": "2HP", "startup": 8, "active": "8-11", "recovery": 23, "hit": 3, "block": -11 },
    { "name": "2HK", "startup": 10, "active": "10-12", "recovery": 23, "hit": 0, "block": -11, "isKnockdown": true },
    // 特殊技 (Unique Attacks)
    { "name": "6MP", "startup": 8, "active": "8-10", "recovery": 17, "hit": 4, "block": -3 },  // Kyosesho
    { "name": "6MK", "startup": 21, "active": "21-22", "recovery": 23, "hit": 2, "block": -3 },  // Senkai Kick
    { "name": "6HK", "startup": 15, "active": "15-17,23-25", "recovery": 20, "hit": 2, "block": -4 },  // Renko Kicks (二段)
    { "name": "4HK", "startup": 10, "active": "10-12,19-21", "recovery": 19, "hit": 2, "block": -6 },  // Korenzan (二段)
    // 投技和冲刺
    { "name": "投", "startup": 5, "active": "5-7", "recovery": 23, "isThrow": true, "isKnockdown": true },
    { "name": "66", "isDash": true, "dashFrames": 22 }
  ],
  "scenarios": [
    { "adv": 15, "context": "中风破刃+前前" },
    { "adv": 17, "context": "投技" },
    // 模糊场景：帧数不确定的情况
    { "advRange": [24, 30], "context": "模糊踩头", "isFuzzy": true },
    { "advRange": [26, 28], "context": "模糊重升龙", "isFuzzy": true },
    { "adv": 37, "context": "中风破刃" },
    { "adv": 37, "context": "轻升龙" },
    { "adv": 37, "context": "轻风破刃" },
    { "adv": 37, "context": "五黄杀" },
    { "adv": 38, "context": "下重脚" },
    { "adv": 42, "context": "站重拳确反" },
    { "adv": 42, "context": "重风破刃" },
    { "adv": 47, "context": "下重脚确反" }
  ]
};

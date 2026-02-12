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
    { "name": "空挥轻风破刃", "startup": 10, "active": "10-13", "recovery": 21},  // 仅卡帧使用因此无需hit和block
    // 投技和冲刺
    { "name": "投", "startup": 5, "active": "5-7", "recovery": 23, "isThrow": true, "isKnockdown": true },
    { "name": "66", "isDash": true, "dashFrames": 22 }
  ],
  "notes": [
    "压制笔记：",
    "【+26~28】",
    "前前+下中脚复合风破刃（近轻 远中）",
    "（近距离重升龙+26限定）绿冲前中脚+下中拳+中风破刃，相杀接重脚连段",
    "（版边限定）前前+中拳+下中拳",
    "绿冲中拳+下重拳，打防复合轻风破刃，打中+重风破刃",
    "【+37】",
    "前前+前重拳复合轻风破刃",
    "绿冲骗拆",
    "（版边限定）绿冲+迸放",
    "",
    "连段推荐：",
    "1球：",
    "重拳+下劈+前中拳+重升龙",
    "（3斗气）下中拳+OD回旋踢-下劈+重升龙",
    "2球：下中拳+地波下劈+前中拳+重升龙",
    "3球：下中拳+回旋踢地波下劈+前中拳+重升龙",
    "反迸：",
    "前重拳+下劈+轻脚+重升龙",
    "晕连：",
    "后跳+轻风破刃+前跳重脚+下重拳+任意收尾",
    "打拆连：",
    "重拳+OD/一球地波，命中接重升龙，打防接前中拳+轻风破刃",
    "风水引擎组件：",
    "下轻拳+下中脚+中拳",
    "轻脚+前中拳+下中脚",
    "下重拳+重脚+重风破刃"
  ].join("\n"),
  "scenarios": [
    { "adv": 17, "context": "投技" },
    // 模糊场景：帧数不确定的情况
    { "advRange": [24, 30], "context": "模糊踩头", "isFuzzy": true },
    { "adv": 28, "context": "近距离重升龙"},
    { "adv": 27, "context": "中距离重升龙"},
    { "adv": 26, "context": "远距离重升龙"},
    { "adv": 37, "context": "中风破刃" },
    { "adv": 37, "context": "轻升龙" },
    { "adv": 37, "context": "轻风破刃" },
    { "adv": 37, "context": "带球五黄杀" },
    { "adv": 38, "context": "下重脚" },
    { "adv": 42, "context": "站重拳确反" },
    { "adv": 42, "context": "重风破刃" },
    { "adv": 47, "context": "下重脚确反" }
  ]
};

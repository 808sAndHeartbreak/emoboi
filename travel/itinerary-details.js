window.ITINERARY_DETAILS = (() => {
  const clone = (value) => JSON.parse(JSON.stringify(value));

  const izuStaySection = {
    title: "伊豆",
    lines: [
      "- 固定住 `IZU HOKKAWA SEASIDE GUESTHOUSE`，三晚都从 `伊豆北川` 出发。",
      "- 东伊豆负责 `大室山 / 仙人掌动物公园 / 城崎海岸`；南伊豆负责 `白滨 / 爪木崎 / 下田`；西伊豆只在包车版深入。",
      "- 傍晚回到北川后泡 `黑根岩风吕`：`10:00-18:00`，`17:45` 最后入场，`700 日元`。",
      "- 公交用 `IC 卡 + 现金`。长线班次前一晚收藏，现场只核对下一班。"
    ],
    images: [
      { src: "images/伊豆分区.jpg", caption: "伊豆分区示意图" },
      { src: "images/伊豆轨道交通.jpg", caption: "伊豆轨道交通主线图" }
    ]
  };

  const tokyoSection = {
    title: "东京",
    lines: [
      "- 东京段固定住 `品川王子大饭店（Shinagawa Prince Hotel）`：`港区高轮 4-10-30`，邮编 `108-8611`。",
      "- `D1/D2` 对应预订：`2026/5/3（日）15:00` 入住 · `2026/5/5（二）11:00` 退房（与 `D3` 中午出发衔接）。",
      "- `D6` 晚从伊豆回东京后仍住同一酒店，衔接 `D7` 羽田早班。",
      "- 交通固定：`成田 → 品川`、`品川 → 热海 → 伊豆北川`、`品川 → 羽田`。东京只留一个慢逛片区。"
    ],
    images: [{ src: "images/东京地图.jpg", caption: "东京景点图" }]
  };

  const hakoneSection = {
    title: "箱根",
    lines: [
      "- 箱根段统一住 `箱根汤本`。",
      "- `D2` 只做 `箱根经典主线`，不叠加强罗美术馆线。",
      "- `D3` 中午从箱根汤本离开，经 `小田原 / 热海` 转去伊豆北川。"
    ],
    images: [
      { src: "images/箱根路线一日游.jpg", caption: "箱根一日游主线示意图" },
      { src: "images/箱根顺时针路线.jpg", caption: "箱根经典环线公共交通路线图" }
    ]
  };

  const createSouthIzuDay = ({ title }) => ({
    title,
    lines: [
      "- `08:00-09:00`：伊豆北川出发，坐伊豆急行到 `伊豆急下田站`。",
      "- `09:30-11:00`：`9 号站台` 去 `白滨神社 / 白滨海岸`。",
      "- `11:00-13:30`：回下田站，从 `10 号站台` 去 `爪木崎`。",
      "- `13:30-15:30`：回下田站，`德造丸` 午饭，随后走 `佩里路`。",
      "- `16:00-19:00`：从下田回伊豆北川。`Resort 21` 只在班次刚好时乘坐。"
    ]
  });

  const createEastIzuClassicDay = ({ title }) => ({
    title,
    lines: [
      "- `09:00`：伊豆北川出发到 `伊豆高原站`。",
      "- `09:30-12:30`：`1 号站台` 去 `大室山`，下山后步行到 `伊豆仙人掌动物公园`。",
      "- `13:30-15:30`：回伊豆高原站，从 `2 号站台` 去 `城崎海岸 / 门胁吊桥`。",
      "- `15:30-16:30`：回伊豆高原站，顺手看 `伊豆高原五月祭` 周边会场。",
      "- `17:00` 前后回伊豆北川。"
    ]
  });

  const checkoutEastIzuDay = {
    title: "D6｜5/8 退房后东伊豆收口",
    lines: [
      "- `08:00-09:30`：早餐、退房、处理行李。`10:00` 前离店。",
      "- `10:00-14:30`：轻装做 `大室山 + 伊豆仙人掌动物公园`。",
      "- `14:30-15:30`：回 `伊豆高原站`，看 `伊豆高原五月祭` 周边会场。",
      "- `16:00-19:00`：`伊豆高原 → 热海 → 品川 / 东京`，当晚住 `品川王子大饭店`。"
    ]
  };

  const noCharterWestIzuDay = {
    title: "D5｜5/7 西伊豆减法日",
    lines: [
      "- `08:00`：伊豆北川出发，经 `热海 / 三岛 / 修善寺` 去 `土肥温泉`。",
      "- `11:30-15:30`：`土肥海岸 → 午饭 → 松原公园足汤 → 土肥金山`。",
      "- `15:30-19:00`：原路回伊豆北川。",
      "- 这天不排 `堂ヶ岛 / 黄金崎 / 恋人岬`。公共交通版只到西伊豆入口。"
    ]
  };

  const charterFinalDay = {
    title: "D6｜5/8 退房后中西伊豆包车",
    lines: [
      "- `08:00-09:00`：早餐、退房、把行李直接装上车。",
      "- `09:00-12:00`：`石廊崎`。",
      "- `12:00-15:00`：`堂ヶ岛天窗洞 → 黄金崎`。",
      "- `15:00-17:30`：`修善寺 / 伊豆全景公园`。",
      "- `17:30-20:00`：送到 `三岛站` 或 `热海站`，接车回东京，当晚住 `品川王子大饭店`。"
    ]
  };

  const createTokyoArrivalDay = () => ({
    title: "D1｜5/3 成田进东京",
    lines: [
      "- `10:30`：从家里出发去 `浦东机场`，目标 `11:30` 到机场。",
      "- `13:00-16:55`：`上海浦东 T2 → 东京成田 T1`。入境和取行李后，按 `18:00-18:30` 离开机场更稳。",
      "- `18:30-20:00`：`成田机场 → N'EX → 品川站`，入住 `品川王子大饭店`。"
    ]
  });

  const tokyoFullDay = {
    title: "D2｜5/4 东京轻松日",
    lines: [
      "- `09:30-18:30`：东京整天轻松逛，只保一个片区。",
      "- `丸之内 / 银座` 更适合买东西；`浅草 / 藏前` 更适合慢逛。",
      "- 晚上回到 `品川王子大饭店`，为 `D3 中午切伊豆` 做准备。"
    ]
  };

  const tokyoToIzuDay = {
    title: "D3｜5/5 东京转伊豆北川",
    lines: [
      "- `09:30-11:30`：早餐、收尾、`11:00` 前退房（按预订）。",
      "- `12:00-13:30`：`品川站 → 热海站`。",
      "- `13:30-15:00`：在热海参加 `第13届春之热海啤酒节`，当作午饭和中场休息。",
      "- `15:00-16:00`：`热海站 → 伊豆北川站`。",
      "- `16:00` 后入住 `IZU HOKKAWA SEASIDE GUESTHOUSE`。"
    ]
  };

  const createHakoneArrivalDay = () => ({
    title: "D1｜5/3 成田直去箱根汤本",
    lines: [
      "- `10:30`：从家里出发去 `浦东机场`。",
      "- `18:00-18:30` 离开成田后，按 `成田机场站 / 机场第 2 航站楼站 → 品川站 → 小田原站 → 箱根汤本站` 走，不再在东京落脚。",
      "- 按黄金周晚间换乘和晚到情况，整段通常抓 `3-3.5 小时` 更稳，这晚只保顺利到酒店。"
    ]
  });

  const hakoneFullDay = {
    title: "D2｜5/4 箱根经典主线",
    lines: [
      "- `08:30-12:30`：`箱根汤本 → 强罗 → 早云山 → 大涌谷 → 桃源台`。",
      "- `12:30-15:30`：海贼船到 `元箱根 / 箱根神社`。",
      "- `15:30-17:00`：巴士回 `箱根汤本`。",
      "- 晚上继续住 `箱根汤本`，这天不排美术馆线。"
    ]
  };

  const hakoneToIzuDay = {
    title: "D3｜5/5 箱根转伊豆北川",
    lines: [
      "- `09:30-11:30`：箱根早餐、收拾、退房。",
      "- `12:00-13:30`：`箱根汤本站 → 小田原站 → 热海站`。",
      "- `13:30-15:00`：在热海参加 `第13届春之热海啤酒节`，当作午饭和中场休息。",
      "- `15:00-16:00`：`热海站 → 伊豆北川站`。",
      "- `16:00` 后入住 `IZU HOKKAWA SEASIDE GUESTHOUSE`。"
    ]
  };

  const returnDay = {
    title: "D7｜5/9 羽田返程",
    lines: [
      "- 这天只做返程，不再安排景点。",
      "- `10:05-12:15`：`东京羽田 → 上海虹桥`。",
      "- `07:15-07:30` 离开酒店，走 `品川站 → 京急机场线 → 羽田机场`，目标 `08:35` 到机场。"
    ]
  };

  const goldenWeekEventsSection = {
    title: "五一限定活动安排",
    lines: [
      "- 本次实际排入：`5/5 第13届春之热海啤酒节`。",
      "- 东伊豆当天顺路经过 `伊豆高原五月祭` 周边会场，看得到就停，不为它改线。",
      "- 不排入：`沼津鲤鱼旗节 / 三岛商店街祭典 / 伊豆・村の駅 / 三岛天空步道 / 姬之泽公园杜鹃花・鲤鱼旗节`。",
      "- `01 沼津鲤鱼旗节`：`5/4-5/5 10:00-15:00`，沼津市狩野川绿地，不排入。",
      "- `02 春之热海啤酒节`：`5/3-5/5 10:00-16:00`，热海亲水公园活动广场，排入 `5/5`。",
      "- `03 春季大通商店街祭典`：`5/5 11:00-16:00`，三岛大通商店街，不排入。",
      "- `04 村长疯狂双倍祭典`：`4/29-5/6 9:00-17:00`，伊豆・村の駅，不排入。",
      "- `05 伊豆高原五月祭`：`4/29-5/31`，伊豆高原各地，东伊豆当天顺路看。",
      "- `06 解谜沉浸世界`：`5/2-5/3 18:30`，三岛天空步道，不排入。",
      "- `07 杜鹃花・鲤鱼旗节`：`4/29-5/6 9:00-17:00`，姬之泽公园，不排入。"
    ]
  };

  const buildFlightInfoQuery = () => ({
    title: "航班信息",
    lines: [
      "- 去程：`5/3 13:00-16:55`，`上海浦东 T2 → 东京成田 T1`。",
      "- 返程：`5/9 10:05-12:15`，`东京羽田 T2 → 上海虹桥 T1`。",
      "- 行李（以出票航司与值机柜台为准）：手提 `1` 件，`50×40×25 cm`；托运 `2` 件，每件 `23 kg`，约 `28` 寸。",
      "- 去程落地后按 `18:00-18:30` 离开成田更稳，后续铁路换乘都按这个节奏倒推。",
      "- 返程当天按 `08:35` 到羽田倒推离店时间。"
    ]
  });

  const buildStayInfoQuery = ({ includeHakone }) => ({
    title: "住宿信息",
    lines: [
      ...(includeHakone
        ? ["- `5/3、5/4`：住 `箱根汤本` 一带，优先选明确支持晚入住的酒店。"]
        : [
            "- 东京酒店（`D1/D2`）：`品川王子大饭店（Shinagawa Prince Hotel）`，日本东京 `港区高轮 4-10-30`，邮编 `108-8611`。",
            "- 预订：`2026/5/3（日）15:00` 入住 · `2026/5/5（二）11:00` 退房。"
          ]),
      "- 伊豆民宿（`5/5 16:00` 后入住 · `5/8 10:00` 前退房）：`IZU HOKKAWA SEASIDE GUESTHOUSE`，`Naramoto 1021-3`，邮编 `413-0302`（东伊豆北川）。",
      ...(includeHakone
        ? [
            "- `5/8` 晚回东京：住 `品川王子大饭店（Shinagawa Prince Hotel）`（回东京当晚；前两晚在箱根，本条指伊豆结束后回东京这一晚）。"
          ]
        : ["- `5/8` 晚回东京：仍住 `品川王子大饭店（Shinagawa Prince Hotel）`（最后一晚，与 `D1/D2` 同一酒店，衔接 `D7` 羽田）。"])
    ]
  });

  const buildLinksSection = ({ includeHakone }) => ({
    title: "信息查询",
    placement: "tail",
    queryItems: [buildFlightInfoQuery(), buildStayInfoQuery({ includeHakone })],
    lines: [
      "上面的信息卡放固定信息；下面这些入口用于天气、交通、票券和景点查询。",
      "- [日本天气查看（au）](https://tenki.auone.jp/weather/22222)",
      "- [成田机场官方铁路交通导航](https://access.narita-airport.jp/en/index.html)",
      "- [JR-EAST 踊子号官方](https://www.jreast.co.jp/multi/en/traininformation/odoriko/)",
      "- [JR-EAST 英文时刻表](https://timetables.jreast.co.jp/en/)",
      ...(includeHakone
        ? [
            "- [箱根 Freepass 官方](https://hakonetrip.odakyu-global.com/passes/hakone-freepass/)",
            "- [箱根官方实时交通状态](https://www.hakonenavi.jp/international/en/status_information)",
            "- [箱根空中缆车官方](https://www.hakoneropeway.co.jp/foreign/en)",
            "- [箱根海贼船官方时刻表](https://www.hakone-kankosen.co.jp/foreign/en/timesheet/)",
            "- [箱根神社官方](https://www.hakonejinja.or.jp/)"
          ]
        : []),
      "- [伊豆急行官方](https://www.izukyu.co.jp/en/)",
      "- [伊豆急行官方时刻表（日文）](https://www.izukyu.co.jp/train/route.php)",
      "- [Resort 21 官方](https://www.izukyu.co.jp/resort21/)",
      "- [北川温泉黑根岩风吕官方](https://www.hokkawa-onsen.com/kurone)",
      "- [伊豆急探索通票官方](https://www.izukyu.co.jp/global_site/tc/)",
      "- [伊豆navi 电子票入口（JR-EAST MaaS）](https://www.jreast.co.jp/multi/en/maas/izunavi/)",
      "- [东海巴士主要站点 / 咨询窗口](https://tc.tokaibus.jp/rosen/bus_stop.html)",
      "- [东海巴士实时路线 / 票价查询](https://transfer-cloud.navitime.biz/tokaibus)",
      "- [东海巴士运行状态](https://tc.tokaibus.jp/rosen/unnkoujyoukyou.html)",
      "- [东海巴士交通 IC 卡说明](https://tc.tokaibus.jp/rosen/ic_card.html)",
      "- [东海巴士如何乘车](https://tc.tokaibus.jp/rosen/jyousya.html)",
      "- [东海巴士 EMot 电子票](https://tc.tokaibus.jp/rosen/emot_ticket.html)",
      "- [伊东 & 伊豆高原 2 日券官方](https://en.tokaibus.jp/rosen/ito_kanko_freepass.html)",
      "- [伊豆高原 / 城崎 1 日票官方](https://en.tokaibus.jp/rosen/freepass_izukogen_jogasaki.html)",
      "- [东海巴士全线 2 / 3 日券官方](https://en.tokaibus.jp/rosen/zensenfree.html)",
      "- [西伊豆特急 / 快速巴士官方](https://tc.tokaibus.jp/rosen/nishiizu_tokkyu.html)",
      "- [下田观光协会官方](https://shimoda-city.com/en)",
      "- [白滨神社官方旅游页](https://b-izu.com/en/spot/post-16808/)",
      "- [龙宫窟官方旅游页](https://b-izu.com/en/spot/post-16800/)",
      "- [石廊崎 JNTO 官方页](https://www.japan.travel/en/spot/1280/)",
      "- [大室山登山缆车官方票价 / 运行时间](https://omuroyama.com/hours_fare/)",
      "- [伊豆仙人掌动物公园官方](https://izushaboten.com/en/)",
      "- [下田海中水族馆官方 / 交通](https://shimoda-aquarium.com/access/)",
      "- [堂ヶ岛 Marine 官方（天窗洞游船）](https://dogashimamarine.jp/en/)",
      "- [伊豆全景公园官方](https://www.panoramapark.co.jp/en/)"
    ]
  });

  const goldenWeekMapPoints = [
    "五一活动候选",
    "- 热海亲水公园活动广场",
    "- 姬之泽公园",
    "- 伊豆高原五月祭：按当天开放会场收藏",
    "- 沼津市 狩野川绿地",
    "- 三岛大通商店街",
    "- 伊豆・村の駅",
    "- 三岛天空步道"
  ];

  const buildTokyoIzuMapSection = ({ charter }) => ({
    title: "地图待收藏地点",
    placement: "tail",
    lines: [
      "下面这些点提前存进 Google Maps。",
      "东京 / 往返",
      "- 成田机场 Narita Airport",
      "- 品川王子大饭店 Shinagawa Prince Hotel / 108-8611",
      "- 品川站",
      "- 东京站",
      "- 银座",
      "- 浅草寺",
      "- 藏前",
      "- 东京塔",
      "- 赤羽桥站",
      "- 羽田机场 Haneda Airport",
      "伊豆住宿与东伊豆",
      "- IZU HOKKAWA SEASIDE GUESTHOUSE / Naramoto 1021-3 / 413-0302",
      "- 伊豆北川站",
      "- 黑根岩风吕",
      "- 伊豆高原站",
      "- 大室山",
      "- 伊豆仙人掌动物公园",
      "- 城崎海岸 / 门胁吊桥",
      "南伊豆",
      "- 伊豆急下田站",
      "- 白滨神社 / 白滨海岸",
      "- 爪木崎",
      "- 德造丸 下田站前店",
      "- 佩里路",
      "- 龙宫窟",
      "- 下田海中水族馆",
      ...(charter
        ? [
            "中西伊豆包车日",
            "- 石廊崎",
            "- 堂ヶ岛天窗洞 / 堂ヶ岛 Marine",
            "- 黄金崎",
            "- 修善寺温泉街",
            "- 伊豆全景公园",
            "- 三岛站"
          ]
        : [
            "西伊豆减法日",
            "- 修善寺站",
            "- 土肥港 / 土肥海岸",
            "- 松原公园足汤",
            "- 土肥金山",
            "- 恋人岬"
          ]),
      ...goldenWeekMapPoints
    ]
  });

  const buildHakoneIzuMapSection = ({ charter }) => ({
    title: "地图待收藏地点",
    placement: "tail",
    lines: [
      "下面这些点提前存进 Google Maps。",
      "往返",
      "- 成田机场 Narita Airport",
      "- 羽田机场 Haneda Airport",
      "- 品川王子大饭店 Shinagawa Prince Hotel / 108-8611",
      "- 品川站",
      "箱根",
      "- 箱根汤本站",
      "- 箱根汤本商店街",
      "- 强罗站",
      "- 早云山站",
      "- 大涌谷",
      "- 桃源台港",
      "- 元箱根港",
      "- 箱根神社",
      "- 平和鸟居",
      "伊豆住宿与东伊豆",
      "- IZU HOKKAWA SEASIDE GUESTHOUSE / Naramoto 1021-3 / 413-0302",
      "- 伊豆北川站",
      "- 黑根岩风吕",
      "- 伊豆高原站",
      "- 大室山",
      "- 伊豆仙人掌动物公园",
      "- 城崎海岸 / 门胁吊桥",
      "南伊豆",
      "- 伊豆急下田站",
      "- 白滨神社 / 白滨海岸",
      "- 爪木崎",
      "- 德造丸 下田站前店",
      "- 佩里路",
      "- 龙宫窟",
      "- 下田海中水族馆",
      ...(charter
        ? [
            "中西伊豆包车日",
            "- 石廊崎",
            "- 堂ヶ岛天窗洞 / 堂ヶ岛 Marine",
            "- 黄金崎",
            "- 修善寺温泉街",
            "- 伊豆全景公园",
            "- 三岛站"
          ]
        : [
            "西伊豆减法日",
            "- 修善寺站",
            "- 土肥港 / 土肥海岸",
            "- 松原公园足汤",
            "- 土肥金山",
            "- 恋人岬"
          ]),
      ...goldenWeekMapPoints
    ]
  });

  const tokyoIzuCharter = {
    id: "tokyo-izu-charter",
    directionId: "tokyo-izu",
    directionLabel: "东京+伊豆★",
    planId: "charter",
    planLabel: "包车",
    routeTitle: "东京+伊豆｜包车版",
    heroSubtitle: "东京保两天，5/5 中午进北川，最后一天包车收中西伊豆。",
    metaText: "5/3-5/9 · 浦东→成田 · 东京 2 晚 → 伊豆北川民宿 3 晚 → 5/8 包车至三岛 / 热海站后回东京",
    summaryLines: [
      "- 本版结果：东京保完整两天，最后一天用包车收中西伊豆。",
    ],
    sections: [
      {
        title: "7天总览",
        placement: "top",
        lines: [
          "- `D1`：成田进东京，住 `品川王子大饭店`。",
          "- `D2`：东京完整轻松日。",
          "- `D3`：中午东京出发，下午入住 `伊豆北川` 民宿。",
          "- `D4`：东伊豆经典日。",
          "- `D5`：南伊豆公共交通日。",
          "- `D6`：退房后包车跑中西伊豆，晚上回东京。",
          "- `D7`：羽田返程。"
        ]
      },
      clone(tokyoSection),
      clone(izuStaySection),
      clone(goldenWeekEventsSection),
      createTokyoArrivalDay(),
      clone(tokyoFullDay),
      clone(tokyoToIzuDay),
      createEastIzuClassicDay({ title: "D4｜5/6 东伊豆经典日" }),
      createSouthIzuDay({ title: "D5｜5/7 南伊豆公共交通日" }),
      clone(charterFinalDay),
      clone(returnDay),
      buildTokyoIzuMapSection({ charter: true }),
      buildLinksSection({ includeHakone: false })
    ]
  };

  const tokyoIzuNoCharter = {
    id: "tokyo-izu-no-charter",
    directionId: "tokyo-izu",
    directionLabel: "东京+伊豆★",
    planId: "no-charter",
    planLabel: "不包车 ★",
    routeTitle: "东京+伊豆｜不包车 ★优选",
    heroSubtitle: "优选版：东京保两天，伊豆全程按公共交通执行。",
    metaText: "5/3-5/9 · 浦东→成田 · 东京 2 晚 → 伊豆北川民宿 3 晚 → 南伊豆 / 西伊豆减法 / 东伊豆收口 → 东京前夜",
    summaryLines: [
      "- `★优选`：东京与伊豆节奏最稳，作为当前主方案。",
    ],
    sections: [
      {
        title: "7天总览",
        placement: "top",
        lines: [
          "- `D1`：成田进东京，住 `品川王子大饭店`。",
          "- `D2`：东京完整轻松日。",
          "- `D3`：中午东京出发，下午入住 `伊豆北川` 民宿。",
          "- `D4`：南伊豆公共交通日。",
          "- `D5`：西伊豆减法日，只保 `土肥 / 西海岸入口`。",
          "- `D6`：退房后做东伊豆，晚上回东京。",
          "- `D7`：羽田返程。"
        ]
      },
      clone(tokyoSection),
      clone(izuStaySection),
      clone(goldenWeekEventsSection),
      createTokyoArrivalDay(),
      clone(tokyoFullDay),
      clone(tokyoToIzuDay),
      createSouthIzuDay({ title: "D4｜5/6 南伊豆公共交通日" }),
      clone(noCharterWestIzuDay),
      clone(checkoutEastIzuDay),
      clone(returnDay),
      buildTokyoIzuMapSection({ charter: false }),
      buildLinksSection({ includeHakone: false })
    ]
  };

  const hakoneIzuCharter = {
    id: "hakone-izu-charter",
    directionId: "hakone-izu",
    directionLabel: "箱根+伊豆",
    planId: "charter",
    planLabel: "包车",
    routeTitle: "箱根+伊豆｜包车版",
    heroSubtitle: "D1 直进箱根汤本，D2 走箱根主线，最后一天包车收中西伊豆。",
    metaText: "5/3-5/9 · 浦东→成田 · D1 直进箱根汤本 → D2 箱根 → 伊豆北川民宿 3 晚 → 5/8 包车至三岛 / 热海站后回东京",
    summaryLines: [
      "- 本版结果：保留箱根，最后一天用包车收中西伊豆。",
    ],
    sections: [
      {
        title: "7天总览",
        placement: "top",
        lines: [
          "- `D1`：成田晚到直进 `箱根汤本`。",
          "- `D2`：箱根完整主线。",
          "- `D3`：中午箱根出发，下午入住 `伊豆北川` 民宿。",
          "- `D4`：东伊豆经典日。",
          "- `D5`：南伊豆公共交通日。",
          "- `D6`：退房后包车跑中西伊豆，晚上回东京。",
          "- `D7`：羽田返程。"
        ]
      },
      clone(hakoneSection),
      clone(izuStaySection),
      clone(goldenWeekEventsSection),
      createHakoneArrivalDay(),
      clone(hakoneFullDay),
      clone(hakoneToIzuDay),
      createEastIzuClassicDay({ title: "D4｜5/6 东伊豆经典日" }),
      createSouthIzuDay({ title: "D5｜5/7 南伊豆公共交通日" }),
      clone(charterFinalDay),
      clone(returnDay),
      buildHakoneIzuMapSection({ charter: true }),
      buildLinksSection({ includeHakone: true })
    ]
  };

  const hakoneIzuNoCharter = {
    id: "hakone-izu-no-charter",
    directionId: "hakone-izu",
    directionLabel: "箱根+伊豆",
    planId: "no-charter",
    planLabel: "不包车",
    routeTitle: "箱根+伊豆｜不包车版",
    heroSubtitle: "箱根完整保留，伊豆全程公共交通，西伊豆只做减法版。",
    metaText: "5/3-5/9 · 浦东→成田 · D1 直进箱根汤本 → D2 箱根 → 伊豆北川民宿 3 晚 → 南伊豆 / 西伊豆减法 / 东伊豆收口",
    summaryLines: [
      "- 本版结果：保留箱根，伊豆全程公共交通，西伊豆只到入口区域。",
    ],
    sections: [
      {
        title: "7天总览",
        placement: "top",
        lines: [
          "- `D1`：成田晚到直进 `箱根汤本`。",
          "- `D2`：箱根完整主线。",
          "- `D3`：中午箱根出发，下午入住 `伊豆北川` 民宿。",
          "- `D4`：南伊豆公共交通日。",
          "- `D5`：西伊豆减法日，只保 `土肥 / 西海岸入口`。",
          "- `D6`：退房后东伊豆收口，晚上回东京。",
          "- `D7`：羽田返程。"
        ]
      },
      clone(hakoneSection),
      clone(izuStaySection),
      clone(goldenWeekEventsSection),
      createHakoneArrivalDay(),
      clone(hakoneFullDay),
      clone(hakoneToIzuDay),
      createSouthIzuDay({ title: "D4｜5/6 南伊豆公共交通日" }),
      clone(noCharterWestIzuDay),
      clone(checkoutEastIzuDay),
      clone(returnDay),
      buildHakoneIzuMapSection({ charter: false }),
      buildLinksSection({ includeHakone: true })
    ]
  };

  return [tokyoIzuCharter, tokyoIzuNoCharter, hakoneIzuCharter, hakoneIzuNoCharter];
})();

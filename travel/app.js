const itineraries = [
  {
    id: "kansai-4",
    title: "关西经典不折返",
    subtitle: "大阪 + 京都，4天4晚",
    badge: "古都烟火双城",
    region: "关西",
    durationLabel: "4天档",
    tags: ["4天档", "经典", "城市美食", "轻松"],
    pitch: "大阪负责夜景、美食和购物，京都负责古都老街、寺社和散步感，两城切换清楚，理解门槛最低。",
    decision: "这条适合想要经典、顺路、完成度高的关西旅行。",
    featuredReason: "大阪（道顿堀/梅田）+ 京都（清水寺/祇园/岚山）组合，经典美感和城市烟火都在线。",
    tableAudience: "想要经典、顺路、城市与古都兼顾。",
    tableHighlight: "大城市吃逛 + 京都氛围，一条线就把关西核心体验说清楚。",
    tableCaution: "京都步行和上坡较多，D3 需要按体力在岚山和禅意线里取舍。",
    stayPlan: [
      "D1 住大阪难波 / 心斋桥，第一晚直接进入状态。",
      "D2-D3 住京都四条 / 河原町 / 京都站，兼顾逛吃和转车。",
      "D4 回大阪住，方便返程。"
    ],
    bestFor: [
      "希望快速看懂路线框架并愿意继续细化。",
      "喜欢美食、购物、夜景、老街都兼顾。",
      "希望交通逻辑清楚，不想研究太多跨城细节。"
    ],
    watchOut: [
      "京都不建议过度依赖巴士，电车 + 步行更稳。",
      "如果对寺社兴趣一般，D3 更推荐岚山，不要把两条京都路线硬塞满。"
    ],
    dayPlan: [
      { day: "D1", title: "大阪难波开场", detail: "关西机场进城后走道顿堀、心斋桥、美国村，第一晚只做吃喝逛和夜景。" },
      { day: "D2", title: "京都南到北经典线", detail: "伏见稻荷 → 清水寺 → 二三年坂 → 八坂神社 → 祇园 → 鸭川，顺路且不折返。" },
      { day: "D3", title: "京都第二天做气质切换", detail: "默认岚山治愈线；若更想安静慢走，则改南禅寺 / 哲学之道 / 银阁寺。" },
      { day: "D4", title: "回大阪收口", detail: "大阪城 → 新世界 / 通天阁 → 梅田购物和最后一顿正式晚餐。" },
      { day: "D5", title: "返程缓冲", detail: "上午补伴手礼或直接去机场，不再新增大景点。" }
    ]
  },
  {
    id: "kansai-6",
    title: "关西模块化深度版",
    subtitle: "大阪 + 京都 + 可插奈良 / USJ / 宇治 / 神户，6天6晚",
    badge: "自由度最高",
    region: "关西",
    durationLabel: "6天档",
    tags: ["6天档", "经典", "城市美食", "可定制"],
    pitch: "在经典关西骨架上多出一个模块日，可以把乐园、奈良、宇治或神户按你们口味加进去。",
    decision: "这条适合在经典关西之外，再加入一个按兴趣定制的模块日。",
    featuredReason: "适合已经认可关西，再往“更像为两个人量身定制”推进。",
    tableAudience: "想在经典关西基础上，再加一个兴趣模块。",
    tableHighlight: "经典关西之上再加模块日，能根据情侣喜好做精细化选择。",
    tableCaution: "模块日只能选一个方向，不要贪心把奈良、USJ、神户全塞进去。",
    stayPlan: [
      "D1-D2 住大阪难波 / 心斋桥，先把城市感和美食做满。",
      "D3-D5 住京都四条 / 河原町 / 京都站，减少来回搬运。",
      "D6 回大阪，方便最后补购物和返程。"
    ],
    bestFor: [
      "希望旅行更有弹性，不想只做纯经典打卡。",
      "你们对关西已有好感，愿意根据兴趣做模块选择。",
      "想让提案体现“不是模板，而是为你们俩调过味道”。"
    ],
    watchOut: [
      "京都段仍然会有步行密度，不要因为多一天就自动认为更轻松。",
      "如果选 USJ，当天就不要再叠加任何其他点。"
    ],
    dayPlan: [
      { day: "D1", title: "大阪难波夜开场", detail: "先把道顿堀、心斋桥和大阪夜生活打开。" },
      { day: "D2", title: "大阪城市感做满", detail: "大阪城 → 新世界 → 梅田，一天把城市地标、街头感和购物集中完成。" },
      { day: "D3", title: "京都经典线", detail: "伏见稻荷 → 清水寺 → 东山 → 祇园 → 鸭川。" },
      { day: "D4", title: "京都第二天", detail: "岚山经典治愈线，或切换成更安静的禅意散步线。" },
      { day: "D5", title: "模块日四选一", detail: "USJ / 奈良 / 宇治 / 神户，按乐园、古都、抹茶慢走或港口城市来选。" },
      { day: "D6", title: "大阪机动补漏", detail: "把没逛完的梅田、心斋桥、海游馆等内容做最后整理。" },
      { day: "D7", title: "返程缓冲", detail: "尽量纯返程，留出足够换乘余量。" }
    ]
  },
  {
    id: "tokyo-4",
    title: "东京 + 伊豆约会版",
    subtitle: "东京城市感 + 热海温泉 + 东伊豆海景，4天4晚",
    badge: "都市温泉切换",
    region: "东京伊豆",
    durationLabel: "4天档",
    tags: ["4天档", "情侣感", "海景温泉", "轻松"],
    pitch: "前半段是东京经典都市切片，后半段是热海温泉和东伊豆山海风景，情绪落差非常适合情侣。",
    decision: "这条适合想把都市感和温泉海景放进同一趟旅行。",
    featuredReason: "涩谷/浅草的城市感接热海与伊豆海岸温泉，节奏切换自然、拍照和体感都很强。",
    tableAudience: "想要城市 + 温泉海边，不想全程高强度。",
    tableHighlight: "东京开场很有张力，伊豆收尾很有情绪价值，节奏变化最浪漫。",
    tableCaution: "伊豆更吃天气和巴士班次，大风天要准备大室山替代方案。",
    stayPlan: [
      "D1-D2 住涩谷 / 新宿 / 品川，先把东京城市感打开。",
      "D3 住热海最省脑力，也可以直接切到伊豆高原。",
      "D4 若考虑返程更稳，可住伊东；想更安静和出片，则住伊豆高原。"
    ],
    bestFor: [
      "想做一条更像情侣度假，而不是单纯刷城市景点的方案。",
      "喜欢东京的潮流感，也喜欢温泉、海景、山海同框。",
      "愿意接受近郊交通比东京市区稍微麻烦一点。"
    ],
    watchOut: [
      "伊豆天气影响较大，尤其是大室山缆车和海边体验。",
      "如果不想研究巴士时刻，后续细化阶段可以考虑东伊豆包车半天或一天。"
    ],
    dayPlan: [
      { day: "D1", title: "涩谷 / 原宿夜开场", detail: "第一天只做涩谷十字路口、八公、Center Gai 和原宿轻量延伸，避免落地暴走。" },
      { day: "D2", title: "东京经典一日", detail: "筑地 → 浅草 → 上野 → 秋叶原，逻辑清楚，不走回头路。" },
      { day: "D3", title: "东京切进热海", detail: "新干线进热海，下午去 MOA 美术馆和来宫神社，晚上住温泉旅馆。" },
      { day: "D4", title: "东伊豆精华", detail: "城ヶ崎海岸 → 大室山，可按体力加仙人掌动物公园。" },
      { day: "D5", title: "返程缓冲", detail: "伊豆回东京再去机场，整体预留 4 小时以上更稳。" }
    ]
  },
  {
    id: "tokyo-6",
    title: "东京 + 镰仓 + 横滨 + 伊豆层次版",
    subtitle: "城市、海边古都、港口和温泉都覆盖，6天6晚",
    badge: "层次最丰富",
    region: "东京伊豆",
    durationLabel: "6天档",
    tags: ["6天档", "情侣感", "海景温泉", "可定制"],
    pitch: "东京先打底，再串镰仓海线、横滨港口和伊豆温泉，6 天能明显做出内容层次。",
    decision: "这条适合喜欢每天都切换场景和氛围的东日本路线。",
    featuredReason: "适合想做更完整东日本路线，同时不想每天都像复制粘贴。",
    tableAudience: "想把东京周边玩成一条变化丰富的长线。",
    tableHighlight: "城市、海线、港口、温泉四种气质接在一起，每天主题都不同。",
    tableCaution: "比 4 天版多了几次住宿或跨区移动，需要更注意天气和行李策略。",
    stayPlan: [
      "D1-D2 住东京涩谷 / 新宿 / 品川。",
      "D3 可回东京，也可住藤泽 / 镰仓减少第二天折返。",
      "D4 可住横滨；D5-D6 住热海 / 伊东 / 伊豆高原。"
    ],
    bestFor: [
      "想把东日本做成一条有情绪递进的情侣路线。",
      "喜欢 city walk、海线、港口和温泉各来一点，不想内容单一。",
      "愿意接受比纯东京市区更复杂的天气和交通判断。"
    ],
    watchOut: [
      "镰仓强依赖天气，阴天或雨天观感会下降很多。",
      "横滨虽然适合雨天，但整条线更适合善用寄存和行李转运。",
      "横滨空中缆车等临海设施可能因天气或检修调整，当天最好看运行状态。"
    ],
    dayPlan: [
      { day: "D1", title: "涩谷夜开场", detail: "东京第一晚用涩谷和原宿建立城市氛围。" },
      { day: "D2", title: "东京经典一日", detail: "筑地 → 浅草 → 上野 → 秋叶原，必要时可加银座或东京站夜景。" },
      { day: "D3", title: "镰仓 / 湘南海线", detail: "江之岛 → 镰仓高校前 → 七里滨 → 小町通，不走回头路。" },
      { day: "D4", title: "横滨港口散步日", detail: "地标塔 / 缆车 → 合味道纪念馆 → 红砖仓库 → 山下公园 → 中华街。" },
      { day: "D5", title: "热海温泉切换", detail: "去 MOA 美术馆和来宫神社，晚上正式进入温泉节奏。" },
      { day: "D6", title: "东伊豆山海精华", detail: "城ヶ崎海岸 → 大室山，天气好时观感会非常强。" },
      { day: "D7", title: "返程缓冲", detail: "伊豆回东京 / 羽田，留出较大换乘边际。" }
    ]
  },
  {
    id: "chubu-4",
    title: "中部精华差异化版",
    subtitle: "名古屋 + 吉卜力 + 高山白川乡，4天4晚",
    badge: "差异化最强",
    region: "中部",
    durationLabel: "4天档",
    tags: ["4天档", "差异化", "山地古镇", "情侣感"],
    pitch: "名古屋负责城市和美食，吉卜力公园负责情绪价值，高山白川乡负责真正的中部山地风景。",
    decision: "这条适合想明显区别于常规东京大阪玩法的中部精华线。",
    featuredReason: "适合突出“这次不走寻常路”，让提案立刻有新鲜感。",
    tableAudience: "想体验区别于东京大阪的中部精华。",
    tableHighlight: "城市、美食、吉卜力、山地村落四种内容组合在 4 天里，记忆点很强。",
    tableCaution: "中部长距离交通更关键，吉卜力门票和巴士预约需要更早准备。",
    stayPlan: [
      "D1-D3 住名古屋站周边，做市区和近郊活动最省脑力。",
      "D4 默认住高山，餐饮更多，D5 返回名古屋或机场更稳。",
      "若特别重视合掌村夜景，可后续再研究白川乡住宿。"
    ],
    bestFor: [
      "已经多次去日本，不想再把重点放在东京大阪。",
      "对吉卜力、公园散步、飞驒老街和合掌造村落有兴趣。",
      "愿意为了差异化体验接受中部交通成本更高。"
    ],
    watchOut: [
      "这条线真正花钱的地方通常是交通，不是景点门票。",
      "高山和白川乡要尽量早出发，不然很容易变成路上时间太长。"
    ],
    dayPlan: [
      { day: "D1", title: "名古屋城市开场", detail: "名古屋城 + 大须或荣，先把中部基地和美食建立起来。" },
      { day: "D2", title: "吉卜力公园整日", detail: "整天留给沉浸式散步，不硬塞别的景点。" },
      { day: "D3", title: "犬山 + 岐阜", detail: "补古城、河景和一点战国气质，让中部更有层次。" },
      { day: "D4", title: "白川乡 + 高山", detail: "名古屋进山，先白川乡再到高山，晚上吃飞驒牛和逛老街。" },
      { day: "D5", title: "高山收尾返程", detail: "补宫川早市和老街后回名古屋或机场。" }
    ]
  },
  {
    id: "chubu-6",
    title: "中部深度收藏版",
    subtitle: "名古屋 + 高山白川乡 + 金泽，6天6晚",
    badge: "山城古都深度",
    region: "中部",
    durationLabel: "6天档",
    tags: ["6天档", "差异化", "山地古镇", "可定制"],
    pitch: "名古屋打底，高山白川乡做山地日本，最后用金泽的园林、市场和古都气质收尾，层次完整。",
    decision: "这条适合想把中部玩出山城古都层次和深度感。",
    featuredReason: "名古屋 + 高山白川乡 + 金泽，兼顾山地村落、市场园林和古都街区，辨识度最高。",
    tableAudience: "想玩出更深层次、更鲜明风格的中部线。",
    tableHighlight: "从名古屋到飞驒再到金泽，动线线性且内容辨识度非常高。",
    tableCaution: "这是 6 条里最吃预约和跨城班次管理的一条，适合第二轮再细化。",
    stayPlan: [
      "D1-D3 住名古屋站，做城市和近郊内容。",
      "D4 住高山，给白川乡与金泽预留线性衔接。",
      "D5-D6 住金泽站或东茶屋街周边，收口更精致。"
    ],
    bestFor: [
      "想拿出一条明显区别于东京大阪的深度方案。",
      "你们喜欢古都、园林、市场和更安静精致的城市气质。",
      "愿意为了更完整的层次，接受多次跨城和预约管理。"
    ],
    watchOut: [
      "白川乡和金泽方向的巴士很多是预约制，后续落地一定要先锁班次。",
      "白川乡到金泽的时长会因班次与停靠差异而变化，不要按最短车次压时间。",
      "如果返程时间紧，建议优先研究开口票或小松机场方案。"
    ],
    dayPlan: [
      { day: "D1", title: "名古屋城市开场", detail: "名古屋城 + 大须 / 荣，美食和城市感先建立。" },
      { day: "D2", title: "吉卜力公园", detail: "整天锁给沉浸式园区体验。" },
      { day: "D3", title: "犬山 + 岐阜", detail: "用古城和河景给中部增加战国与城下町气质。" },
      { day: "D4", title: "名古屋进高山", detail: "JR 特急去高山，下午只做老街和飞驒牛，节奏不拉满。" },
      { day: "D5", title: "白川乡接金泽", detail: "高山 → 白川乡 → 金泽，整条线最有价值的层次切换。" },
      { day: "D6", title: "金泽深度日", detail: "近江町市场 → 金泽城 / 兼六园，再按古都线或艺术线细分。" },
      { day: "D7", title: "返程缓冲", detail: "金泽返程，留足巴士 / 特急 / 飞机衔接余量。" }
    ]
  }
];

const itineraryComplements = {
  "kansai-4": {
    prepTips: [
      "交通卡优先 ICOCA；手机 Suica/PASMO 也能覆盖大部分场景。",
      "KIX 到难波常见 34-45 分钟；第一晚也可直接走 Haruka 去京都。",
      "热门餐厅和岚山小火车属于高峰期预约项，建议提前锁。"
    ],
    stayFoodTips: [
      "住宿结构：D1 大阪难波，D2-D3 京都四条/河原町，D4 回大阪。",
      "大阪重点吃道顿堀/心斋桥/难波；京都重点吃祇园/先斗町/河原町。",
      "D4 晚尽量住去机场更顺的位置（难波/梅田/新大阪）。"
    ],
    replaceOptions: [
      "想看港口城市：D4 的新世界可替换成神户半日。",
      "想更安静的京都：D3 从岚山改成南禅寺/哲学之道线。"
    ],
    references: [
      { label: "南海电铁：KIX 到难波", url: "https://www.nankai.co.jp/en_railway/traffic/kix.html" },
      { label: "JR 西日本：Haruka 时刻表", url: "https://www.westjr.co.jp/global/en/timetable/pdf/haruka_timetable.pdf" }
    ]
  },
  "kansai-6": {
    prepTips: [
      "核心结构是经典关西 + 一个模块日，避免把多个模块硬塞同一天。",
      "USJ 门票/入园权益属于关键预约项，热门日期尽量提前。",
      "京都仍建议电车 + 步行为主，少依赖巴士。"
    ],
    stayFoodTips: [
      "住宿结构：D1-D2 大阪，D3-D5 京都，D6 回大阪。",
      "大阪负责夜宵和购物，京都负责晚餐氛围和慢走体验。",
      "若 D5 选神户，晚餐预算可有意识上调。"
    ],
    replaceOptions: [
      "只想最经典不后悔：模块日优先奈良。",
      "乐园优先：模块日锁 USJ，不叠加其他点。",
      "情侣慢旅行：模块日更推荐宇治或神户。"
    ],
    references: [
      { label: "南海电铁：KIX 到难波", url: "https://www.nankai.co.jp/en_railway/traffic/kix.html" },
      { label: "JR 西日本：Haruka 时刻表", url: "https://www.westjr.co.jp/global/en/timetable/pdf/haruka_timetable.pdf" }
    ]
  },
  "tokyo-4": {
    prepTips: [
      "优先羽田往返；4 天档若走成田会增加市区通勤成本。",
      "东京到伊豆建议大件行李宅急便，减少跨城搬运疲劳。",
      "伊豆天气影响较大，大室山和海线体验需当天看运行状态。"
    ],
    stayFoodTips: [
      "住宿结构：D1-D2 东京（涩谷/新宿/品川），D3 热海，D4 伊东或伊豆高原。",
      "东京段吃筑地和涩谷/新宿，伊豆段重点放温泉旅馆晚餐和早餐。",
      "伊豆最后一公里可适度打车，换取显著体力收益。"
    ],
    replaceOptions: [
      "想去南伊豆（下田线）：建议直接替换 D4，不与东伊豆叠加。",
      "不想卡巴士：可把东伊豆改成包车 8 小时方案。"
    ],
    references: [
      { label: "MOA 美术馆交通", url: "https://www.moaart.or.jp/en/access/" },
      { label: "大室山缆车票价/时间", url: "https://omuroyama.com/hours_fare/" }
    ]
  },
  "tokyo-6": {
    prepTips: [
      "这条线层次丰富但移动更复杂，行李寄存和转运策略很关键。",
      "镰仓观感强依赖天气，阴雨天可替换成东京室内线。",
      "伊豆段仍遵循先车少点位后车多点位，降低卡班次风险。"
    ],
    stayFoodTips: [
      "住宿可做两种：少搬家（都回东京）或顺路（镰仓/横滨分段住）。",
      "吃饭重心：东京筑地 + 银座，横滨中华街，伊豆旅馆正餐。",
      "若 D5 住热海，D6 去东伊豆通常更省脑力。"
    ],
    replaceOptions: [
      "想插迪士尼海洋：优先替换 D4 横滨或 D2 东京经典日。",
      "想泡温泉不想港口：D4 横滨可替换成箱根一日。",
      "偏古都寺院：D3 用长谷寺/镰仓大佛替换海线部分。"
    ],
    references: [
      { label: "MOA 美术馆交通", url: "https://www.moaart.or.jp/en/access/" },
      { label: "大室山缆车票价/时间", url: "https://omuroyama.com/hours_fare/" },
      { label: "东京迪士尼交通", url: "https://www.tokyodisneyresort.jp/en/tdr/access/railway.html" }
    ]
  },
  "chubu-4": {
    prepTips: [
      "中部线关键是跨城交通和预约，不是景点数量。",
      "吉卜力门票、高山-白川乡巴士建议尽早锁定。",
      "高山早市建议 8 点后去，通常比更早时段完整。"
    ],
    stayFoodTips: [
      "住宿结构：D1-D3 名古屋站，D4 高山（或白川乡）。",
      "名古屋主吃名古屋饭，高山主吃飞驒牛和老街小店。",
      "返程早班机时，宁可 D4 晚回名古屋，也不要把返程压太紧。"
    ],
    replaceOptions: [
      "如果吉卜力没票：D2 改成名古屋市内完整线仍成立。",
      "想更沉浸山里：D4 可做名古屋 → 白川乡 → 高山住。"
    ],
    references: [
      { label: "中部机场到名古屋（名铁）", url: "https://www.centrair.jp/en/access/train.html" },
      { label: "吉卜力公园交通", url: "https://ghibli-park.jp/en/directions" },
      { label: "高山-白川乡巴士", url: "https://www.japan-guide.com/bus/shirakawago.html" },
      { label: "名古屋城信息", url: "https://www.nagoyajo.city.nagoya.jp/en/nagoyajo/honmarugoten/" }
    ]
  },
  "chubu-6": {
    prepTips: [
      "6 天中部深度版最吃预约：白川乡与金泽方向巴士要先锁座。",
      "若长距离多靠巴士，可评估升龙道周游券是否划算。",
      "金泽部分公交支付方式不完全统一，建议备现金。"
    ],
    stayFoodTips: [
      "住宿结构：D1-D3 名古屋，D4 高山，D5-D6 金泽。",
      "名古屋负责城市和美食，高山负责山地感，金泽负责精致收尾。",
      "若买得到开口机票，NGO 进/KMQ 出可进一步降低折返。"
    ],
    replaceOptions: [
      "想更直线：可做名古屋落地 → 金泽 → 白川乡 → 高山 → 名古屋。",
      "想更山地：可压缩名古屋一天，给高山白川乡更多时间。"
    ],
    references: [
      { label: "吉卜力公园交通", url: "https://ghibli-park.jp/en/directions" },
      { label: "高山-白川乡-金泽巴士", url: "https://www.japan-guide.com/bus/shirakawago.html" },
      { label: "名古屋城信息", url: "https://www.nagoyajo.city.nagoya.jp/en/nagoyajo/honmarugoten/" }
    ]
  }
};

const filters = [
  { id: "all", label: "全部方案", test: () => true },
  { id: "4days", label: "4天档", test: (item) => item.tags.includes("4天档") },
  { id: "6days", label: "6天档", test: (item) => item.tags.includes("6天档") },
  { id: "kansai", label: "关西", test: (item) => item.region === "关西" },
  { id: "tokyo", label: "东京伊豆", test: (item) => item.region === "东京伊豆" },
  { id: "chubu", label: "中部", test: (item) => item.region === "中部" }
];

const factChecks = [
  {
    title: "KIX → 难波",
    summary: "南海 Rapi:t 常见 34-38 分钟；机场急行常见 42-45 分钟。",
    sourceLabel: "Nankai 官方 Access",
    sourceUrl: "https://www.nankai.co.jp/en_railway/access-fromkix"
  },
  {
    title: "KIX → 京都（Haruka）",
    summary: "JR Haruka 常见 75-80 分钟；时刻和停站按班次略有差异。",
    sourceLabel: "JR West Haruka Timetable",
    sourceUrl: "https://www.westjr.co.jp/global/en/timetable/pdf/haruka_timetable.pdf"
  },
  {
    title: "东京/品川 → 热海",
    summary: "东海道新干线常见约 29-45 分钟（车次不同会有差异）。",
    sourceLabel: "JR 时刻查询",
    sourceUrl: "https://timetables.jreast.co.jp/en/2602shinkansen/list/list0064.html"
  },
  {
    title: "大室山登山缆车",
    summary: "成人往返 1000 日元；季节时段不同，遇大风可能停运。",
    sourceLabel: "大室山官方",
    sourceUrl: "https://omuroyama.com/index_en/information_en/"
  },
  {
    title: "中部机场 → 名古屋",
    summary: "μ-SKY 约 28 分钟；普通特急约 37 分钟。",
    sourceLabel: "中部机场官方交通",
    sourceUrl: "https://www.centrair.jp/en/access/train.html"
  },
  {
    title: "羽田 → 涩谷",
    summary: "京急 + JR 常见约 30-35 分钟；单轨 + JR 常见约 35-50 分钟。",
    sourceLabel: "羽田机场官方 / 巴士官网",
    sourceUrl: "https://tokyo-haneda.com/en/access/train/"
  },
  {
    title: "高山 ↔ 白川乡",
    summary: "浓飞巴士常见约 50 分钟，旺季建议提前预约。",
    sourceLabel: "浓飞巴士官方",
    sourceUrl: "https://www.nouhibus.co.jp/route_bus/takayama-shirakawago-line-en/"
  },
  {
    title: "白川乡 → 金泽",
    summary: "不同班次差异较大，常见约 1小时15分到 2 小时级；不要只按最短车次估算。",
    sourceLabel: "浓飞巴士时刻表",
    sourceUrl: "https://www.nouhibus.co.jp/route_bus/shirakawago_en/"
  }
];

let activeFilterId = "all";

const filterBar = document.querySelector("#filter-bar");
const compareHead = document.querySelector("#compare-head");
const compareBody = document.querySelector("#compare-body");
const itineraryGrid = document.querySelector("#itinerary-grid");
const resultCount = document.querySelector("#result-count");
const factCheckGrid = document.querySelector("#fact-check-grid");
const expandAllBtn = document.querySelector("#expand-all-btn");
const collapseAllBtn = document.querySelector("#collapse-all-btn");
const imageModal = document.querySelector("#image-modal");
const imageModalImg = document.querySelector("#image-modal-img");
const imageModalCaption = document.querySelector("#image-modal-caption");
const imageModalClose = document.querySelector("#image-modal-close");

const travelPhotos = Array.isArray(window.TRAVEL_IMAGES) ? window.TRAVEL_IMAGES : [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeRouteKey(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("_", "-")
    .replaceAll(" ", "-")
    .replaceAll(/-?days/g, "")
    .trim();
}

function matchImageToRoute(photo, routeId) {
  const routeKey = normalizeRouteKey(routeId);
  const rawRoutes = Array.isArray(photo?.routes) ? photo.routes : [];

  if (!rawRoutes.length) {
    return false;
  }

  return rawRoutes.some((raw) => {
    const candidate = normalizeRouteKey(raw);
    return candidate === routeKey || routeKey.includes(candidate) || candidate.includes(routeKey);
  });
}

function getRouteImages(routeId) {
  return travelPhotos.filter((photo) => {
    if (typeof photo === "string") {
      return false;
    }
    return matchImageToRoute(photo, routeId);
  });
}

function renderRouteImagesBlock(routeId) {
  const routeImages = getRouteImages(routeId);
  if (!routeImages.length) {
    return `
      <section class="route-image-empty">
        暂无该路线的图片。可在 <strong>images-manifest.js</strong> 为图片配置 routes 字段后自动关联。
      </section>
    `;
  }

  const cards = routeImages
    .map((photo, index) => {
      const src = escapeHtml(photo.src || "");
      const caption = escapeHtml(photo.caption || `路线配图 ${index + 1}`);
      return `
        <article class="route-image-card" role="button" tabindex="0" data-src="${src}" data-caption="${caption}">
          <img src="${src}" alt="${caption}" loading="lazy" decoding="async">
          <p>${caption}</p>
        </article>
      `;
    })
    .join("");

  return `
    <section class="detail-block">
      <h4>路线相关图片</h4>
      <div class="route-image-grid">${cards}</div>
    </section>
  `;
}

function renderFactChecks() {
  if (!factCheckGrid) {
    return;
  }
  factCheckGrid.innerHTML = factChecks
    .map(
      (item) => `
        <article class="fact-item">
          <strong>${item.title}</strong>
          <p>${item.summary}</p>
          <a href="${item.sourceUrl}" target="_blank" rel="noreferrer">${item.sourceLabel}</a>
        </article>
      `
    )
    .join("");
}

function renderFilters() {
  filterBar.innerHTML = filters
    .map(
      (filter) => `
        <button
          type="button"
          class="filter-btn ${filter.id === activeFilterId ? "is-active" : ""}"
          data-filter="${filter.id}"
        >
          ${filter.label}
        </button>
      `
    )
    .join("");

  filterBar.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilterId = button.dataset.filter;
      renderFilters();
      renderVisibleSections();
    });
  });
}

function getVisibleItems() {
  const filter = filters.find((entry) => entry.id === activeFilterId) || filters[0];
  return itineraries.filter(filter.test);
}

function renderCompareTable(items) {
  compareHead.innerHTML = `
    <tr>
      <th>方案</th>
      <th>档期</th>
      <th>更适合哪种偏好</th>
      <th>最打动人的点</th>
      <th>要提前意识到</th>
    </tr>
  `;

  compareBody.innerHTML = items
    .map(
      (item) => `
        <tr>
          <td data-label="方案">
            <strong>${item.title}</strong><br>
            ${item.subtitle}
          </td>
          <td data-label="档期">${item.durationLabel}</td>
          <td data-label="更适合哪种偏好">${item.tableAudience}</td>
          <td data-label="最打动人的点">${item.tableHighlight}</td>
          <td data-label="要提前意识到">${item.tableCaution}</td>
        </tr>
      `
    )
    .join("");
}

function renderListBlock(title, items) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }
  return `
    <section class="detail-block">
      <h4>${title}</h4>
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderReferencesBlock(references) {
  if (!Array.isArray(references) || !references.length) {
    return "";
  }
  return `
    <section class="detail-block">
      <h4>参考链接</h4>
      <ul>
        ${references
          .map((entry) => `<li><a href="${entry.url}" target="_blank" rel="noreferrer">${entry.label}</a></li>`)
          .join("")}
      </ul>
    </section>
  `;
}

function renderCards(items) {
  resultCount.textContent = `当前展示 ${items.length} 条方案`;

  itineraryGrid.innerHTML = items
    .map(
      (item) => {
        const extra = itineraryComplements[item.id] || {};
        return `
        <article class="itinerary-card">
          <div class="card-top">
            <div>
              <span class="badge">${item.badge}</span>
              <h3>${item.title}</h3>
              <p class="card-subtitle">${item.subtitle}</p>
            </div>
            <div class="card-meta">
              <span class="meta-chip">${item.region}</span>
              <span class="meta-chip">${item.durationLabel}</span>
            </div>
          </div>

          <p class="decision-line">${item.decision}</p>
          <p>${item.pitch}</p>

          <div class="tag-list">
            ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>

          ${renderRouteImagesBlock(item.id)}

          <button type="button" class="expand-toggle" data-expand-toggle aria-expanded="false">
            展开完整方案（行程、提醒、参考）
          </button>

          <section class="route-details" data-route-details>
            <div class="detail-grid">
              ${renderListBlock("住哪里最顺", item.stayPlan)}
              ${renderListBlock("最适合你们的情况", item.bestFor)}
              ${renderListBlock("提前提醒", item.watchOut)}
              ${renderListBlock("出行准备补充", extra.prepTips)}
              ${renderListBlock("机场/住哪/吃哪补充", extra.stayFoodTips)}
              ${renderListBlock("可替换玩法", extra.replaceOptions)}
              ${renderReferencesBlock(extra.references)}
            </div>
            <section class="detail-block">
              <h4>每日节奏</h4>
              <div class="day-list">
                ${item.dayPlan
                  .map(
                    (day) => `
                      <div class="day-item">
                        <strong>${day.day}｜${day.title}</strong>
                        <span>${day.detail}</span>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </section>
          </section>
        </article>
      `;
      }
    )
    .join("");

  bindRouteImageEvents();
  bindCardExpandEvents();
}

function renderVisibleSections() {
  const visibleItems = getVisibleItems();
  renderCompareTable(visibleItems);
  renderCards(visibleItems);
}

function openImageModal(src, caption) {
  imageModalImg.src = src;
  imageModalImg.alt = caption || "旅行配图";
  imageModalCaption.textContent = caption || "";
  imageModal.hidden = false;
  imageModal.setAttribute("aria-hidden", "false");
}

function closeImageModal() {
  imageModal.hidden = true;
  imageModal.setAttribute("aria-hidden", "true");
  imageModalImg.src = "";
  imageModalCaption.textContent = "";
}

function setupModalEvents() {
  imageModalClose.addEventListener("click", closeImageModal);
  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closeImageModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !imageModal.hidden) {
      closeImageModal();
    }
  });
}

function bindRouteImageEvents() {
  itineraryGrid.querySelectorAll(".route-image-card").forEach((card) => {
    const src = card.getAttribute("data-src");
    const caption = card.getAttribute("data-caption") || "";
    card.addEventListener("click", () => openImageModal(src, caption));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImageModal(src, caption);
      }
    });
  });
}

function bindCardExpandEvents() {
  itineraryGrid.querySelectorAll(".itinerary-card").forEach((card) => {
    const toggle = card.querySelector("[data-expand-toggle]");
    const panel = card.querySelector("[data-route-details]");
    const header = card.querySelector(".card-top");
    if (!toggle || !panel) {
      return;
    }

    const setOpen = (isOpen) => {
      panel.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "收起完整方案" : "展开完整方案（行程、提醒、参考）";
    };

    const onToggle = () => {
      const isOpen = !panel.classList.contains("is-open");
      setOpen(isOpen);
    };

    toggle.addEventListener("click", onToggle);
    header?.addEventListener("click", onToggle);
    if (header) {
      header.classList.add("is-clickable");
      header.setAttribute("tabindex", "0");
      header.setAttribute("role", "button");
      header.setAttribute("aria-label", "展开或收起完整方案");
      header.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      });
    }

    card.addEventListener("set-open", (event) => {
      const detail = event.detail || {};
      setOpen(Boolean(detail.open));
    });
  });
}

function bindExpandAllActions() {
  expandAllBtn?.addEventListener("click", () => {
    itineraryGrid.querySelectorAll(".itinerary-card").forEach((card) => {
      card.dispatchEvent(new CustomEvent("set-open", { detail: { open: true } }));
    });
  });

  collapseAllBtn?.addEventListener("click", () => {
    itineraryGrid.querySelectorAll(".itinerary-card").forEach((card) => {
      card.dispatchEvent(new CustomEvent("set-open", { detail: { open: false } }));
    });
  });
}

function init() {
  renderFactChecks();
  renderFilters();
  setupModalEvents();
  renderVisibleSections();
  bindExpandAllActions();
}

document.addEventListener("DOMContentLoaded", init);

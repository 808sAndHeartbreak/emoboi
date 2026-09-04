"use strict";

document.documentElement.classList.add("js");

const MIDDLE_NIGHTS = 8;
const TOTAL_DAYS = 13;
const CNY_TO_VND = 3880;
const STORAGE_KEY = "emoboi-vn-route-v5";
const LEGACY_STORAGE_KEYS = ["emoboi-vn-route-v4", "emoboi-vn-route-v3", "emoboi-vn-route-v2"];
const ARRIVAL_DATE = new Date("2026-09-25T17:45:00+07:00");
const MIDDLE_START_DATE = new Date("2026-09-27T12:00:00+07:00");
const HOTEL_CHECKIN_DATE = new Date("2026-10-05T15:00:00+07:00");
const HOTEL_CHECKOUT_DATE = new Date("2026-10-07T12:00:00+07:00");

const CITIES = {
  hanoi: {
    name: "河内", local: "Hà Nội", airport: "HAN", region: "北部",
    minNights: 2, recommendedNights: 2, maxNights: 4, defaultNights: 2, budget: [850000, 1600000], order: 21.03,
    coordinates: [21.0285, 105.8542],
    themes: ["建筑", "老城", "咖啡", "寺庙"],
    durationGuide: {
      2: "1 个完整日：老城、建筑与咖啡足够；27 日按航班保留半天机动。",
      3: "2 个完整日：增加升龙皇城、西湖或一场博物馆，不必跑远郊。",
      4: "3 个完整日：再加陶艺、街区慢走或酒店休息，避免连续安排历史景点。"
    },
    summary: "老城区、大教堂、咖啡与历史建筑。",
    plays: ["还剑湖 Hoàn Kiếm", "河内大教堂 St. Joseph’s Cathedral", "升龙皇城 Imperial Citadel", "文庙 Temple of Literature", "咖啡工作坊 Coffee Workshop", "西湖与镇国寺"],
    caution: "9–10 月通常舒适；HAN 距市中心约 45 公里，单程按 60–90 分钟留量。",
    stay: "还剑湖西北侧或老城区边缘：步行方便，夜间比老城腹地安静。",
    move: "老城以步行为主，跨区用 Grab。9 月 27 日退房后可寄存行李；按下一站航班选择中午、下午或晚上前往 HAN。",
    days: [
      { theme: "老城与咖啡", am: "还剑湖、老城区、河内大教堂；中午在老城吃粉或烤肉米线", pm: "预约咖啡工作坊；若留到大叻再做，就换成文庙或越南美术馆" },
      { theme: "历史与寺庙", am: "升龙皇城或文庙；对历史兴趣不大就改去西湖慢走", pm: "镇国寺、咖啡馆与自由觅食；不再增加远郊" }
    ],
    restDay: { am: "睡到自然醒、酒店早餐或西湖散步", pm: "咖啡、SPA、自由觅食；不再增加远郊景点" }
  },
  danang: {
    name: "岘港", local: "Đà Nẵng", airport: "DAD", region: "中部",
    minNights: 3, recommendedNights: 3, maxNights: 5, defaultNights: 3, budget: [900000, 1800000], order: 16.0544,
    coordinates: [16.0544, 108.2022],
    themes: ["海边", "会安", "占婆文化", "慢生活"],
    durationGuide: {
      2: "只有 1 个完整日：岘港与会安必须二选一，不建议这样排。",
      3: "2 个完整日：一天岘港、一天会安，已经是舒服游玩的最低值。",
      4: "3 个完整日：增加安邦海滩、Tra Que 菜园或完整酒店休息日。",
      5: "4 个完整日：适合岘港与会安各住一段；新增时间只给海边和慢生活。"
    },
    summary: "海滩、山茶半岛；以岘港为交通节点去会安。",
    plays: ["美溪海滩 Mỹ Khê", "占婆雕刻博物馆", "山茶半岛 Sơn Trà", "五行山 Ngũ Hành Sơn", "会安古城 Hội An", "Tra Que 菜园 / An Bàng 海滩"],
    caution: "9 月底通常仍温暖；会安 10 月起雨势和风暴风险上升，临行前按天气交换海滩与室内安排。",
    stay: "美溪海滩适合休闲；海州区适合餐饮和夜生活。两区车程约 10–20 分钟。",
    move: "DAD 到市区约 15 分钟；会安约 45–60 分钟；山茶半岛建议包车或摩托。",
    days: [
      { theme: "海边与占婆", am: "美溪海滩早晨；占婆雕刻博物馆", pm: "海州区吃喝、韩江散步；龙桥只在合适日期顺路看" },
      { theme: "会安人文", am: "五行山后前往会安；或直接去 Tra Que 菜园、Cam Chau 稻田", pm: "会安古城、晚餐与灯笼夜景；约 21:00 返回或住会安" },
      { theme: "半岛与休息", am: "山茶半岛，雨雾或路况不好就取消", pm: "安邦或美溪海边、酒店休息，不连排远景点" }
    ],
    restDay: { am: "酒店早餐、泳池或海边躺着", pm: "咖啡、按摩、海鲜；不安排巴拿山式长途打卡" }
  },
  nhatrang: {
    name: "芽庄", local: "Nha Trang", airport: "CXR", region: "中南部",
    minNights: 2, recommendedNights: 3, maxNights: 5, defaultNights: 3, budget: [1000000, 2100000], order: 12.2388,
    coordinates: [12.2388, 109.1967],
    themes: ["占婆文化", "泥浆浴", "海岛", "度假"],
    durationGuide: {
      2: "1 个完整日：婆那加塔与泥浆浴最稳妥，出海和珍珠岛先不塞。",
      3: "2 个完整日：文化泥浴一天，跳岛或珍珠岛二选一。",
      4: "3 个完整日：增加海洋博物馆、海边与半天休息，给风浪留替代方案。",
      5: "4 个完整日：适合再留一整天给酒店、SPA 和海边，不连续两天出海。"
    },
    summary: "泥浆浴、海岛活动、珍珠岛与纯度假。",
    plays: ["婆那加塔 Po Nagar", "I-Resort 泥浆浴", "跳岛团 / 黑珍珠号候选", "珍珠岛 VinWonders", "国家海洋博物馆", "陈富海滩 Trần Phú"],
    caution: "9–12 月是雨季；出海必须看风浪。CXR 到市区约 45–60 分钟。",
    stay: "陈富海滩中段最省事；北部安静但餐饮较少；离岛玩法从南部码头出发。",
    move: "市区用 Grab；婆那加塔与 I-Resort 可连排。跳岛团或珍珠岛都要单独占一天，不建议同一天安排。",
    days: [
      { theme: "占婆与泥浴", am: "婆那加塔、钟屿石岬，避开正午", pm: "I-Resort 泥浆浴；回市区吃海鲜" },
      { theme: "海岛全天", am: "跳岛团与珍珠岛二选一：跳岛可比较飞猪‘黑珍珠号’的航线、船型和取消规则", pm: "跳岛继续出海；或乘跨海缆车去珍珠岛游乐园，晚上不要再排项目" },
      { theme: "海洋与慢游", am: "越南国家海洋博物馆或市区海滩；风浪差时用作出海替代", pm: "晚起、长早餐、夜市或沿海散步；只选一个轻量点位" }
    ],
    restDay: { am: "度假酒店、泳池或海边躺着", pm: "继续待在酒店，或按摩、咖啡、找好吃的；不塞景点" },
  },
  camranh: {
    name: "芽庄 · 金兰湾", shortName: "金兰湾", local: "Cam Ranh", airport: "CXR", region: "已确认度假村",
    minNights: 2, recommendedNights: 2, maxNights: 2, defaultNights: 2, budget: [500000, 1400000], order: 12.05,
    coordinates: [12.0447, 109.1951],
    themes: ["度假村", "SPA", "海滩", "休息"],
    durationGuide: { 2: "两晚已确认：入住日下午留白，完整日只安排 SPA、泳池与海滩。" },
    summary: "Fusion Resort Cam Ranh，两晚只安排度假、SPA 与返程。",
    plays: ["Fusion Resort Cam Ranh", "All Spa Inclusive", "泳池与海滩", "12:00 退房去 CXR T1"],
    caution: "10 月 5 日 15:00 入住，10 月 7 日 12:00 退房；酒店距 CXR 约 5–6 公里。",
    stay: "Fusion Resort Cam Ranh，Lot D10b, Cam Hai Dong, Cam Lam, Khanh Hoa。",
    move: "提前向酒店预约送机。10 月 7 日建议 11:30–11:45 办完退房，12:00 前后出发去 CXR T1。",
    days: [
      { theme: "纯度假", am: "睡到自然醒、早餐和海边散步", pm: "提前预约 SPA；其余时间留给泳池、午睡和度假村晚餐" }
    ],
    restDay: { am: "酒店早餐、泳池与海滩", pm: "SPA、休息和晚餐；不再往返芽庄市区" }
  },
  dalat: {
    name: "大叻", local: "Đà Lạt", airport: "DLI", region: "中部高原",
    minNights: 2, recommendedNights: 3, maxNights: 4, defaultNights: 3, budget: [850000, 1700000], order: 11.9404,
    coordinates: [11.9404, 108.4583],
    themes: ["咖啡", "高原建筑", "瀑布", "慢生活"],
    durationGuide: {
      2: "1 个完整日：市区建筑与达坦拉二选一条主线，时间会偏紧。",
      3: "2 个完整日：建筑咖啡一天、瀑布泉林湖一天，节奏最合适。",
      4: "3 个完整日：增加咖啡农场或工作坊，并留半天给降雨和发呆。"
    },
    summary: "高原气候、咖啡、建筑与瀑布。",
    plays: ["达坦拉瀑布 Datanla", "大叻旧火车站", "灵福寺 Chùa Linh Phước", "泉林湖 Hồ Tuyền Lâm", "Cầu Đất 咖啡产区", "K’Ho Coffee"],
    caution: "4–11 月多雨，早晚偏凉；山路与户外项目不要排满。DLI 到市区约 40 分钟。",
    stay: "春香湖西南与大叻市场周边适合步行；泉林湖更安静，但每天需要用车。",
    move: "景点分散。城区步行；北线、南线各用半天至一天，建议包车或摩托。",
    days: [
      { theme: "建筑与咖啡", am: "春香湖、旧火车站；班次合适再坐小火车去灵福寺", pm: "挑两家咖啡店慢慢坐；咖啡工作坊可改在大叻预约" },
      { theme: "瀑布与山湖", am: "达坦拉瀑布，雨大或路滑就取消", pm: "竹林禅院、泉林湖或回酒店休息，不把南线塞满" },
      { theme: "产地咖啡", am: "Cầu Đất 茶咖啡产区或 K'Ho 咖啡农场，提前确认体验是否开放", pm: "回城继续喝咖啡、逛市场，不再跨线赶景点" }
    ],
    restDay: { am: "晚起、咖啡和酒店发呆", pm: "SPA、市场晚餐；留给降雨或体力恢复" }
  },
  hue: {
    name: "顺化", local: "Huế", airport: "HUI", region: "中部",
    minNights: 2, recommendedNights: 2, maxNights: 4, defaultNights: 2, budget: [750000, 1500000], order: 16.4637,
    coordinates: [16.4637, 107.5909],
    themes: ["皇城", "陵墓", "寺庙", "地方饮食"],
    durationGuide: {
      2: "1 个完整日：皇城加一座皇陵或天姥寺，适合短停。",
      3: "2 个完整日：皇城、两座皇陵、寺庙与饮食都能展开。",
      4: "3 个完整日：增加香河慢游与雨天机动，不再堆更多陵墓。"
    },
    summary: "皇城、皇陵、寺庙与中部饮食。",
    plays: ["顺化皇城 Imperial City", "启定陵 Khải Định", "明命陵 Minh Mạng", "天姥寺 Thiên Mụ", "东巴市场 Đông Ba", "顺化宫廷菜与街头小吃"],
    caution: "9 月后降雨增加；10 月需防积水。",
    stay: "香河南岸餐饮多；皇城南门一带更靠近古迹。",
    move: "皇城可步行；皇陵分散，适合包车或摩托串联。顺化到岘港约 2.5–3.5 小时。",
    days: [
      { theme: "皇城与饮食", am: "顺化皇城，早到避开热和人流", pm: "天姥寺或东巴市场；晚餐吃顺化小吃" },
      { theme: "阮朝陵墓", am: "启定陵与明命陵选一至两座，不追求全部打卡", pm: "香河沿岸、咖啡；雨天不再增加点位" }
    ],
    restDay: { am: "酒店早餐、香河慢走", pm: "找一家顺化菜餐厅，雨天不勉强跑远" }
  },
  hcmc: {
    name: "胡志明市", local: "TP. Hồ Chí Minh", airport: "SGN", region: "南部",
    minNights: 3, recommendedNights: 3, maxNights: 5, defaultNights: 3, budget: [1100000, 2200000], order: 10.8231,
    coordinates: [10.8231, 106.6297],
    themes: ["建筑", "街区", "华人文化", "夜生活"],
    durationGuide: {
      2: "只有 1 个完整日：第一郡与第三郡为主，不建议加入远郊。",
      3: "2 个完整日：中心建筑一天、堤岸与街区一天，最适合本次短停。",
      4: "3 个完整日：再选古芝或湄公河一日游，也可改成城市休息日。",
      5: "4 个完整日：增加咖啡、当代艺术、SPA 或完整酒店休息日。"
    },
    summary: "城市建筑、市场、华人区与夜生活。",
    plays: ["中央邮局 Central Post Office", "统一宫 Independence Palace", "第三郡街区", "堤岸 Chợ Lớn", "天后宫 Chùa Bà Thiên Hậu", "咖啡与街头饮食"],
    caution: "5–11 月雨季；加入后路线明显南延。",
    stay: "第一郡最方便；第三郡更安静、餐饮密集。",
    move: "核心区可步行加 Grab；堤岸需用车；古芝或湄公河各占一整天。",
    days: [
      { theme: "建筑与城市", am: "第一郡建筑与咖啡，避开正午暴晒", pm: "市场、步行街或河岸夜景" },
      { theme: "街区与华人文化", am: "第三郡街区", pm: "堤岸、天后宫与华人区；晚餐后直接回酒店" },
      { theme: "近郊或休息", am: "古芝或湄公河一日游二选一；不想赶路就留在城市", pm: "一日游返程，或改成按摩、咖啡和慢晚餐" }
    ],
    restDay: { am: "晚起、酒店早餐和咖啡", pm: "按摩、商场避雨或自由觅食" }
  },
  phuquoc: {
    name: "富国岛", local: "Phú Quốc", airport: "PQC", region: "南部海岛",
    minNights: 3, recommendedNights: 4, maxNights: 5, defaultNights: 4, budget: [1400000, 3000000], order: 10.226,
    coordinates: [10.2899, 103.984],
    themes: ["海滩", "跳岛", "雨林", "度假村"],
    durationGuide: {
      3: "2 个完整日：天气允许时跳岛一天，其余时间留给海滩和休息。",
      4: "3 个完整日：增加北岛雨林或渔村，并保留完整度假日。",
      5: "4 个完整日：最能吸收雨季天气变化；新增时间不再安排打卡。"
    },
    summary: "海滩、日落、跳岛与自然。",
    plays: ["长滩 Long Beach", "南岛跳岛", "跨海缆车 Hòn Thơm", "富国国家公园", "渔村", "Dương Đông 夜市"],
    caution: "7–10 月风浪和强降雨风险较高；至少 3 晚。",
    stay: "长滩交通方便；翁朗更安静；南岛适合度假村但离市区远。",
    move: "岛内距离长，包车或摩托更实际；跳岛与南岛景点合并安排。",
    days: [
      { theme: "海滩与日落", am: "酒店和海滩，不急着出门", pm: "日落、夜市或度假村晚餐" },
      { theme: "南岛海上活动", am: "天气允许再做南岛跳岛或缆车", pm: "返程休息；风浪大就留在酒店" },
      { theme: "雨林与渔村", am: "北岛国家公园或渔村", pm: "回酒店游泳、看日落" }
    ],
    restDay: { am: "度假村、泳池和海滩", pm: "SPA、日落和晚餐；这一天本来就不需要景点" }
  },
  quynhon: {
    name: "归仁", local: "Quy Nhơn", airport: "UIH", region: "中南部海岸",
    minNights: 2, recommendedNights: 3, maxNights: 4, defaultNights: 3, budget: [800000, 1650000], order: 13.782,
    coordinates: [13.782, 109.219],
    themes: ["海滩", "占婆塔", "渔村", "慢旅行"],
    durationGuide: {
      2: "1 个完整日：市区海岸与一组占婆塔，适合顺路短停。",
      3: "2 个完整日：增加半岛、渔村或海滩慢游，节奏更完整。",
      4: "3 个完整日：再留一整天给安静海滩、温泉或酒店休息。"
    },
    summary: "安静海岸、占婆遗迹与渔村，比热门海滨城市更松弛。",
    plays: ["Tháp Đôi 双塔", "Tháp Bánh Ít 占婆塔", "归仁海滨步道", "Eo Gió 海岬", "Kỳ Co 海滩", "渔村与海鲜"],
    caution: "9–12 月降雨和风浪增加；远海活动临近确认。UIH 到市区约 40–50 分钟。",
    stay: "市区海滨步道附近吃饭方便；想安静可住半岛度假村，但进城距离更远。",
    move: "市区用 Grab；占婆塔、Eo Gió 和渔村分散，半天包车比频繁叫车省事。",
    days: [
      { theme: "占婆与城市", am: "Tháp Đôi 双塔、市场或地方博物馆", pm: "海滨步道、海鲜和日落；不赶远郊" },
      { theme: "半岛与渔村", am: "Eo Gió 或 Kỳ Co 按风浪二选一", pm: "渔村午餐后回酒店休息；天气差就改 Bánh Ít 占婆塔" },
      { theme: "海滩休息", am: "睡到自然醒、安静海滩或温泉", pm: "酒店、咖啡和海鲜；不再增加景点" }
    ],
    restDay: { am: "海边、酒店早餐和泳池", pm: "按摩、咖啡或海鲜；给天气留白" }
  },
  buonmathuot: {
    name: "邦美蜀", local: "Buôn Ma Thuột", airport: "BMV", region: "中部高原",
    minNights: 2, recommendedNights: 3, maxNights: 4, defaultNights: 3, budget: [700000, 1450000], order: 12.666,
    coordinates: [12.666, 108.038],
    themes: ["咖啡", "埃地族文化", "瀑布", "高原"],
    durationGuide: {
      2: "1 个完整日：咖啡世界博物馆与城市咖啡，文化线只能浅尝。",
      3: "2 个完整日：咖啡一天、埃地族文化或瀑布一天，最适合本次行程。",
      4: "3 个完整日：增加 Lak 湖或 Yok Đôn 方向，但必须接受较长陆路。"
    },
    summary: "越南咖啡之都，能把咖啡、埃地族文化和高原自然放在一起。",
    plays: ["咖啡世界博物馆", "Trung Nguyên Coffee Village", "Ako Dhong 村", "埃地族长屋", "Dray Nur 瀑布", "Lak 湖 / Yok Đôn"],
    caution: "5–10 月雨季；瀑布水量大但路面湿滑。BMV 到市区约 20 分钟。",
    stay: "市中心咖啡和餐饮最方便；不建议为了景观住得过远。",
    move: "市区用 Grab；瀑布、村落与 Lak 湖适合包车。去大叻约 5–6 小时山路。",
    days: [
      { theme: "咖啡文化", am: "咖啡世界博物馆，理解产区、器具与贸易", pm: "本地烘焙店或咖啡庄园；不要只做网红店巡游" },
      { theme: "族群与自然", am: "埃地族长屋或 Ako Dhong 村，尊重当地拍摄规则", pm: "Dray Nur 瀑布；雨大路滑就换成城市咖啡与市场" },
      { theme: "高原慢游", am: "Lak 湖或 Yok Đôn 方向二选一，提前确认车程", pm: "返城休息、按摩和早晚餐" }
    ],
    restDay: { am: "晚起、咖啡和市场", pm: "酒店休息或 SPA；不再增加长途自然点" }
  }
};

const PRESETS = [
  {
    id: "classic", name: "海岸高原",
    stops: [["hanoi", 2], ["danang", 3], ["dalat", 3], ["nhatrang", 2], ["camranh", 2]],
    note: "岘港 3 晚、大叻 3 晚、芽庄市区 2 晚，一路向南进入金兰湾。DAD → DLI 已恢复直飞，仍需确认 09.30 的具体班次。"
  },
  {
    id: "highland", name: "大叻慢住",
    stops: [["hanoi", 2], ["dalat", 4], ["nhatrang", 4], ["camranh", 2]],
    note: "中段：大叻 4 晚、芽庄市区 4 晚。转场最少，咖啡、泥浆浴、出海和休息都有机动。"
  },
  {
    id: "coast", name: "海边慢行",
    stops: [["hanoi", 2], ["danang", 4], ["nhatrang", 4], ["camranh", 2]],
    note: "中段：岘港 4 晚、芽庄市区 4 晚。节奏最轻松；10.01 前后 DAD → CXR 航班是关键。"
  },
  {
    id: "central", name: "中部慢游",
    stops: [["hanoi", 2], ["hue", 2], ["danang", 3], ["nhatrang", 3], ["camranh", 2]],
    note: "中段：顺化 2 晚、岘港 3 晚、芽庄市区 3 晚。古迹与海边兼顾，但需要多一次转场。"
  },
  {
    id: "south", name: "南部串联",
    stops: [["hanoi", 2], ["hcmc", 3], ["dalat", 3], ["nhatrang", 2], ["camranh", 2]],
    note: "中段：胡志明市 3 晚、大叻 3 晚、芽庄市区 2 晚。内容丰富，但南北飞行和陆路转场最多。"
  },
  {
    id: "coffee", name: "咖啡高原",
    stops: [["hanoi", 2], ["buonmathuot", 3], ["dalat", 3], ["nhatrang", 2], ["camranh", 2]],
    note: "中段：邦美蜀 3 晚、大叻 3 晚、芽庄市区 2 晚。咖啡与高原内容最完整；两段山路都安排在白天。"
  },
  {
    id: "cham", name: "占婆海岸",
    stops: [["hanoi", 2], ["danang", 3], ["quynhon", 3], ["nhatrang", 2], ["camranh", 2]],
    note: "中段：岘港 3 晚、归仁 3 晚、芽庄市区 2 晚。海岸与占婆文化清楚，但两次中段转场会各占半天。"
  }
];

const DEFAULT_ROUTE = presetRoute(PRESETS[0]);

const TRANSPORT = {};
const leg = (a, b, data) => { TRANSPORT[[a, b].sort().join("|")] = data; };

leg("hanoi", "danang", { mode: "飞机", duration: [1.3, 1.5], price: [700000, 1500000], note: "HAN 与 DAD 直飞选择通常最多；另计两端机场时间。", warning: "两地酒店之间按 4–5 小时安排。", startWindow: "9 月 27 日优先 12:00–16:00 起飞：上午仍可留在河内，晚饭前抵达岘港；若票价明显更好，晚班也可。", window: "优先 09:00–12:00 起飞；约 14:00–16:00 入住。" });
leg("hanoi", "nhatrang", { mode: "飞机", duration: [1.8, 2.0], price: [1000000, 2200000], note: "HAN 与 CXR 通常可直飞；金兰机场到芽庄市区还需约 45–60 分钟。", warning: "两地酒店之间通常约 5 小时。", startWindow: "9 月 27 日优先 11:00–15:00 起飞；落地、进城后只安排看海与晚餐。", window: "优先上午直飞；抵达后只安排酒店周边散步与晚餐。" });
leg("hanoi", "dalat", { mode: "飞机", duration: [1.6, 2], price: [1200000, 2500000], note: "HAN 与 DLI 有直飞；大叻一侧还需约 40 分钟机场接驳。", warning: "航班频次不如主干线，订票前复核 9 月 27 日具体班次。", startWindow: "9 月 27 日优先 11:00–16:00 的直飞；若当天只有早班或晚班，再与先飞岘港的方案比较。", window: "优先 10:00–15:00 直飞；避免晚班挤压抵达日。" });
leg("hanoi", "hue", { mode: "飞机", duration: [1.2, 1.4], price: [800000, 1700000], note: "HAN 与 HUI 之间优先选直飞。", warning: "另计两端机场接驳。", startWindow: "9 月 27 日优先中午至下午直飞；抵达后只沿香河吃饭散步。", window: "优先上午直飞；下午入住后只安排酒店周边。" });
leg("hanoi", "hcmc", { mode: "飞机", duration: [2.0, 2.3], price: [1100000, 2400000], note: "HAN 与 SGN 之间航班密集，但这段会跨越越南南北。", warning: "若之后折返中部，会增加一次长距离转场。" });
leg("hanoi", "phuquoc", { mode: "飞机", duration: [2.1, 2.4], price: [1400000, 3000000], note: "HAN 与 PQC 之间优先选直飞；部分时段可能需经胡志明市。", warning: "班次和直飞情况需按出发日确认。" });
leg("danang", "nhatrang", { mode: "飞机", duration: [1.1, 1.3], price: [900000, 2300000], note: "当前航线资料显示约每日 1–2 班直飞；火车约 9–11 小时。", warning: "默认路线的关键航段：先确认当天直飞，再锁定酒店。", window: "优先 09:00–13:00 直飞；约 15:00–17:00 入住下一站。" });
leg("danang", "dalat", { mode: "飞机", duration: [1.1, 1.3], price: [900000, 2400000], note: "DAD → DLI 直飞于 2026 年 8 月恢复，当前资料显示越航与越捷运营。", warning: "航线刚恢复，先核对具体日期、起飞时段与变更记录，再锁定酒店。", window: "有合适直飞就选 09:00–14:00；整段连机场接驳按半天计算。" });
leg("danang", "hue", { mode: "火车 / 巴士 / 包车", duration: [2.5, 3.5], price: [120000, 450000], note: "经海云岭往返，陆路比坐飞机自然；火车景观较好。", warning: "雨天公路耗时可能增加。", window: "建议 08:00–09:00 出发；午后入住下一站。" });
leg("danang", "hcmc", { mode: "飞机", duration: [1.4, 1.7], price: [900000, 2100000], note: "DAD 与 SGN 之间直飞通常较多。", warning: "两地酒店之间按 4–5 小时安排。" });
leg("danang", "phuquoc", { mode: "飞机", duration: [1.7, 4.5], price: [1200000, 3000000], note: "有直飞时最方便，否则通常经胡志明市中转。", warning: "先按具体日期确认是否直飞。" });
leg("nhatrang", "dalat", { mode: "巴士 / 小车", duration: [3, 4.5], price: [180000, 500000], note: "约 138 公里山路；班次多，不必飞行。", warning: "弯道多，选白天班次并准备晕车药。", window: "建议 08:00–09:00 出发；约 12:00–13:30 抵达下一站。" });
leg("nhatrang", "hue", { mode: "飞机或夜班卧铺", duration: [5, 13], price: [550000, 2200000], note: "通常没有稳定直飞；可经岘港接陆路，或乘夜班火车/巴士。", warning: "会消耗半天到一晚，不适合频繁插入。" });
leg("nhatrang", "hcmc", { mode: "飞机 / 火车", duration: [1.1, 8], price: [450000, 1700000], note: "飞行最快；火车或卧铺巴士可节省住宿但更疲劳。", warning: "金兰机场接驳会增加约 1 小时。" });
leg("nhatrang", "phuquoc", { mode: "飞机中转", duration: [3.5, 6], price: [1400000, 3200000], note: "通常经胡志明市中转；不建议走全程陆路。", warning: "中转时间随航班组合变化较大。" });
leg("dalat", "hue", { mode: "飞机中转 / 长途巴士", duration: [5, 14], price: [700000, 2500000], note: "两地跨越中部较长距离，通常无稳定直飞。", warning: "这组顺序会形成明显北返，路线效率较低。" });
leg("dalat", "hcmc", { mode: "飞机 / 巴士", duration: [1, 7], price: [300000, 1600000], note: "飞机约 1 小时；巴士可从市区直接出发，但需约 6–8 小时。", warning: "节省预算可选白天巴士，节省时间选飞机。" });
leg("dalat", "phuquoc", { mode: "飞机中转", duration: [3.5, 6], price: [1400000, 3200000], note: "通常经胡志明市中转，没有合适衔接时可能需住一晚。", warning: "务必按日期核对联程与行李规则。" });
leg("hue", "hcmc", { mode: "飞机", duration: [1.4, 1.7], price: [900000, 2100000], note: "HUI 与 SGN 之间直飞最适合短行程。", warning: "航班选择少于岘港出发。" });
leg("hue", "phuquoc", { mode: "飞机中转", duration: [4, 7], price: [1500000, 3400000], note: "通常经胡志明市中转；也可先陆路到岘港再飞。", warning: "转场成本较高，本次行程不建议同时保留过多节点。" });
leg("hcmc", "phuquoc", { mode: "飞机", duration: [1, 1.2], price: [700000, 1700000], note: "SGN 与 PQC 之间飞行最省时；巴士加轮渡通常约 10–12 小时。", warning: "雨季尾段可能影响海上活动，但通常不影响航空主线。", window: "优先上午直飞；下午只安排酒店周边活动。" });
leg("nhatrang", "camranh", { mode: "出租车 / 酒店接送", duration: [0.7, 1.2], price: [300000, 650000], note: "芽庄市区到金兰半岛约 35–45 公里；直接送到 Fusion Resort。", warning: "不要先去机场再转酒店。", window: "10 月 5 日约 13:30 从芽庄市区出发，15:00 前后办理入住。" });
leg("dalat", "camranh", { mode: "小车 / 巴士", duration: [3, 4.5], price: [350000, 1500000], note: "大叻到金兰湾为山路；包车可直接送到度假村，巴士通常需要再转车。", warning: "选白天出发并准备晕车药。", window: "10 月 5 日建议 09:00 前后出发，午后到度假村等待 15:00 入住。" });
leg("danang", "camranh", { mode: "飞机 + 接送", duration: [1.1, 1.3], price: [1000000, 2500000], note: "优先 DAD → CXR 直飞；CXR 到 Fusion Resort 约 5–6 公里。", warning: "直飞班次需要按 10 月 5 日复核。", window: "选 10 月 5 日上午航班，预留延误后仍能在下午入住。" });
leg("hanoi", "camranh", { mode: "飞机 + 接送", duration: [1.8, 2.0], price: [1100000, 2400000], note: "HAN → CXR 通常可直飞；落地后直接去 Fusion Resort。", warning: "酒店仅固定 10 月 5 日起入住。", window: "选 10 月 5 日中午前抵达 CXR 的航班。" });
leg("hue", "camranh", { mode: "陆路到岘港后飞行", duration: [5, 8], price: [1300000, 3100000], note: "先从顺化到 DAD，再飞 CXR；不建议把这段留到入住日下午。", warning: "组合交通变数较多，最好提前一天到芽庄。" });
leg("hcmc", "camranh", { mode: "飞机 + 接送", duration: [1, 1.2], price: [800000, 1900000], note: "SGN → CXR 航班较多；落地后直接去度假村。", warning: "仍要计入两端机场时间。" });
leg("phuquoc", "camranh", { mode: "飞机中转", duration: [3.5, 6], price: [1500000, 3400000], note: "通常经胡志明市中转到 CXR。", warning: "10 月 5 日当天中转风险偏高，建议前一晚先到芽庄。" });
leg("hanoi", "quynhon", { mode: "飞机", duration: [1.6, 1.8], price: [1000000, 2300000], note: "HAN → UIH 可查直飞；UIH 到归仁市区还需约 40–50 分钟。", warning: "班次少于河内—岘港，按 9 月 27 日复核。", startWindow: "9 月 27 日优先 11:00–16:00 直飞；晚班会浪费归仁第一晚，但仍可接受。" });
leg("hanoi", "buonmathuot", { mode: "飞机", duration: [1.7, 1.9], price: [1000000, 2300000], note: "HAN → BMV 可查直飞；BMV 到市区约 20 分钟。", warning: "班次有限，先看 9 月 27 日是否有午后直飞。", startWindow: "9 月 27 日优先 11:00–16:00 直飞；抵达后只安排城市咖啡与晚餐。" });
leg("danang", "quynhon", { mode: "火车 / 小车", duration: [5, 6.5], price: [250000, 1200000], note: "火车到 Diêu Trì 后再进归仁市区；包车更直接但价格高。", warning: "这段会占大半天，选早班并把抵达日留空。", window: "建议 07:00–08:30 出发；午后入住归仁。" });
leg("danang", "buonmathuot", { mode: "飞机 / 巴士", duration: [1.1, 8], price: [450000, 1900000], note: "有直飞时优先飞；没有合适时段则需长途巴士。", warning: "航班频次有限，不能只按飞行时长规划。" });
leg("quynhon", "nhatrang", { mode: "火车 / 小车", duration: [3.5, 5], price: [220000, 1000000], note: "沿海向南，火车或小车都比绕去机场自然。", warning: "雨天公路和火车都可能延误。", window: "建议 08:00–09:00 出发；午后抵达芽庄。" });
leg("quynhon", "camranh", { mode: "火车 + 小车 / 包车", duration: [4.5, 6], price: [350000, 1600000], note: "可先到芽庄或金兰附近再接车去 Fusion Resort。", warning: "10 月 5 日当天必须早出发，包车风险更可控。", window: "10 月 5 日建议 07:00–08:00 出发，预留午后入住余量。" });
leg("quynhon", "dalat", { mode: "小车 / 巴士", duration: [5.5, 7], price: [350000, 1500000], note: "跨海岸与高原，山路较长。", warning: "只选白天班次并准备晕车药。" });
leg("quynhon", "buonmathuot", { mode: "小车 / 巴士", duration: [4.5, 6], price: [300000, 1400000], note: "跨中部高原的长距离陆路。", warning: "会消耗大半天，不建议在 8 晚中段再叠加过多节点。" });
leg("buonmathuot", "dalat", { mode: "小车 / 巴士", duration: [5, 6.5], price: [280000, 1400000], note: "高原之间走白天陆路；包车可直接送酒店。", warning: "山路较多，留出休息并准备晕车药。", window: "建议 07:30–08:30 出发；下午抵达大叻后只喝咖啡。" });
leg("buonmathuot", "nhatrang", { mode: "小车 / 巴士", duration: [4, 5.5], price: [260000, 1300000], note: "从高原下到海岸，白天巴士或包车都可。", warning: "雨季山路可能延误。", window: "建议 08:00 前后出发；午后抵达芽庄。" });
leg("buonmathuot", "camranh", { mode: "小车 / 巴士", duration: [4.5, 6], price: [350000, 1500000], note: "从邦美蜀直接下到金兰湾，包车最省换乘。", warning: "10 月 5 日当天早出发，避免晚于入住时间。", window: "10 月 5 日建议 07:30 前后出发；午后到 Fusion Resort。" });
leg("hcmc", "quynhon", { mode: "飞机 / 火车", duration: [1.2, 12], price: [600000, 2000000], note: "飞 UIH 最省时；夜车只适合愿意牺牲睡眠时。", warning: "另计 UIH 到市区接驳。" });
leg("hcmc", "buonmathuot", { mode: "飞机 / 巴士", duration: [1, 7], price: [350000, 1600000], note: "飞行最快，巴士从市区出发更省预算。", warning: "巴士会消耗大半天。" });

const PHRASES = {
  高频词: [
    ["Có", "有 / 是", "果"],
    ["Không", "不 / 没有", "空"],
    ["Được", "可以 / 好", "德"],
    ["Đúng", "对", "拥"],
    ["Sai", "错", "赛"],
    ["Đây", "这里", "呆"],
    ["Kia", "那里", "基啊"],
    ["Đâu", "哪里", "兜"],
    ["Này", "这个", "奈"],
    ["Bao nhiêu", "多少", "包 纽"],
    ["Một", "一", "木"],
    ["Hai", "二", "嗨"],
    ["Hôm nay", "今天", "轰 奈"],
    ["Ngày mai", "明天", "艾 买"],
    ["Bây giờ", "现在", "杯 约"],
    ["Sáng", "上午", "桑"],
    ["Trưa", "中午", "朱啊"],
    ["Chiều", "下午", "桥"],
    ["Tối", "晚上", "多伊"],
    ["Nóng", "热", "农"],
    ["Lạnh", "冷", "冷"],
    ["Nước", "水", "讷"],
    ["Cơm", "米饭", "根"],
    ["Phở", "河粉", "佛"],
    ["Cà phê", "咖啡", "嘎 费"],
    ["Bia", "啤酒", "比啊"],
    ["Nhà vệ sinh", "洗手间", "雅 卫 生"],
    ["Sân bay", "机场", "森 拜"],
    ["Khách sạn", "酒店", "客 散"],
    ["Ga tàu", "火车站", "嘎 道"],
    ["Vé", "票", "耶"],
    ["Tiền", "钱", "甜"],
    ["Thẻ", "卡", "特"],
    ["Tiền mặt", "现金", "甜 末"],
    ["Trái", "左", "摘"],
    ["Phải", "右", "法伊"],
    ["Thẳng", "直走", "探"],
    ["Gần", "近", "根"],
    ["Xa", "远", "撒"],
    ["Chậm", "慢", "枕"],
    ["Nhanh", "快", "娘"],
    ["Mở", "开门 / 营业", "么"],
    ["Đóng", "关门 / 打烊", "冬"]
  ],
  基础: [
    ["Xin chào", "你好", "新 招"],
    ["Cảm ơn", "谢谢", "嘎门"],
    ["Xin lỗi", "对不起 / 不好意思", "新 洛伊"],
    ["Tạm biệt", "再见", "答姆 别"],
    ["Vâng / Dạ", "是的（礼貌）", "旺 / 亚"],
    ["Không", "不是 / 不要", "空"],
    ["Tôi không hiểu", "我听不懂", "多伊 空 友"],
    ["Bạn có nói tiếng Anh không?", "你会说英语吗？", "伴 果 诺 颠 安 空"],
    ["Nói chậm một chút", "请说慢一点", "诺 枕 木 朱"],
    ["Bạn viết ra giúp tôi", "请帮我写下来", "伴 越 扎 族 多伊"],
    ["Tôi biết một chút", "我会一点", "多伊 别 木 朱"],
    ["Không sao", "没关系", "空 勺"]
  ],
  出行: [
    ["Cho tôi đến địa chỉ này", "请带我去这个地址", "卓 多伊 登 地啊 只 奈"],
    ["Dừng ở đây, làm ơn", "请停在这里", "用 额 得，蓝 恩"],
    ["Đi sân bay mất bao lâu?", "去机场要多久？", "滴 森 拜 麦 包 楼"],
    ["Bao nhiêu tiền?", "多少钱？", "包 纽 甜"],
    ["Bật đồng hồ, làm ơn", "请打表", "北 冬 湖，蓝 恩"],
    ["Tôi bị say xe", "我晕车", "多伊 比 赛 些"],
    ["Ga tàu ở đâu?", "火车站在哪里？", "嘎 道 额 兜"],
    ["Tôi muốn đặt xe", "我想叫车", "多伊 木温 达 些"],
    ["Đi thẳng", "直走", "滴 探"],
    ["Rẽ trái / Rẽ phải", "左转 / 右转", "热 摘 / 热 法伊"],
    ["Gần đây không?", "离这里近吗？", "根 呆 空"],
    ["Cho tôi xuống ở đây", "我在这里下车", "卓 多伊 松 额 呆"],
    ["Chuyến cuối mấy giờ?", "末班车几点？", "卷 贵 美 约"]
  ],
  餐饮: [
    ["Cho tôi xem thực đơn", "请给我看菜单", "卓 多伊 森 特 德恩"],
    ["Cho tôi món này", "我要这个", "卓 多伊 蒙 奈"],
    ["Không cay", "不要辣", "空 该"],
    ["Ít cay", "少辣", "一 该"],
    ["Không rau mùi", "不要香菜", "空 饶 梅"],
    ["Không đá", "不要冰", "空 达"],
    ["Một chai nước, làm ơn", "请给我一瓶水", "木 拆 诺，蓝 恩"],
    ["Tôi bị dị ứng với…", "我对……过敏", "多伊 比 夷 翁 维"],
    ["Tính tiền, làm ơn", "请买单", "丁 甜，蓝 恩"],
    ["Ngon lắm", "很好吃", "农 蓝"],
    ["Có món chay không?", "有素食吗？", "果 蒙 摘 空"],
    ["Không đường", "不要糖", "空 东"],
    ["Ít đường", "少糖", "一 东"],
    ["Một cà phê sữa đá", "一杯冰奶咖啡", "木 嘎 费 苏啊 达"],
    ["Mang đi", "打包带走", "芒 滴"],
    ["Cho tôi đôi đũa", "请给我筷子", "卓 多伊 堆 杜啊"]
  ],
  购物: [
    ["Bao nhiêu tiền?", "多少钱？", "包 纽 甜"],
    ["Đắt quá", "太贵了", "达 瓜"],
    ["Có giảm giá không?", "可以便宜吗？", "果 减 架 空"],
    ["Tôi chỉ xem", "我只是看看", "多伊 只 森"],
    ["Tôi có thể trả bằng thẻ không?", "可以刷卡吗？", "多伊 果 特 茶 棒 特 空"],
    ["Có cỡ lớn hơn không?", "有更大码吗？", "果 格 乐 恩 空"],
    ["Có cỡ nhỏ hơn không?", "有更小码吗？", "果 格 扭 恩 空"],
    ["Tôi thử được không?", "可以试一下吗？", "多伊 特 德 空"],
    ["Tôi trả tiền mặt", "我付现金", "多伊 茶 甜 末"],
    ["Cho tôi túi", "请给我一个袋子", "卓 多伊 杜伊"]
  ],
  酒店: [
    ["Tôi có đặt phòng", "我预订了房间", "多伊 果 达 风"],
    ["Tên tôi là…", "我的名字是……", "颠 多伊 拉"],
    ["Mấy giờ nhận phòng?", "几点可以入住？", "美 约 任 风"],
    ["Mấy giờ trả phòng?", "几点退房？", "美 约 茶 风"],
    ["Tôi có thể gửi hành lý không?", "可以寄存行李吗？", "多伊 果 特 归 杭 李 空"],
    ["Cho tôi thêm khăn tắm", "请多给我浴巾", "卓 多伊 添 堪 探"],
    ["Máy lạnh không hoạt động", "空调坏了", "麦 冷 空 活 冬"],
    ["Mật khẩu Wi-Fi là gì?", "Wi-Fi 密码是什么？", "末 口 歪法 拉 夷"],
    ["Phòng quá ồn", "房间太吵", "风 瓜 翁"],
    ["Không có nước nóng", "没有热水", "空 果 讷 农"],
    ["Cho tôi phòng yên tĩnh", "请给我安静的房间", "卓 多伊 风 烟 丁"],
    ["Bữa sáng ở đâu?", "早餐在哪里？", "布啊 桑 额 兜"],
    ["Gọi taxi giúp tôi", "请帮我叫出租车", "戈 达西 族 多伊"]
  ],
  求助: [
    ["Tôi cần giúp đỡ", "我需要帮助", "多伊 根 族 德"],
    ["Tôi bị lạc", "我迷路了", "多伊 比 腊"],
    ["Tôi bị mất hộ chiếu", "我的护照丢了", "多伊 比 麦 护 照"],
    ["Gọi cảnh sát, làm ơn", "请报警", "戈 景 萨，蓝 恩"],
    ["Gọi xe cấp cứu, làm ơn", "请叫救护车", "戈 些 格 久，蓝 恩"],
    ["Bệnh viện gần nhất ở đâu?", "最近的医院在哪里？", "病 院 根 一 额 兜"],
    ["Tôi không khỏe", "我不舒服", "多伊 空 快"],
    ["Bạn có thể viết ra không?", "你可以写下来吗？", "伴 果 特 越 扎 空"],
    ["Tôi cần bác sĩ", "我需要医生", "多伊 根 巴 西"],
    ["Tôi bị dị ứng", "我过敏了", "多伊 比 夷 翁"],
    ["Nhà thuốc ở đâu?", "药店在哪里？", "雅 图 额 兜"],
    ["Xin gọi cho số này", "请拨打这个号码", "新 戈 卓 苏 奈"]
  ]
};

let route = loadRoute();
let activeTool = null;
let fxCurrency = "CNY";
let activePhraseCategory = Object.keys(PHRASES)[0];
let revealObserver = null;
let activePresetId = matchingPreset(route)?.id || "custom";
let customRoute = activePresetId === "custom" ? cloneRoute(route) : null;
let activeNodeId = route[0]?.id || null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const routeEditor = $("#route-editor");

function presetRoute(preset) {
  return preset.stops.map(([city, nights], index) => ({
    id: index === 0 ? "start" : index === preset.stops.length - 1 ? "end" : `${preset.id}-${city}-${index}`,
    city,
    nights,
    role: index === 0 ? "start" : index === preset.stops.length - 1 ? "end" : "middle",
    locked: index === 0 || index === preset.stops.length - 1
  }));
}

function cloneRoute(source) {
  return source.map(node => ({ ...node }));
}

function sameRoute(first, second) {
  return first.length === second.length && first.every((node, index) => {
    const other = second[index];
    return other && node.city === other.city && node.nights === other.nights && node.role === other.role;
  });
}

function matchingPreset(source) {
  return PRESETS.find(preset => sameRoute(source, presetRoute(preset)));
}

function markCustom() {
  activePresetId = "custom";
  customRoute = cloneRoute(route);
}

function cloneDefaultRoute() {
  return cloneRoute(DEFAULT_ROUTE);
}

function loadRoute() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const legacy = current ? null : LEGACY_STORAGE_KEYS.map(key => localStorage.getItem(key)).find(Boolean);
    const parsed = JSON.parse(current || legacy);
    if (!Array.isArray(parsed) || parsed.length < 2) return cloneDefaultRoute();
    const middle = parsed.filter(node => node.role === "middle" && CITIES[node.city] && !["hanoi", "camranh"].includes(node.city));
    const uniqueMiddle = middle.filter((node, index) => middle.findIndex(item => item.city === node.city) === index);
    const legacySignature = uniqueMiddle.map(node => `${node.city}:${Number(node.nights)}`).join("|");
    if (legacy && legacySignature === "danang:3|nhatrang:3|dalat:2") return cloneDefaultRoute();
    return [
      { id: "start", city: "hanoi", nights: 2, role: "start", locked: true },
      ...uniqueMiddle.map(node => ({ id: String(node.id || createId()), city: node.city, nights: clampNights(node.nights, node.city), role: "middle" })),
      { id: "end", city: "camranh", nights: 2, role: "end", locked: true }
    ];
  } catch {
    return cloneDefaultRoute();
  }
}

function clampNights(value, cityKey) {
  const maximum = CITIES[cityKey]?.maxNights || 5;
  return Math.max(1, Math.min(maximum, Number.parseInt(value, 10) || 1));
}

function createId() {
  return `node-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function saveRoute() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(route));
}

function ensureActiveNode() {
  if (!route.some(node => node.id === activeNodeId)) activeNodeId = route[0]?.id || null;
}

function esc(value) {
  return String(value).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
}

function dateLabel(date) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function compactDateRange(start, end) {
  const startMonth = start.getMonth() + 1;
  const endMonth = end.getMonth() + 1;
  const startDay = start.getDate();
  const endDay = end.getDate();
  return startMonth === endMonth
    ? `${startMonth}.${startDay}–${endDay}`
    : `${startMonth}.${startDay}–${endMonth}.${endDay}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatCny(vnd) {
  return `¥${Math.round(vnd / CNY_TO_VND).toLocaleString("zh-CN")}`;
}

function formatVnd(vnd) {
  if (vnd >= 1000000) return `${(vnd / 1000000).toFixed(vnd % 1000000 ? 1 : 0)}m`;
  return `${Math.round(vnd / 1000)}k`;
}

function getLeg(a, b) {
  if (a === b) return { mode: "市内移动", duration: [0.5, 1], price: [50000, 200000], note: "同城调整住宿或前往机场。", warning: "" };
  return TRANSPORT[[a, b].sort().join("|")] || {
    mode: "需中转", duration: [5, 10], price: [1000000, 3000000],
    note: "通常需要飞行中转或组合陆路，具体班次待查。", warning: "这段没有可靠的通用直达方案。"
  };
}

function nodeDates() {
  let cursor = new Date(MIDDLE_START_DATE);
  return route.map(node => {
    if (node.role === "start") return { start: new Date(ARRIVAL_DATE), end: new Date(MIDDLE_START_DATE) };
    if (node.role === "end") return { start: new Date(HOTEL_CHECKIN_DATE), end: new Date(HOTEL_CHECKOUT_DATE) };
    const start = new Date(cursor);
    cursor = addDays(cursor, node.nights);
    return { start, end: new Date(cursor) };
  });
}

function transitionUpdate(callback) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduceMotion) {
    callback();
    return;
  }
  document.startViewTransition(callback);
}

const ARRIVAL_PLANS = {
  hanoi: "入住后只在还剑湖或老城附近吃饭，不再跨区",
  danang: "入住后去美溪海滩散步，晚餐就近解决",
  nhatrang: "入住后看海、吃饭；不要在抵达日安排泥浴或出海",
  dalat: "入住、喝咖啡、逛市场；适应山路后早点休息",
  hue: "入住后沿香河散步，晚餐吃顺化小吃",
  hcmc: "入住后在酒店附近吃饭，避开跨区赶景点",
  phuquoc: "留在酒店、泳池或海滩，看天气决定日落安排",
  quynhon: "入住后沿海滨步道散步、吃海鲜，不再赶远郊",
  buonmathuot: "入住后找一家本地咖啡店、吃晚饭，长途后的景点留到次日",
  camranh: "15:00 办理入住；预约 SPA，之后只留在度假村"
};

function genericTransferWindow(data) {
  if (/飞机/.test(data.mode)) return "07:30–09:00 退房去机场；优先中午前后的直飞，整段按半天计算。";
  if (data.duration[1] <= 4.5) return "08:00–09:00 退房出发；中午至 14:00 前后抵达下一站。";
  return "这段至少消耗半天；优先早班，若只能中转或夜行，不在抵达日安排景点。";
}

function transferWindow(data, previous) {
  if (previous?.role === "start") {
    return data.startWindow || "9 月 27 日中午、下午或晚上起飞均可；按直飞班次选择，退房后可寄存行李，国内航班提前约 2 小时到 HAN T1。";
  }
  return data.window || genericTransferWindow(data);
}

function durationGuide(city, nights) {
  if (city.durationGuide?.[nights]) return city.durationGuide[nights];
  if (nights > city.recommendedNights) return `${nights - 1} 个完整日：核心玩法后加入酒店、咖啡、SPA 或自由觅食，不继续堆景点。`;
  return `${Math.max(0, nights - 1)} 个完整日：优先保留核心体验，抵达和离开日不安排远点。`;
}

function plansForNode(node, index, dates) {
  const city = CITIES[node.city];
  const plans = [];
  const addPlan = (date, tag, am, pm, restful = false, theme = "") => plans.push({ date: dateLabel(date), tag, am, pm, restful, theme });

  if (node.role === "start") {
    addPlan(dates[index].start, "抵达日", "11:45 前抵达上海浦东 T1；托运、安检后吃午饭", "14:45 MU6013 起飞；17:45 抵达 HAN T2，约 19:30 入住后在老城附近吃饭", false, "轻量");
  } else {
    const previous = route[index - 1];
    const transfer = getLeg(previous.city, node.city);
    const firstTransfer = previous.role === "start";
    addPlan(
      dates[index].start,
      "转场日",
      firstTransfer ? "退房后寄存行李；不安排远郊，按起飞时间在老城、咖啡馆或酒店附近活动。" : transferWindow(transfer, previous),
      `${firstTransfer ? `${transferWindow(transfer, previous)} ` : ""}${ARRIVAL_PLANS[node.city]}。交通按 ${transfer.mode}，移动约 ${transfer.duration[0]}–${transfer.duration[1]} 小时。`,
      false,
      "移动"
    );
  }

  for (let offset = 1; offset < node.nights; offset += 1) {
    const restful = offset >= city.recommendedNights;
    const cityPlans = city.days;
    const plan = restful ? city.restDay : cityPlans[offset - 1] || city.restDay;
    addPlan(addDays(dates[index].start, offset), restful ? "休息日" : "完整日", plan.am, plan.pm, restful, plan.theme || (restful ? "放松" : "探索"));
  }

  if (node.role === "end") {
    addPlan(
      HOTEL_CHECKOUT_DATE,
      "返程日",
      "11:30–11:45 办完退房，12:00 前后从 Fusion Resort 出发；14:05 VJ772 从 CXR T1 起飞",
      "15:55 抵达 HAN T1；取行李后乘免费接驳到 T2，重新值机、出境和安检；18:45 MU6014 起飞，22:50 抵达浦东 T1",
      true,
      "返程"
    );
  }

  return plans;
}

function render() {
  ensureActiveNode();
  renderRoute();
  renderHeroRail();
  renderPresets();
  renderAnalysis();
  renderTransport();
  renderCityOptions();
  if (activeTool === "weather") void loadWeather();
  saveRoute();
  setupReveals();
}

function renderHeroRail() {
  const rail = $("#route-rail");
  const dates = nodeDates();
  rail.style.setProperty("--stop-count", route.length);
  rail.setAttribute("role", "list");
  rail.innerHTML = route.map((node, index) => {
    const city = CITIES[node.city];
    const railName = city.shortName || city.name;
    const period = compactDateRange(dates[index].start, dates[index].end);
    const active = node.id === activeNodeId;
    return `<span class="rail-stop ${node.role}${node.locked ? " is-locked" : ""}${active ? " is-active" : ""}" role="listitem"><button type="button" data-jump-node="${esc(node.id)}" aria-label="查看${city.name} ${period} 规划"${active ? ' aria-current="step"' : ""}><i aria-hidden="true"></i><b>${railName}<em>${city.airport}</em></b><small>${period}</small></button></span>`;
  }).join("");
}

$(".planner-hero").addEventListener("click", event => {
  const button = event.target.closest("button[data-jump-node]");
  if (!button) return;
  if (!route.some(node => node.id === button.dataset.jumpNode)) return;
  transitionUpdate(() => {
    activeNodeId = button.dataset.jumpNode;
    renderRoute();
    renderHeroRail();
  });
});

function renderPresets() {
  const options = [...PRESETS, { id: "custom", name: "自定义" }];
  $("#preset-options").innerHTML = options.map(option => {
    const active = option.id === activePresetId;
    return `<button type="button" role="tab" data-preset="${option.id}" class="${active ? "active" : ""}" aria-selected="${active}">${option.name}</button>`;
  }).join("");

  const preset = PRESETS.find(item => item.id === activePresetId);
  $("#preset-caption").textContent = preset ? "只替换 8 晚中段" : "首尾已确认，不会被替换";
  $("#preset-note").textContent = preset
    ? preset.note
    : "拖动中段节点调整顺序；9 月 25–27 日河内与 10 月 5–7 日芽庄 · 金兰湾不会改变。";
}

function setupReveals() {
  const items = $$(".transport-row");
  document.documentElement.classList.add("motion-ready");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
  items.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 180)}ms`);
    revealObserver.observe(item);
  });
}

function renderRoute() {
  const openNodeIds = new Set($$(".route-node details[open]", routeEditor).map(details => details.closest(".route-node")?.dataset.id));
  const dates = nodeDates();
  const usedMiddle = new Set(route.filter(node => node.role === "middle").map(node => node.city));

  routeEditor.innerHTML = route.map((node, index) => {
    const city = CITIES[node.city];
    const fixed = node.role !== "middle";
    const periodLabel = node.role === "start"
      ? "09.25 17:45 抵达 — 09.27 离开时间待定"
      : node.role === "end"
        ? "10.05 15:00 入住 — 10.07 12:00 退房"
        : `${dateLabel(dates[index].start)} 入住 — ${dateLabel(dates[index].end)} 离开`;
    const options = Object.entries(CITIES)
      .filter(([key]) => !["hanoi", "camranh"].includes(key) && (!usedMiddle.has(key) || key === node.city))
      .map(([key, item]) => `<option value="${key}"${key === node.city ? " selected" : ""}>${esc(item.name)} · ${item.airport}</option>`)
      .join("");
    const budgetMin = city.budget[0] * node.nights;
    const budgetMax = city.budget[1] * node.nights;
    const roleLabel = node.role === "start" ? "已确认 · 起点" : node.role === "end" ? "已确认 · 度假村" : "待规划 · 中段";
    const dayPlanHtml = plansForNode(node, index, dates).map(plan => {
      const copyText = `${plan.date} ${city.name}｜${plan.tag}\n上午：${plan.am}\n下午/晚上：${plan.pm}`;
      return `<li class="copyable-plan ${plan.restful ? "restful" : ""}" title="点击空白处复制整天" data-copy-text="${esc(copyText)}">
        <div class="day-marker"><span>${plan.date}</span><strong>${plan.tag}${plan.theme ? ` · ${esc(plan.theme)}` : ""}</strong></div>
        <div class="halfday-copy"><p role="button" tabindex="0" title="点击复制上午安排" data-copy-text="${esc(`${plan.date} ${city.name}｜上午\n${plan.am}`)}"><b>上午</b>${esc(plan.am)}</p><p role="button" tabindex="0" title="点击复制下午与晚上安排" data-copy-text="${esc(`${plan.date} ${city.name}｜下午 / 晚上\n${plan.pm}`)}"><b>下午 / 晚上</b>${esc(plan.pm)}</p></div>
      </li>`;
    }).join("");

    const active = node.id === activeNodeId;
    const compactPeriod = compactDateRange(dates[index].start, dates[index].end);
    return `<li class="route-node ${active ? "is-active" : "is-compact"}${fixed ? " is-locked" : " sortable"}" style="view-transition-name: route-${esc(node.id)}" data-id="${esc(node.id)}" data-select-node tabindex="${active ? "-1" : "0"}" aria-label="${active ? "当前节点" : "展开"}${city.name}，${compactPeriod}">
      ${fixed ? "" : `<div class="node-actions" aria-label="${city.name}节点操作">
        <span class="drag-handle" data-drag-handle draggable="true" role="button" tabindex="0" aria-label="拖动${city.name}调整顺序；键盘可用上下方向键" data-tooltip="拖动排序" title="拖动调整顺序；键盘可用上下方向键">⠿</span>
        <button type="button" class="move-button" data-action="up" aria-label="上移${city.name}" data-tooltip="上移" title="上移"${index === 1 ? " disabled" : ""}>↑</button>
        <button type="button" class="move-button" data-action="down" aria-label="下移${city.name}" data-tooltip="下移" title="下移"${index === route.length - 2 ? " disabled" : ""}>↓</button>
        <button type="button" class="delete-node" data-action="delete" aria-label="删除${city.name}" data-tooltip="删除" title="删除城市">×</button>
      </div>`}
      <div class="node-main">
        <span class="node-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="node-city">
          <span class="node-anchor">${roleLabel}</span>
          <strong class="compact-city-name">${city.name}</strong>
          <span class="compact-period">${compactPeriod}</span>
          ${fixed ? `<strong class="fixed-city">${city.name}</strong>` : `<select class="city-select" aria-label="选择第 ${index + 1} 站城市">${options}</select>`}
          <span class="city-meta">${city.local} · ${city.airport} · ${city.region}</span>
        </div>
        <div class="node-info">
          <span class="node-period">${periodLabel}</span>
          <p class="node-summary">${city.summary}</p>
          <div class="node-plays" aria-label="地点与体验">${city.plays.map(play => `<button type="button" title="点击复制地点" data-copy-text="${esc(play)}">${esc(play)}</button>`).join("")}</div>
          <p class="node-caution" role="button" tabindex="0" title="点击复制关键提醒" data-copy-text="${esc(`${city.name}提醒：${city.caution}`)}">${city.caution}</p>
        </div>
        <div class="node-side">
          <span class="compact-night-count"><strong>${node.nights}</strong> 晚${fixed ? " · 已确认" : ""}</span>
          ${fixed ? `<div class="locked-stay"><strong>${node.nights}</strong><span>晚 · 已确认</span></div>` : `<div class="night-stepper">
            <button type="button" data-action="decrease" aria-label="减少${city.name}住宿晚数"${node.nights <= 1 ? " disabled" : ""}>−</button>
            <span class="night-count"><strong>${node.nights}</strong><span>晚</span></span>
            <button type="button" data-action="increase" aria-label="增加${city.name}住宿晚数"${node.nights >= city.maxNights ? " disabled" : ""}>＋</button>
          </div>`}
          <span class="node-budget"><strong>${formatCny(budgetMin)}–${formatCny(budgetMax)}</strong>${node.role === "end" ? "度假期间额外消费 / 人" : "本地停留 / 人"}<small>${fixed ? "住宿日期已锁定" : `建议 ${city.recommendedNights} 晚 · 最多 ${city.maxNights} 晚`}</small></span>
        </div>
      </div>
      <details class="city-detail"${active && openNodeIds.has(node.id) ? " open" : ""}>
        <summary><span>规划 <small>${node.nights} 晚</small></span><i aria-hidden="true">＋</i></summary>
        <div class="city-detail-body${city.image ? " has-image" : ""}">
          <div class="detail-copy">
            <div class="stay-guide">
              <span><strong>${node.nights} 晚</strong>${Math.max(0, node.nights - 1)} 个完整日</span>
              <p>${esc(durationGuide(city, node.nights))}</p>
              <div class="theme-list">${city.themes.map(theme => `<span>${esc(theme)}</span>`).join("")}</div>
            </div>
            <dl class="city-facts">
              <div><dt>住</dt><dd role="button" tabindex="0" title="点击复制住宿建议" data-copy-text="${esc(`${city.name}住宿：${city.stay}`)}">${city.stay}</dd></div>
              <div><dt>走</dt><dd role="button" tabindex="0" title="点击复制交通建议" data-copy-text="${esc(`${city.name}市内交通：${city.move}`)}">${city.move}</dd></div>
            </dl>
            <ol class="day-plan">${dayPlanHtml}</ol>
          </div>
          ${city.image ? `<figure class="city-figure"><a href="${city.image.src}" target="_blank" rel="noopener"><img src="${city.image.src}" alt="${city.image.alt}" loading="lazy"></a><figcaption>${city.image.caption} · 点击看原图</figcaption></figure>` : ""}
        </div>
      </details>
    </li>`;
  }).join("");

  $("#route-title").textContent = route.map(node => CITIES[node.city].name).join(" → ");
}

function routeTotals() {
  const middleNights = route.filter(node => node.role === "middle").reduce((sum, node) => sum + node.nights, 0);
  const plannedDays = route.reduce((sum, node) => sum + node.nights, 0) + 1;
  const cityBudget = route.reduce((sum, node) => [sum[0] + CITIES[node.city].budget[0] * node.nights, sum[1] + CITIES[node.city].budget[1] * node.nights], [0, 0]);
  const legs = route.slice(0, -1).map((node, index) => getLeg(node.city, route[index + 1].city));
  const transportBudget = legs.reduce((sum, item) => [sum[0] + item.price[0], sum[1] + item.price[1]], [0, 0]);
  const hours = legs.reduce((sum, item) => {
    const airportTime = /飞机/.test(item.mode) ? 3 : 0;
    return [sum[0] + item.duration[0] + airportTime, sum[1] + item.duration[1] + airportTime];
  }, [0, 0]);
  return { middleNights, plannedDays, cityBudget, transportBudget, hours };
}

function renderAnalysis() {
  const totals = routeTotals();
  const balance = MIDDLE_NIGHTS - totals.middleNights;
  const balanceLabel = balance === 0 ? "日期吻合" : balance > 0 ? `还剩 ${balance} 晚` : `超出 ${Math.abs(balance)} 晚`;
  const fill = Math.min(100, totals.middleNights / MIDDLE_NIGHTS * 100);
  const dayBalance = TOTAL_DAYS - totals.plannedDays;
  const allocation = $("#trip-allocation");

  allocation.querySelector("strong").textContent = `${totals.plannedDays} / ${TOTAL_DAYS} 天`;
  allocation.querySelector("span").textContent = dayBalance === 0 ? "已排满" : dayBalance > 0 ? `还差 ${dayBalance} 天` : `超出 ${Math.abs(dayBalance)} 天`;
  allocation.classList.toggle("is-balanced", dayBalance === 0);
  allocation.classList.toggle("is-under", dayBalance > 0);
  allocation.classList.toggle("is-over", dayBalance < 0);
  allocation.setAttribute("aria-label", `已规划 ${totals.plannedDays} / ${TOTAL_DAYS} 天，${allocation.querySelector("span").textContent}`);

  $("#night-meter-label").textContent = `中段 ${totals.middleNights} / ${MIDDLE_NIGHTS} 晚`;
  $("#night-balance").textContent = balanceLabel;
  $("#night-meter-fill").style.width = `${fill}%`;
  $("#night-meter-fill").classList.toggle("over", balance < 0);
  $("#city-budget").textContent = `${formatCny(totals.cityBudget[0])}–${formatCny(totals.cityBudget[1])}`;
  $("#transport-budget").textContent = `${formatCny(totals.transportBudget[0])}–${formatCny(totals.transportBudget[1])}`;
  $("#total-budget").textContent = `${formatCny(totals.cityBudget[0] + totals.transportBudget[0])}–${formatCny(totals.cityBudget[1] + totals.transportBudget[1])}`;
  $("#transfer-count").textContent = `${route.length - 1} 次 + 返程`;
  $("#transport-hours").textContent = `约 ${Math.round(totals.hours[0] * 10) / 10}–${Math.round(totals.hours[1] * 10) / 10}h`;

  const advice = [];
  if (balance > 0) advice.push(`9 月 27 日至 10 月 5 日还有 ${balance} 晚未分配，可增加现有城市或添加节点。`);
  if (balance < 0) advice.push(`中段超出 ${Math.abs(balance)} 晚，会侵占 10 月 5 日已确认的度假村入住，请先减少晚数。`);

  route.filter(node => node.role === "middle").forEach(node => {
    const city = CITIES[node.city];
    if (node.nights < city.minNights) advice.push(`${city.name}只有 ${node.nights} 晚，建议至少 ${city.minNights} 晚，否则主要时间会耗在转场。`);
    if (node.nights > city.recommendedNights) advice.push(`${city.name}安排 ${node.nights} 晚；超出的时间已作为休息、酒店和自由觅食。`);
  });

  route.filter(node => node.role === "middle").forEach(node => {
    const city = CITIES[node.city];
    if (node.nights >= city.maxNights) advice.push(`${city.name}单次停留已到 ${city.maxNights} 晚上限；如仍想增加时间，建议改为附近新节点。`);
  });

  const middle = route.filter(node => node.role === "middle");
  const nhaTrangIndex = middle.findIndex(node => node.city === "nhatrang");
  const dalatIndex = middle.findIndex(node => node.city === "dalat");
  if (nhaTrangIndex >= 0 && dalatIndex >= 0 && Math.abs(nhaTrangIndex - dalatIndex) !== 1) {
    advice.push("芽庄与大叻建议相邻：两地可直接走 3–4.5 小时山路，拆开会增加折返。");
  }
  if (nhaTrangIndex >= 0 && dalatIndex > nhaTrangIndex) {
    advice.push("当前先到芽庄、再上大叻、最后回金兰湾，会重复一段山路；若航班合适，把大叻放在芽庄前更顺。 ");
  }
  for (let index = 1; index < middle.length; index += 1) {
    if (CITIES[middle[index].city].order > CITIES[middle[index - 1].city].order + 0.8) {
      advice.push(`${CITIES[middle[index - 1].city].name} → ${CITIES[middle[index].city].name} 出现向北折返，建议调整顺序。`);
      break;
    }
  }
  if (middle.length > 3) advice.push("8 晚中段超过 3 个节点会频繁收拾行李，建议删减一站。 ");
  if (middle.some(node => node.city === "phuquoc") && middle.find(node => node.city === "phuquoc")?.nights < 3) advice.push("富国岛受天气影响较大，少于 3 晚不容易留出机动空间。 ");
  if (middle.some(node => node.city === "buonmathuot") && middle.some(node => node.city === "dalat")) advice.push("邦美蜀与大叻都是高原咖啡节点，但风格不同；两地之间约 5–6.5 小时山路，建议各至少 3 晚才值得同时保留。");
  if (middle.some(node => node.city === "quynhon") && !middle.some(node => node.city === "nhatrang")) advice.push("归仁之后仍要在 10 月 5 日到金兰湾；最好把芽庄作为顺路缓冲，或当天很早包车南下。");

  const uncertain = route.slice(0, -1).some((node, index) => {
    const legData = getLeg(node.city, route[index + 1].city);
    return /中转|有限|并非每天|刚恢复|恢复/.test(`${legData.note} ${legData.warning || ""}`);
  });
  if (uncertain) advice.push("路线含班次有限或需要中转的航段，最终锁定顺序前应按 2026 年出发日复核。 ");

  $("#advice-list").innerHTML = [...new Set(advice)].slice(0, 4).map(item => `<li>${esc(item.trim())}</li>`).join("");
}

function renderTransport() {
  const dates = nodeDates();
  const routeRows = route.slice(0, -1).map((node, index) => {
    const next = route[index + 1];
    const data = getLeg(node.city, next.city);
    const time = data.duration[0] === data.duration[1] ? `${data.duration[0]}h` : `${data.duration[0]}–${data.duration[1]}h`;
    const routeName = `${CITIES[node.city].name} → ${CITIES[next.city].name}`;
    const transferDate = next.role === "end" ? dateLabel(HOTEL_CHECKIN_DATE) : dateLabel(dates[index].end);
    const windowText = transferWindow(data, node);
    const copyText = `${transferDate}｜${routeName}\n${data.mode}｜约 ${time}｜₫${formatVnd(data.price[0])}–${formatVnd(data.price[1])}\n${windowText}\n${data.note}`;
    return `<article class="transport-row" role="button" tabindex="0" title="点击复制这段交通" aria-label="复制 ${routeName} 交通信息" data-copy-text="${esc(copyText)}">
      <span class="transport-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="transport-route"><strong>${routeName}</strong><span>${transferDate} · ${CITIES[node.city].airport} / ${CITIES[next.city].airport}</span></div>
      <div class="transport-mode"><strong>${data.mode}</strong><span>约 ${time} · ₫${formatVnd(data.price[0])}–${formatVnd(data.price[1])}</span></div>
      <p class="transport-note"><b>${windowText}</b>${data.note}${data.warning ? `<em>${data.warning}</em>` : ""}</p>
    </article>`;
  }).join("");
  const returnCopy = "10.07｜金兰湾 → 河内 → 上海\n14:05 VJ772：CXR T1 → 15:55 HAN T1\n18:45 MU6014：HAN T2 → 22:50 PVG T1\n间隔 2小时50分；若非联程且有托运行李，需取行李、乘免费接驳到 T2 并重新值机。";
  const returnRow = `<article class="transport-row fixed-transfer" role="button" tabindex="0" title="点击复制返程衔接" aria-label="复制 10 月 7 日返程衔接" data-copy-text="${esc(returnCopy)}">
    <span class="transport-index">返</span>
    <div class="transport-route"><strong>金兰湾 → 河内 → 上海</strong><span>10.07 · CXR T1 / HAN T1 → T2 / PVG T1</span></div>
    <div class="transport-mode"><strong>VJ772 + MU6014</strong><span>14:05 → 15:55 · 18:45 → 22:50</span></div>
    <p class="transport-note"><b>HAN 仅有 2 小时 50 分衔接。</b>T1 取行李后乘免费接驳到 T2，再办理国际值机、出境和安检。<em>若两张票不是联程，先向航司确认行李能否直挂；否则把延误风险纳入决定。</em></p>
  </article>`;
  $("#transport-list").innerHTML = routeRows + returnRow;
}

function renderCityOptions() {
  const used = new Set(route.filter(node => node.role === "middle").map(node => node.city));
  const options = Object.entries(CITIES).filter(([key]) => !["hanoi", "camranh"].includes(key));
  const remainingNights = Math.max(0, MIDDLE_NIGHTS - routeTotals().middleNights);
  $("#city-options").innerHTML = options.map(([key, city]) => {
    const disabled = used.has(key);
    const addedNights = remainingNights > 0 ? Math.min(city.defaultNights, remainingNights) : city.defaultNights;
    return `<button class="city-option" type="button" data-city="${key}"${disabled ? " disabled" : ""}>
      <span><strong>${city.name}</strong><span>${city.local} · ${city.airport} · ${city.region}</span><p>${esc(city.summary)}</p><small>建议 ${city.recommendedNights} 晚 · 最多 ${city.maxNights} 晚</small></span>
      <b>${disabled ? "已在路线" : `添加 ${addedNights} 晚 ＋`}</b>
    </button>`;
  }).join("");
  $("#add-node").disabled = used.size >= options.length;
}

function updateNode(id, updater) {
  const index = route.findIndex(node => node.id === id);
  if (index < 0) return;
  transitionUpdate(() => {
    updater(index);
    markCustom();
    render();
  });
}

let draggedNodeId = null;
let dragStartOrder = "";
let dragPointerId = null;

function placeDraggedNode(overNode, clientY) {
  const draggedNode = draggedNodeId && routeEditor.querySelector(`[data-id="${CSS.escape(draggedNodeId)}"]`);
  if (!draggedNode || !overNode || overNode === draggedNode) return;
  const overRouteNode = route.find(node => node.id === overNode.dataset.id);
  if (!overRouteNode || overRouteNode.role !== "middle") return;
  const rect = overNode.getBoundingClientRect();
  if (clientY < rect.top + rect.height / 2) routeEditor.insertBefore(draggedNode, overNode);
  else routeEditor.insertBefore(draggedNode, overNode.nextSibling);
}

function autoScrollDuringDrag(clientY) {
  const edge = Math.min(110, window.innerHeight * 0.16);
  if (clientY < edge) window.scrollBy(0, -14);
  if (clientY > window.innerHeight - edge) window.scrollBy(0, 14);
}

function finishDrag() {
  if (!draggedNodeId) return;
  const orderedIds = $$(".route-node", routeEditor).map(node => node.dataset.id);
  const changed = orderedIds.join("|") !== dragStartOrder;
  $$(".route-node.is-dragging", routeEditor).forEach(node => node.classList.remove("is-dragging"));
  $$(".route-node.is-drop-target", routeEditor).forEach(node => node.classList.remove("is-drop-target"));
  document.body.classList.remove("route-dragging");
  draggedNodeId = null;
  dragStartOrder = "";
  dragPointerId = null;
  if (!changed) return;
  route = orderedIds.map(id => route.find(node => node.id === id)).filter(Boolean);
  markCustom();
  transitionUpdate(render);
}

routeEditor.addEventListener("pointerdown", event => {
  const handle = event.target.closest("[data-drag-handle]");
  if (!handle) return;
  if (event.pointerType === "mouse") return;
  const node = handle.closest(".route-node.sortable");
  draggedNodeId = node?.dataset.id || null;
  if (!draggedNodeId) return;
  dragStartOrder = $$(".route-node", routeEditor).map(item => item.dataset.id).join("|");
  dragPointerId = event.pointerId;
  event.preventDefault();
  node.classList.add("is-dragging");
  document.body.classList.add("route-dragging");
  try { handle.setPointerCapture(event.pointerId); } catch { /* Pointer capture is optional. */ }
});

routeEditor.addEventListener("dragstart", event => {
  const handle = event.target.closest("[data-drag-handle]");
  const node = handle?.closest(".route-node.sortable");
  if (!node) {
    event.preventDefault();
    return;
  }
  draggedNodeId = node.dataset.id;
  dragStartOrder = $$(".route-node", routeEditor).map(item => item.dataset.id).join("|");
  document.body.classList.add("route-dragging");
  node.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedNodeId);
});

routeEditor.addEventListener("dragover", event => {
  if (!draggedNodeId) return;
  const overNode = event.target.closest(".route-node");
  if (!overNode || overNode.dataset.id === draggedNodeId || route.find(node => node.id === overNode.dataset.id)?.role !== "middle") return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  $$(".route-node.is-drop-target", routeEditor).forEach(node => node.classList.remove("is-drop-target"));
  overNode.classList.add("is-drop-target");
  placeDraggedNode(overNode, event.clientY);
});

routeEditor.addEventListener("drop", event => {
  if (!draggedNodeId) return;
  event.preventDefault();
  finishDrag();
});

routeEditor.addEventListener("dragend", finishDrag);

document.addEventListener("pointermove", event => {
  if (!draggedNodeId) return;
  if (event.pointerId !== dragPointerId) return;
  event.preventDefault();
  autoScrollDuringDrag(event.clientY);
  const overNode = document.elementFromPoint(event.clientX, event.clientY)?.closest(".route-node");
  $$(".route-node.is-drop-target", routeEditor).forEach(node => node.classList.remove("is-drop-target"));
  if (overNode && overNode.dataset.id !== draggedNodeId && route.find(node => node.id === overNode.dataset.id)?.role === "middle") {
    overNode.classList.add("is-drop-target");
  }
  placeDraggedNode(overNode, event.clientY);
}, { passive: false });

document.addEventListener("pointerup", event => {
  if (!draggedNodeId) return;
  if (event.pointerId !== dragPointerId) return;
  finishDrag();
});

document.addEventListener("pointercancel", event => {
  if (!draggedNodeId) return;
  if (event.pointerId !== dragPointerId) return;
  finishDrag();
});

routeEditor.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    const compactNode = event.target.closest(".route-node.is-compact[data-select-node]");
    if (!compactNode || event.target.closest("[data-drag-handle], select")) return;
    transitionUpdate(() => {
      activeNodeId = compactNode.dataset.id;
      renderRoute();
      renderHeroRail();
    });
    return;
  }
  const nodeElement = button.closest(".route-node");
  const id = nodeElement?.dataset.id;
  const action = button.dataset.action;
  updateNode(id, index => {
    if (action === "decrease") route[index].nights = clampNights(route[index].nights - 1, route[index].city);
    if (action === "increase") route[index].nights = clampNights(route[index].nights + 1, route[index].city);
    if (action === "up" && index > 1) [route[index - 1], route[index]] = [route[index], route[index - 1]];
    if (action === "down" && index < route.length - 2) [route[index + 1], route[index]] = [route[index], route[index + 1]];
    if (action === "delete" && route[index].role === "middle") {
      if (route[index].id === activeNodeId) activeNodeId = route[index - 1]?.id || route[index + 1]?.id;
      route.splice(index, 1);
    }
  });
});

routeEditor.addEventListener("keydown", event => {
  const dragHandle = event.target.closest("[data-drag-handle]");
  if (dragHandle && ["ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
    const id = dragHandle.closest(".route-node")?.dataset.id;
    updateNode(id, index => {
      if (event.key === "ArrowUp" && index > 1) [route[index - 1], route[index]] = [route[index], route[index - 1]];
      if (event.key === "ArrowDown" && index < route.length - 2) [route[index + 1], route[index]] = [route[index], route[index + 1]];
    });
    return;
  }
  if (!['Enter', ' '].includes(event.key) || event.target.closest("button, select, summary, [data-drag-handle]")) return;
  const compactNode = event.target.closest(".route-node.is-compact[data-select-node]");
  if (!compactNode) return;
  event.preventDefault();
  transitionUpdate(() => {
    activeNodeId = compactNode.dataset.id;
    renderRoute();
    renderHeroRail();
  });
});

routeEditor.addEventListener("change", event => {
  const select = event.target.closest(".city-select");
  if (!select) return;
  const id = select.closest(".route-node")?.dataset.id;
  updateNode(id, index => {
    if (CITIES[select.value] && !route.some((node, nodeIndex) => nodeIndex !== index && node.role === "middle" && node.city === select.value)) {
      route[index].city = select.value;
      route[index].nights = CITIES[select.value].defaultNights;
    }
  });
});

$("#add-node").addEventListener("click", () => $("#city-dialog").showModal());
$("#close-city-dialog").addEventListener("click", () => $("#city-dialog").close());
$("#city-options").addEventListener("click", event => {
  const option = event.target.closest("button[data-city]");
  if (!option || option.disabled) return;
  const city = option.dataset.city;
  const id = createId();
  const remainingNights = Math.max(0, MIDDLE_NIGHTS - routeTotals().middleNights);
  const nights = remainingNights > 0 ? Math.min(CITIES[city].defaultNights, remainingNights) : CITIES[city].defaultNights;
  route.splice(route.length - 1, 0, { id, city, nights, role: "middle" });
  activeNodeId = id;
  markCustom();
  $("#city-dialog").close();
  transitionUpdate(render);
});
$("#preset-options").addEventListener("click", event => {
  const button = event.target.closest("button[data-preset]");
  if (!button || button.dataset.preset === activePresetId) return;
  const presetId = button.dataset.preset;

  if (presetId === "custom") {
    if (customRoute) route = cloneRoute(customRoute);
    else customRoute = cloneRoute(route);
    activePresetId = "custom";
  } else {
    if (activePresetId === "custom") customRoute = cloneRoute(route);
    const preset = PRESETS.find(item => item.id === presetId);
    if (!preset) return;
    route = presetRoute(preset);
    activePresetId = preset.id;
  }
  activeNodeId = route[0]?.id || null;
  transitionUpdate(render);
});

function openTool(name) {
  activeTool = name;
  const titles = { weather: "路线天气", exchange: "汇率换算", phrases: "越南常用语", flights: "机票与酒店" };
  $("#drawer-title").textContent = titles[name];
  $$('[data-tool-panel]').forEach(panel => { panel.hidden = panel.dataset.toolPanel !== name; });
  $$("[data-tool]").forEach(button => button.setAttribute("aria-expanded", String(button.dataset.tool === name)));
  document.body.classList.add("drawer-open");
  $("#tool-drawer").setAttribute("aria-hidden", "false");
  if (name === "weather") void loadWeather();
  if (name === "exchange") updateExchange();
  if (name === "phrases") renderPhrases();
}

function closeTool() {
  activeTool = null;
  document.body.classList.remove("drawer-open");
  $("#tool-drawer").setAttribute("aria-hidden", "true");
  $$("[data-tool]").forEach(button => button.setAttribute("aria-expanded", "false"));
}

$$("[data-tool]").forEach(button => button.addEventListener("click", () => {
  if (activeTool === button.dataset.tool && document.body.classList.contains("drawer-open")) closeTool();
  else openTool(button.dataset.tool);
}));
$("#close-drawer").addEventListener("click", closeTool);
$("#drawer-backdrop").addEventListener("click", closeTool);
document.addEventListener("keydown", event => { if (event.key === "Escape" && document.body.classList.contains("drawer-open")) closeTool(); });

function uniqueRouteCities() {
  return [...new Set(route.map(node => node.city))];
}

function renderWeatherPlaceholder(message = "正在读取…") {
  $("#weather-list").innerHTML = uniqueRouteCities().map(key => `<div class="weather-row" data-weather-city="${key}"><span>${CITIES[key].name}</span><strong>${message}</strong></div>`).join("");
}

function weatherDescription(code) {
  if (code === 0) return "晴";
  if ([1, 2, 3].includes(code)) return "多云";
  if ([45, 48].includes(code)) return "有雾";
  if ([51, 53, 55, 56, 57].includes(code)) return "毛毛雨";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "有雨";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "有雪";
  if ([95, 96, 99].includes(code)) return "雷雨";
  return "天气变化";
}

let weatherRequestId = 0;

async function loadWeather() {
  const requestId = ++weatherRequestId;
  const button = $("#weather-refresh");
  button.disabled = true;
  button.classList.add("loading");
  button.setAttribute("aria-busy", "true");
  renderWeatherPlaceholder("正在读取…");
  const cityKeys = uniqueRouteCities();
  await Promise.all(cityKeys.map(async key => {
    const [latitude, longitude] = CITIES[key].coordinates;
    const row = $(`[data-weather-city="${key}"]`);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code&timezone=Asia%2FBangkok`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("weather request failed");
      const data = await response.json();
      if (requestId === weatherRequestId && row) row.querySelector("strong").textContent = `${weatherDescription(data.current.weather_code)} · ${Math.round(data.current.temperature_2m)}°C · 体感 ${Math.round(data.current.apparent_temperature)}°C`;
    } catch {
      if (requestId === weatherRequestId && row) row.querySelector("strong").textContent = "暂时读取失败";
    }
  }));
  if (requestId !== weatherRequestId) return;
  button.disabled = false;
  button.classList.remove("loading");
  button.removeAttribute("aria-busy");
}

$("#weather-refresh").addEventListener("click", loadWeather);

function setFxCurrency(currency) {
  fxCurrency = currency;
  $$("[data-currency]").forEach(button => {
    const active = button.dataset.currency === currency;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $("#exchange-label").textContent = currency === "CNY" ? "人民币" : "越南盾";
  $("#fx-input").step = currency === "CNY" ? "1" : "1000";
  updateExchange();
}

function updateExchange() {
  const value = Math.max(0, Number($("#fx-input").value) || 0);
  $("#fx-result").textContent = fxCurrency === "CNY"
    ? `₫ ${Math.round(value * CNY_TO_VND).toLocaleString("en-US")}`
    : `¥ ${(value / CNY_TO_VND).toLocaleString("zh-CN", { maximumFractionDigits: 2 })}`;
}

$$("[data-currency]").forEach(button => button.addEventListener("click", () => setFxCurrency(button.dataset.currency)));
$("#fx-input").addEventListener("input", updateExchange);
$("#fx-swap").addEventListener("click", () => {
  const input = $("#fx-input");
  const value = Math.max(0, Number(input.value) || 0);
  input.value = fxCurrency === "CNY" ? Math.round(value * CNY_TO_VND) : (value / CNY_TO_VND).toFixed(2);
  setFxCurrency(fxCurrency === "CNY" ? "VND" : "CNY");
});
$$("[data-value]").forEach(button => button.addEventListener("click", () => {
  $("#fx-input").value = button.dataset.value;
  updateExchange();
}));

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

let toastTimer = null;
async function copyText(text, source) {
  const toast = $("#copy-toast");
  try {
    await writeClipboard(text);
    const label = text.split("\n")[0].replace(/｜/g, " · ");
    toast.textContent = `已复制 · ${label.slice(0, 26)}`;
    if (source) {
      source.classList.add("is-copied");
      window.setTimeout(() => source.classList.remove("is-copied"), 700);
    }
  } catch {
    toast.textContent = "复制失败";
  }
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1500);
}

document.addEventListener("click", event => {
  const copyable = event.target.closest("[data-copy-text]");
  if (copyable) copyText(copyable.dataset.copyText, copyable);
});

document.addEventListener("keydown", event => {
  const copyable = event.target.closest('[data-copy-text][role="button"]');
  if (!copyable || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  copyText(copyable.dataset.copyText, copyable);
});

function renderPhrases() {
  $("#phrase-tabs").innerHTML = Object.keys(PHRASES).map(category => `<button type="button" role="tab" data-phrase-category="${category}" class="${category === activePhraseCategory ? "active" : ""}" aria-selected="${category === activePhraseCategory}">${category}</button>`).join("");
  $("#phrase-list").classList.toggle("is-words", activePhraseCategory === "高频词");
  $("#phrase-list").innerHTML = PHRASES[activePhraseCategory].map(([vietnamese, chinese, pronunciation]) => `<button class="phrase-row" type="button" title="点击复制越南语" data-copy-text="${esc(vietnamese)}"><span><strong>${vietnamese}</strong><small>${chinese} · ${pronunciation}</small></span></button>`).join("");
}

$("#phrase-tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-phrase-category]");
  if (!button) return;
  activePhraseCategory = button.dataset.phraseCategory;
  renderPhrases();
});
render();

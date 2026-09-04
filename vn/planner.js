"use strict";

document.documentElement.classList.add("js");

const TOTAL_NIGHTS = 12;
const TOTAL_MIDDLE_WINDOW_NIGHTS = 10;
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
      { theme: "老城与咖啡", am: "11:30 起床，老城早午餐后去还剑湖 → 36 行街 → 河内大教堂；不赶上午场", pm: "14:30 后预约咖啡工作坊；不做工作坊就去文庙或越南美术馆，傍晚回老城吃饭" },
      { theme: "历史与寺庙", am: "11:30 起床、午饭后去升龙皇城与文庙二选一，预留约 2 小时；随后沿法式建筑街区慢走", pm: "16:30 后去西湖 → 镇国寺看日落；晚餐回老城，不再安排远郊" }
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
      { theme: "海边与占婆", am: "11:30 起床，美溪海滩附近吃早午餐；13:30 去占婆雕刻博物馆，馆内按 1.5–2 小时安排", pm: "海州区咖啡与长午餐，傍晚沿韩江散步；龙桥只在喷火开放日顺路停留" },
      { theme: "会安人文", am: "11:00 起床、午饭后去五行山；随后前往 Tra Que 菜园或 Cam Chau 稻田，下午进入会安", pm: "会安古城、河边晚餐和灯笼夜景；约 21:00 返回岘港，或直接住会安" },
      { theme: "半岛与休息", am: "11:00 起床、早午餐后走山茶半岛：灵应寺与观景点，包车约 3 小时；雨雾大就改室内", pm: "安邦海滩或美溪海滩躺半天；按摩、海鲜与酒店休息" }
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
      { theme: "占婆与泥浴", am: "11:30 起床，午饭后去婆那加塔 → 钟屿石岬；两处都在市区北侧，连排约 3 小时", pm: "16:00 前后去 I-Resort 泥浆浴，预留 3–4 小时；回陈富海滩附近吃海鲜" },
      { theme: "海岛全天", am: "跳岛团通常需 07:30–08:30 集合，这天必要早起；不出海就改珍珠岛，按船班或缆车时间安排", pm: "跳岛继续出海；或乘跨海缆车到 VinWonders，完整留到晚间再返程" },
      { theme: "海洋与慢游", am: "11:30 起床，早午餐后去越南国家海洋博物馆约 2 小时，再到陈富海滩；风浪差时替代出海", pm: "长午餐、咖啡与芽庄夜市；沿海散步后回酒店" }
    ],
    restDay: { am: "度假酒店、泳池或海边躺着", pm: "继续待在酒店，或按摩、咖啡、找好吃的；不塞景点" },
  },
  camranh: {
    name: "芽庄 · 金兰湾", shortName: "金兰湾", local: "Cam Ranh", airport: "CXR", region: "已确认度假村",
    minNights: 1, recommendedNights: 2, maxNights: 3, defaultNights: 2, budget: [500000, 1400000], order: 12.05,
    coordinates: [12.0447, 109.1951],
    themes: ["度假村", "SPA", "海滩", "休息"],
    durationGuide: {
      1: "一晚只安排入住、SPA、泳池与海滩；不再往返芽庄市区。",
      2: "默认两晚：入住日下午留白，完整日只安排 SPA、泳池与海滩。",
      3: "三晚可多留一整天给度假村、SPA 与海滩，不增加跨城景点。"
    },
    summary: "Fusion Resort Cam Ranh（金兰湾属于芽庄），住宿可按 1–3 晚调整。",
    plays: ["Fusion Resort Cam Ranh", "All Spa Inclusive", "泳池与海滩", "12:00 退房去 CXR T1"],
    caution: "10 月 5 日 15:00 入住，10 月 7 日 12:00 退房；酒店距 CXR 约 5–6 公里。",
    stay: "Fusion Resort Cam Ranh，Lot D10b, Cam Hai Dong, Cam Lam, Khanh Hoa。",
    move: "提前向酒店预约送机。10 月 7 日建议 11:30–11:45 办完退房，12:00 前后出发去 CXR T1。",
    days: [
      { theme: "纯度假", am: "睡到自然醒，起床后在 Fusion Resort 吃饭，再去海滩与泳池休息", pm: "提前预约 SPA 时段；午睡、日落和度假村晚餐，不往返芽庄市区" }
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
      { theme: "建筑与咖啡", am: "11:30 起床，春香湖边早午餐后去大叻旧火车站；班次合适再坐小火车去灵福寺", pm: "回城选两家风格不同的咖啡店；傍晚逛大叻市场，咖啡工作坊可提前预约" },
      { theme: "瀑布与山湖", am: "想把达坦拉瀑布和南线排完整，这天需 10:00 左右出发；过山车与步道预留 2–3 小时，雨大或路滑就取消", pm: "竹林禅院 → 泉林湖，包车走南线；最晚傍晚回城休息" },
      { theme: "产地咖啡", am: "11:00 起床后再出发；Cầu Đất 茶咖啡产区若有早场预约需提早，否则选 K’Ho Coffee，先确认参观与杯测时段", pm: "回城午睡、喝咖啡与逛大叻市场；不再横跨另一条郊区线路" }
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
      { theme: "皇城与饮食", am: "11:30 起床、午饭后去顺化皇城；不追早场，预留约 2–3 小时", pm: "天姥寺或东巴市场；晚餐吃顺化小吃" },
      { theme: "阮朝陵墓", am: "11:00 起床后先吃饭，启定陵与明命陵选一至两座；包车按下午开放时间安排", pm: "香河沿岸、咖啡；雨天不再增加点位" }
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
      { theme: "建筑与城市", am: "11:30 起床，午饭后去统一宫 → 中央邮局，步行看第一郡法式建筑；最热时转入室内", pm: "胡志明市博物馆或战争遗迹博物馆二选一；傍晚沿阮惠步行街去西贡河边" },
      { theme: "街区与华人文化", am: "11:30 起床，第三郡吃早午餐并看街区建筑；午后叫车前往第五郡", pm: "平西市场 → 堤岸 → 天后宫；华人区晚餐后直接回酒店" },
      { theme: "近郊或休息", am: "古芝与湄公河只选一条整日团，约 07:30 出发，这天需要早起；不想赶路就留在城市", pm: "一日游返程；城市方案改成午睡、按摩、咖啡与慢晚餐" }
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
      { theme: "海滩与日落", am: "11:30 起床，长滩早午餐与海边慢走；中午回酒店避晒，不急着跨岛", pm: "日落后去 Dương Đông 夜市，或留在度假村晚餐" },
      { theme: "南岛海上活动", am: "跳岛团通常需 07:30–08:00 集合，天气允许再早起出发；不跳岛就按缆车时间去 Hòn Thơm", pm: "海上活动继续，返程后只安排吃饭；风浪大就整天留在酒店" },
      { theme: "雨林与渔村", am: "11:00 起床、午饭后包车走北岛；富国国家公园与短步道二选一，不在雨季深入徒步", pm: "Rạch Vẹm 渔村或翁朗海滩二选一，日落前回酒店" }
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
      { theme: "占婆与城市", am: "11:30 起床、午饭后去 Tháp Đôi 双塔，随后逛市场或 Bình Định 博物馆", pm: "归仁海滨步道、海鲜和日落；不再赶远郊" },
      { theme: "半岛与渔村", am: "Eo Gió 与 Kỳ Co 的船班、风浪和潮汐通常要求 07:30 出发，这天必要早起；只选一处，不勉强坐快艇", pm: "Nhơn Lý 渔村午餐后回酒店；天气差就改去 Bánh Ít 占婆塔" },
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
      { theme: "咖啡文化", am: "11:00 起床，午饭后去咖啡世界博物馆，重点看产区、器具与贸易；馆内留约 2 小时", pm: "Trung Nguyên Coffee Village 或本地烘焙店，安排杯测或慢喝，不连续打卡咖啡店" },
      { theme: "族群与自然", am: "11:00 起床、午饭后去 Ako Dhong 村与埃地族长屋，跟随现场拍摄规则", pm: "包车去 Dray Nur 瀑布；雨大路滑就换成城市咖啡与市场" },
      { theme: "高原慢游", am: "Lak 湖与 Yok Đôn 都需较长车程；若要完整走一条线需早起出发，否则睡到 11:00 后只安排近郊咖啡", pm: "返城后只安排按摩、晚餐和休息" }
    ],
    restDay: { am: "晚起、咖啡和市场", pm: "酒店休息或 SPA；不再增加长途自然点" }
  }
};

const DEFAULT_ROUTE = [
  { id: "start", city: "hanoi", nights: 2, role: "start", locked: true },
  { id: "danang", city: "danang", nights: 3, role: "middle" },
  { id: "dalat", city: "dalat", nights: 3, role: "middle" },
  { id: "nhatrang", city: "nhatrang", nights: 2, role: "middle" },
  { id: "end", city: "camranh", nights: 2, role: "end", locked: true }
];

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

const PLACE_ALIASES = {
  "还剑湖": "还剑湖 Hoàn Kiếm",
  "36 行街": "河内老城区 36 行街 Hanoi Old Quarter",
  "河内大教堂": "河内大教堂 St. Joseph’s Cathedral",
  "咖啡工作坊": "Coffee Workshop 咖啡工作坊",
  "越南美术馆": "越南美术馆 Vietnam National Fine Arts Museum",
  "升龙皇城": "升龙皇城 Imperial Citadel of Thăng Long",
  "文庙": "文庙 Temple of Literature",
  "西湖": "河内西湖 Hồ Tây",
  "镇国寺": "镇国寺 Chùa Trấn Quốc",
  "美溪海滩": "美溪海滩 Mỹ Khê Beach",
  "占婆雕刻博物馆": "占婆雕刻博物馆 Museum of Cham Sculpture",
  "海州区": "海州区 Hải Châu",
  "韩江": "岘港韩江 Sông Hàn",
  "龙桥": "岘港龙桥 Cầu Rồng",
  "五行山": "五行山 Ngũ Hành Sơn",
  "Tra Que 菜园": "Tra Que Vegetable Village",
  "Cam Chau 稻田": "Cam Châu Rice Fields",
  "会安古城": "会安古城 Hội An Ancient Town",
  "会安": "会安 Hội An",
  "山茶半岛": "山茶半岛 Sơn Trà Peninsula",
  "灵应寺": "灵应寺 Chùa Linh Ứng",
  "安邦海滩": "安邦海滩 An Bàng Beach",
  "婆那加塔": "婆那加塔 Po Nagar Cham Towers",
  "钟屿石岬": "钟屿石岬 Hòn Chồng",
  "I-Resort 泥浆浴": "I-Resort Nha Trang 泥浆浴",
  "黑珍珠号": "黑珍珠号芽庄跳岛团",
  "VinWonders": "VinWonders Nha Trang 珍珠岛",
  "越南国家海洋博物馆": "越南国家海洋博物馆 National Oceanographic Museum",
  "陈富海滩": "陈富海滩 Trần Phú Beach",
  "芽庄夜市": "芽庄夜市 Nha Trang Night Market",
  "Fusion Resort": "Fusion Resort Cam Ranh",
  "春香湖": "春香湖 Hồ Xuân Hương",
  "大叻旧火车站": "大叻旧火车站 Dalat Railway Station",
  "大叻市场": "大叻市场 Chợ Đà Lạt",
  "达坦拉瀑布": "达坦拉瀑布 Datanla Waterfall",
  "竹林禅院": "竹林禅院 Thiền Viện Trúc Lâm",
  "泉林湖": "泉林湖 Hồ Tuyền Lâm",
  "Cầu Đất": "Cầu Đất Tea Hill",
  "K'Ho Coffee": "K’Ho Coffee",
  "顺化皇城": "顺化皇城 Imperial City of Huế",
  "启定陵": "启定陵 Lăng Khải Định",
  "明命陵": "明命陵 Lăng Minh Mạng",
  "天姥寺": "天姥寺 Chùa Thiên Mụ",
  "东巴市场": "东巴市场 Chợ Đông Ba",
  "香河": "香河 Sông Hương",
  "第一郡": "胡志明市第一郡 District 1",
  "第三郡": "胡志明市第三郡 District 3",
  "中央邮局": "西贡中央邮局 Saigon Central Post Office",
  "统一宫": "统一宫 Independence Palace",
  "胡志明市博物馆": "胡志明市博物馆 Ho Chi Minh City Museum",
  "战争遗迹博物馆": "战争遗迹博物馆 War Remnants Museum",
  "阮惠步行街": "阮惠步行街 Nguyễn Huệ Walking Street",
  "平西市场": "平西市场 Chợ Bình Tây",
  "堤岸": "堤岸 Chợ Lớn",
  "天后宫": "天后宫 Chùa Bà Thiên Hậu",
  "古芝": "古芝地道 Củ Chi Tunnels",
  "湄公河": "湄公河三角洲 Mekong Delta",
  "长滩": "富国岛长滩 Long Beach",
  "南岛跳岛": "富国岛南岛跳岛",
  "跨海缆车": "Hòn Thơm 跨海缆车",
  "富国国家公园": "富国国家公园 Phú Quốc National Park",
  "Dương Đông 夜市": "Dương Đông Night Market",
  "An Thới": "An Thới 港",
  "Rạch Vẹm": "Rạch Vẹm 渔村",
  "翁朗海滩": "翁朗海滩 Ông Lang Beach",
  "Tháp Đôi 双塔": "Tháp Đôi Twin Towers",
  "Bánh Ít 占婆塔": "Tháp Bánh Ít",
  "海滨步道": "Quy Nhơn 海滨步道",
  "Eo Gió": "Eo Gió 海岬",
  "Kỳ Co": "Kỳ Co Beach",
  "Nhơn Lý": "Nhơn Lý 渔村",
  "Bình Định 博物馆": "Bình Định Museum",
  "咖啡世界博物馆": "咖啡世界博物馆 World Coffee Museum",
  "Trung Nguyên Coffee Village": "Trung Nguyên Coffee Village",
  "Ako Dhong 村": "Ako Dhong Village",
  "Dray Nur 瀑布": "Dray Nur Waterfall",
  "Lak 湖": "Lak Lake",
  "Yok Đôn": "Yok Đôn National Park"
};

const PLACE_PATTERN = new RegExp(
  Object.keys(PLACE_ALIASES)
    .sort((first, second) => second.length - first.length)
    .map(value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "g"
);

let route = loadRoute();
let activeTool = null;
let fxCurrency = "CNY";
let activePhraseCategory = Object.keys(PHRASES)[0];
let revealObserver = null;
let activeNodeId = route[0]?.id || null;
const expandedNodeIds = new Set(route.map(node => node.id));

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const routeEditor = $("#route-editor");

function cloneRoute(source) {
  return source.map(node => ({ ...node }));
}

function cloneDefaultRoute() {
  return cloneRoute(DEFAULT_ROUTE);
}

function endNights() {
  return route.find(node => node.role === "end")?.nights || 2;
}

function middleNightsTarget() {
  return TOTAL_MIDDLE_WINDOW_NIGHTS - endNights();
}

function canAdjustNights(node) {
  return node.role === "middle" || node.city === "camranh";
}

function loadRoute() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const legacy = current ? null : LEGACY_STORAGE_KEYS.map(key => localStorage.getItem(key)).find(Boolean);
    const parsed = JSON.parse(current || legacy);
    if (!Array.isArray(parsed)) return cloneDefaultRoute();
    const storedNights = new Map(
      parsed
        .filter(node => node && CITIES[node.city])
        .map(node => [node.city, clampNights(node.nights, node.city)])
    );
    return cloneDefaultRoute().map(node => {
      const nights = storedNights.get(node.city);
      return nights === undefined || node.city === "hanoi"
        ? node
        : { ...node, nights };
    });
  } catch {
    return cloneDefaultRoute();
  }
}

function clampNights(value, cityKey) {
  const maximum = CITIES[cityKey]?.maxNights || 5;
  return Math.max(1, Math.min(maximum, Number.parseInt(value, 10) || 1));
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

function renderPlanText(value) {
  const text = String(value);
  const matches = text.matchAll(new RegExp(PLACE_PATTERN.source, "g"));
  let cursor = 0;
  let html = "";
  for (const match of matches) {
    html += esc(text.slice(cursor, match.index));
    html += `<span class="inline-place" role="button" tabindex="0" aria-label="点击复制地点 ${esc(match[0])}" data-copy-text="${esc(PLACE_ALIASES[match[0]])}">${esc(match[0])}</span>`;
    cursor = match.index + match[0].length;
  }
  return html + esc(text.slice(cursor));
}

function vietnameseRomanization(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300\u0301\u0303\u0309\u0323]/g, "")
    .normalize("NFC");
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
    if (node.role === "end") return { start: addDays(HOTEL_CHECKIN_DATE, 2 - node.nights), end: new Date(HOTEL_CHECKOUT_DATE) };
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

function transferWindow(data, previous, transferDate) {
  if (previous?.role === "start") {
    return data.startWindow || "9 月 27 日中午、下午或晚上起飞均可；按直飞班次选择，退房后可寄存行李，国内航班提前约 2 小时到 HAN T1。";
  }
  if (previous?.city === "nhatrang" && transferDate) {
    return `${dateLabel(transferDate)} 约 13:30 从芽庄市区出发，15:00 前后办理入住。`;
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
      firstTransfer ? "退房后寄存行李；不安排远郊，按起飞时间在老城、咖啡馆或酒店附近活动。" : transferWindow(transfer, previous, dates[index].start),
      `${firstTransfer ? `${transferWindow(transfer, previous, dates[index].start)} ` : ""}${ARRIVAL_PLANS[node.city]}。交通按 ${transfer.mode}，移动约 ${transfer.duration[0]}–${transfer.duration[1]} 小时。`,
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
  renderAnalysis();
  renderTransport();
  if (activeTool === "weather") void loadWeather();
  saveRoute();
  setupReveals();
}

function renderHeroRail() {
  const rail = $("#route-rail");
  const dates = nodeDates();
  const endIndex = route.findIndex(node => node.role === "end");
  const endDates = dates[endIndex];
  $("#middle-window").textContent = `${dateLabel(MIDDLE_START_DATE)}—${dateLabel(endDates.start)}`;
  $("#middle-window-label").textContent = `${middleNightsTarget()} 晚待规划`;
  $("#end-window").textContent = `${dateLabel(endDates.start)}—${dateLabel(endDates.end)}`;
  $("#end-window-label").textContent = `Fusion · ${endNights()} 晚 · 14:05 飞`;
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

function activateNode(id) {
  if (!route.some(node => node.id === id)) return;
  transitionUpdate(() => {
    activeNodeId = id;
    renderRoute();
    renderHeroRail();
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    const activeNode = routeEditor.querySelector(".route-node.is-active");
    if (!activeNode) return;
    const rect = activeNode.getBoundingClientRect();
    if (rect.top >= 12 && rect.top <= window.innerHeight * .5) return;
    activeNode.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  }));
}

$(".planner-hero").addEventListener("click", event => {
  const button = event.target.closest("button[data-jump-node]");
  if (!button) return;
  activateNode(button.dataset.jumpNode);
});

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
  openNodeIds.forEach(id => expandedNodeIds.add(id));
  const dates = nodeDates();

  routeEditor.innerHTML = route.map((node, index) => {
    const city = CITIES[node.city];
    const adjustable = canAdjustNights(node);
    const periodLabel = node.role === "start"
      ? "09.25 17:45 抵达 · 09.27 中午后可飞"
      : node.role === "end"
        ? `${dateLabel(dates[index].start)} 15:00 入住 · 10.07 12:00 退房`
        : `${dateLabel(dates[index].start)} 入住 · ${dateLabel(dates[index].end)} 离开`;
    const budgetMin = city.budget[0] * node.nights;
    const budgetMax = city.budget[1] * node.nights;
    const roleLabel = node.role === "start" ? "已确认" : node.role === "end" ? "已确认 · 金兰湾" : "固定路线";
    const caution = node.city === "camranh" && node.nights !== 2
      ? `${dateLabel(dates[index].start)} 15:00 入住，10 月 7 日 12:00 退房；酒店距 CXR 约 5–6 公里。`
      : city.caution;
    const dayPlanHtml = plansForNode(node, index, dates).map(plan => {
      const firstSlotLabel = ["抵达日", "转场日", "返程日"].includes(plan.tag) ? "当天" : "起床后";
      return `<li class="${plan.restful ? "restful" : ""}">
        <div class="day-marker"><span>${plan.date}</span><strong>${plan.tag}${plan.theme ? ` · ${esc(plan.theme)}` : ""}</strong></div>
        <div class="halfday-copy"><p><b>${firstSlotLabel}</b>${renderPlanText(plan.am)}</p><p><b>下午 / 晚上</b>${renderPlanText(plan.pm)}</p></div>
      </li>`;
    }).join("");

    const active = node.id === activeNodeId;
    const compactPeriod = compactDateRange(dates[index].start, dates[index].end);
    return `<li class="route-node ${active ? "is-active" : "is-compact"}${node.locked ? " is-locked" : ""}" style="view-transition-name: route-${esc(node.id)}" data-id="${esc(node.id)}" data-select-node tabindex="${active ? "-1" : "0"}" aria-label="${active ? "当前节点" : "展开"}${city.name}，${compactPeriod}">
      <div class="node-main">
        <span class="node-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="node-city">
          <span class="node-anchor">${roleLabel}</span>
          <strong class="compact-city-name">${city.name}</strong>
          <span class="compact-period">${compactPeriod}</span>
          <strong class="fixed-city">${city.name}</strong>
          <span class="city-meta">${city.local} · ${city.airport} · ${city.region}</span>
        </div>
        <div class="node-info">
          <div class="node-schedule-row">
            <span class="node-period">${periodLabel}</span>
            ${adjustable ? `<div class="night-stepper">
              <button type="button" data-action="decrease" aria-label="减少${city.name}住宿晚数"${node.nights <= 1 ? " disabled" : ""}>−</button>
              <span class="night-count"><strong>${node.nights}</strong><span>晚</span></span>
              <button type="button" data-action="increase" aria-label="增加${city.name}住宿晚数"${node.nights >= city.maxNights ? " disabled" : ""}>＋</button>
            </div>` : ""}
          </div>
          <p class="node-summary">${city.summary}</p>
          <div class="node-plays" aria-label="地点与体验">${city.plays.map(play => `<button type="button" title="点击复制地点" data-copy-text="${esc(play)}">${esc(play)}</button>`).join("")}</div>
          <p class="node-caution">${esc(caution)}</p>
        </div>
        <div class="node-side">
          <span class="compact-night-count"><strong>${node.nights}</strong> 晚${node.locked ? " · 已确认" : ""}</span>
          <span class="node-budget"><strong>${formatCny(budgetMin)}–${formatCny(budgetMax)}</strong>${node.role === "end" ? "度假期间额外消费 / 人" : "本地停留 / 人"}${node.role === "start" ? "<small>住宿日期已锁定</small>" : node.role === "end" ? "<small>默认 2 晚 · 可调 1–3 晚</small>" : ""}</span>
        </div>
      </div>
      <details class="city-detail"${active && expandedNodeIds.has(node.id) ? " open" : ""}>
        <summary><span>规划</span><i aria-hidden="true">＋</i></summary>
        <div class="city-detail-body${city.image ? " has-image" : ""}">
          <div class="detail-copy">
            <div class="stay-guide">
              <p>${esc(durationGuide(city, node.nights))}</p>
              <div class="theme-list">${city.themes.map(theme => `<span>${esc(theme)}</span>`).join("")}</div>
            </div>
            <dl class="city-facts">
              <div><dt>住</dt><dd>${renderPlanText(city.stay)}</dd></div>
              <div><dt>走</dt><dd>${renderPlanText(city.move)}</dd></div>
            </dl>
            <ol class="day-plan">${dayPlanHtml}</ol>
          </div>
          ${city.image ? `<figure class="city-figure"><a href="${city.image.src}" target="_blank" rel="noopener"><img src="${city.image.src}" alt="${city.image.alt}" loading="lazy"></a><figcaption>${city.image.caption} · 点击看原图</figcaption></figure>` : ""}
        </div>
      </details>
    </li>`;
  }).join("");

  $("#route-title").textContent = "河内 → 岘港 → 大叻 → 芽庄 → 河内（返程经芽庄金兰湾）";
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
  const middleTarget = middleNightsTarget();
  const balance = middleTarget - totals.middleNights;
  const fill = Math.min(100, totals.middleNights / middleTarget * 100);
  const dayBalance = TOTAL_NIGHTS - (totals.plannedDays - 1);
  const allocation = $("#trip-allocation");

  allocation.querySelector("strong").textContent = `${totals.plannedDays} / ${TOTAL_DAYS} 天`;
  allocation.querySelector("span").textContent = dayBalance === 0 ? "" : dayBalance > 0 ? `还差 ${dayBalance} 天` : `超出 ${Math.abs(dayBalance)} 天`;
  allocation.classList.toggle("is-balanced", dayBalance === 0);
  allocation.classList.toggle("is-under", dayBalance > 0);
  allocation.classList.toggle("is-over", dayBalance < 0);
  allocation.setAttribute("aria-label", `已规划 ${totals.plannedDays} / ${TOTAL_DAYS} 天，${allocation.querySelector("span").textContent}`);

  $("#night-meter-label").textContent = `中段 ${totals.middleNights} / ${middleTarget} 晚`;
  const nightBalance = $("#night-balance");
  nightBalance.textContent = dayBalance === 0 ? "" : dayBalance > 0 ? `还差 ${dayBalance} 天` : `超出 ${Math.abs(dayBalance)} 天`;
  nightBalance.classList.toggle("is-warning", dayBalance !== 0);
  $("#night-meter-fill").style.width = `${fill}%`;
  $("#night-meter-fill").classList.toggle("over", balance < 0);
  $("#city-budget").textContent = `${formatCny(totals.cityBudget[0])}–${formatCny(totals.cityBudget[1])}`;
  $("#transport-budget").textContent = `${formatCny(totals.transportBudget[0])}–${formatCny(totals.transportBudget[1])}`;
  $("#total-budget").textContent = `${formatCny(totals.cityBudget[0] + totals.transportBudget[0])}–${formatCny(totals.cityBudget[1] + totals.transportBudget[1])}`;
  $("#transfer-count").textContent = `${route.length - 1} 次 + 返程`;
  $("#transport-hours").textContent = `约 ${Math.round(totals.hours[0] * 10) / 10}–${Math.round(totals.hours[1] * 10) / 10}h`;

  const advice = [];
  if (dayBalance > 0) advice.push(`天数还差 ${dayBalance} 天，请增加岘港、大叻或芽庄的住宿晚数。`);
  if (dayBalance < 0) advice.push(`天数超出 ${Math.abs(dayBalance)} 天，请减少岘港、大叻或芽庄的住宿晚数。`);
  route.filter(node => node.role === "middle").forEach(node => {
    const city = CITIES[node.city];
    if (node.nights < city.minNights) advice.push(`${city.name}少于 ${city.minNights} 晚，天数需要调整。`);
  });
  $("#advice-list").innerHTML = [...new Set(advice)].map(item => `<li>${esc(item.trim())}</li>`).join("");
}

function renderTransport() {
  const dates = nodeDates();
  const routeRows = route.slice(0, -1).map((node, index) => {
    const next = route[index + 1];
    const data = getLeg(node.city, next.city);
    const time = data.duration[0] === data.duration[1] ? `${data.duration[0]}h` : `${data.duration[0]}–${data.duration[1]}h`;
    const routeName = node.city === "nhatrang" && next.city === "camranh"
      ? "芽庄市区 → 金兰湾"
      : `${CITIES[node.city].name} → ${CITIES[next.city].name}`;
    const transferDate = dateLabel(dates[index + 1].start);
    const windowText = transferWindow(data, node, dates[index + 1].start);
    const copyText = `${transferDate}｜${routeName}\n${data.mode}｜约 ${time}｜₫${formatVnd(data.price[0])}–${formatVnd(data.price[1])}\n${windowText}\n${data.note}`;
    return `<article class="transport-row" role="button" tabindex="0" title="点击复制这段交通" aria-label="复制 ${routeName} 交通信息" data-copy-text="${esc(copyText)}">
      <span class="transport-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="transport-route"><strong>${routeName}</strong><span>${transferDate} · ${CITIES[node.city].airport} / ${CITIES[next.city].airport}</span></div>
      <div class="transport-mode"><strong>${data.mode}</strong><span>约 ${time} · ₫${formatVnd(data.price[0])}–${formatVnd(data.price[1])}</span></div>
      <p class="transport-note"><b>${windowText}</b>${data.note}</p>
    </article>`;
  }).join("");
  const returnCopy = "10.07｜金兰湾 → 河内 → 上海\n14:05 VJ772：CXR T1 → 15:55 HAN T1\n18:45 MU6014：HAN T2 → 22:50 PVG T1\nHAN T1 取行李后乘免费接驳前往 T2。";
  const returnRow = `<article class="transport-row fixed-transfer" role="button" tabindex="0" title="点击复制返程衔接" aria-label="复制 10 月 7 日返程衔接" data-copy-text="${esc(returnCopy)}">
    <span class="transport-index">返</span>
    <div class="transport-route"><strong>金兰湾 → 河内 → 上海</strong><span>10.07 · CXR T1 / HAN T1 → T2 / PVG T1</span></div>
    <div class="transport-mode"><strong>VJ772 + MU6014</strong><span>14:05 → 15:55 · 18:45 → 22:50</span></div>
    <p class="transport-note"><b>HAN 衔接 2 小时 50 分。</b>T1 取行李后乘免费接驳到 T2，再办理国际值机、出境和安检。</p>
  </article>`;
  $("#transport-list").innerHTML = routeRows + returnRow;
}

function updateNode(id, updater) {
  const index = route.findIndex(node => node.id === id);
  if (index < 0) return;
  transitionUpdate(() => {
    updater(index);
    render();
  });
}

routeEditor.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    const compactNode = event.target.closest(".route-node.is-compact[data-select-node]");
    if (!compactNode || event.target.closest("[data-drag-handle], select")) return;
    activateNode(compactNode.dataset.id);
    return;
  }
  const nodeElement = button.closest(".route-node");
  const id = nodeElement?.dataset.id;
  const action = button.dataset.action;
  if (!id || !["decrease", "increase"].includes(action)) return;
  updateNode(id, index => {
    if (!canAdjustNights(route[index])) return;
    const delta = action === "increase" ? 1 : -1;
    route[index].nights = clampNights(route[index].nights + delta, route[index].city);
  });
});

routeEditor.addEventListener("toggle", event => {
  const details = event.target;
  if (!(details instanceof HTMLDetailsElement) || !details.classList.contains("city-detail")) return;
  const id = details.closest(".route-node")?.dataset.id;
  if (!id) return;
  if (details.open) expandedNodeIds.add(id);
  else expandedNodeIds.delete(id);
}, true);

routeEditor.addEventListener("keydown", event => {
  if (!['Enter', ' '].includes(event.key) || event.target.closest("button, select, summary, [data-drag-handle]")) return;
  const compactNode = event.target.closest(".route-node.is-compact[data-select-node]");
  if (!compactNode) return;
  event.preventDefault();
  activateNode(compactNode.dataset.id);
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
  $("#phrase-list").innerHTML = PHRASES[activePhraseCategory].map(([vietnamese, chinese, pronunciation]) => `<button class="phrase-row" type="button" title="复制越南语" data-copy-text="${esc(vietnamese)}"><span class="phrase-main"><b>${esc(chinese)}</b><i>·</i><strong lang="vi">${esc(vietnamese)}</strong></span><small><span>罗马音 ${esc(vietnameseRomanization(vietnamese))}</span><em>近音 ${esc(pronunciation)}</em></small></button>`).join("");
}

$("#phrase-tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-phrase-category]");
  if (!button) return;
  activePhraseCategory = button.dataset.phraseCategory;
  renderPhrases();
});
render();

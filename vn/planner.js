"use strict";

document.documentElement.classList.add("js");

const TRIP_NIGHTS = 12;
const CNY_TO_VND = 3880;
const STORAGE_KEY = "emoboi-vn-route-v3";
const LEGACY_STORAGE_KEY = "emoboi-vn-route-v2";
const ARRIVAL_DATE = new Date("2026-09-25T12:00:00+07:00");
const DEPARTURE_DATE = new Date("2026-10-07T12:00:00+07:00");

const CITIES = {
  hanoi: {
    name: "河内", local: "Hà Nội", airport: "HAN", region: "北部",
    minNights: 2, recommendedNights: 2, maxNights: 4, defaultNights: 2, budget: [850000, 1600000], order: 21.03,
    coordinates: [21.0285, 105.8542],
    summary: "老城区、大教堂、咖啡与历史建筑。",
    plays: ["还剑湖与老城区", "河内大教堂", "咖啡工作坊", "寺庙或博物馆选一"],
    caution: "9–10 月通常舒适；HAN 距市中心约 45 公里，单程按 60–90 分钟留量。",
    stay: "还剑湖西北侧或老城区边缘：步行方便，夜间比老城腹地安静。",
    move: "老城以步行为主；跨区用 Grab。返程日约 14:30 从市区前往 HAN T2，18:45 起飞。",
    days: [
      { am: "还剑湖、老城区、河内大教堂；中午在老城吃粉或烤肉米线", pm: "预约咖啡工作坊；若留到大叻再做，就换成文庙或越南美术馆" },
      { am: "西湖、镇国寺或其他寺庙选一，沿湖慢走", pm: "咖啡馆、自由觅食；把未完成的老城点位补上" }
    ],
    returnDays: [
      { am: "西湖、镇国寺或越南民族学博物馆选一", pm: "咖啡馆、按摩和自由觅食；只补真正想去的点位" },
      { am: "晚起、酒店早餐；按天气补老城或博物馆", pm: "整理行李、买伴手礼，不再安排远郊" }
    ],
    restDay: { am: "睡到自然醒、酒店早餐或西湖散步", pm: "咖啡、SPA、自由觅食；不再增加远郊景点" }
  },
  danang: {
    name: "岘港", local: "Đà Nẵng", airport: "DAD", region: "中部",
    minNights: 3, recommendedNights: 3, maxNights: 5, defaultNights: 3, budget: [900000, 1800000], order: 16.0544,
    coordinates: [16.0544, 108.2022],
    summary: "海滩、山茶半岛；以岘港为交通节点去会安。",
    plays: ["美溪海滩", "山茶半岛", "五行山", "会安"],
    caution: "9 月底通常仍温暖；会安 10 月起雨势和风暴风险上升，临行前按天气交换海滩与室内安排。",
    stay: "美溪海滩适合休闲；海州区适合餐饮和夜生活。两区车程约 10–20 分钟。",
    move: "DAD 到市区约 15 分钟；会安约 45–60 分钟；山茶半岛建议包车或摩托。",
    days: [
      { am: "美溪海滩早晨；占婆雕刻博物馆", pm: "海州区吃喝、韩江散步；龙桥只在合适日期顺路看" },
      { am: "五行山，避开正午；随后前往会安", pm: "会安古城、晚餐与灯笼夜景；约 21:00 返回或住会安" },
      { am: "山茶半岛，雨雾或路况不好就取消", pm: "回酒店休息、海边散步，不连排远景点" }
    ],
    restDay: { am: "酒店早餐、泳池或海边躺着", pm: "咖啡、按摩、海鲜；不安排巴拿山式长途打卡" }
  },
  nhatrang: {
    name: "芽庄", local: "Nha Trang", airport: "CXR", region: "中南部",
    minNights: 2, recommendedNights: 3, maxNights: 5, defaultNights: 3, budget: [1000000, 2100000], order: 12.2388,
    coordinates: [12.2388, 109.1967],
    summary: "泥浆浴、海岛活动、珍珠岛与纯度假。",
    plays: ["I-Resort 泥浆浴", "跳岛团 / 黑珍珠号候选", "珍珠岛与跨海缆车", "度假酒店躺平"],
    caution: "9–12 月是雨季；出海必须看风浪。CXR 到市区约 45–60 分钟。",
    stay: "陈富海滩中段最省事；北部安静但餐饮较少；离岛玩法从南部码头出发。",
    move: "市区用 Grab；婆那加塔与 I-Resort 可连排。跳岛团或珍珠岛都要单独占一天，不建议同一天安排。",
    days: [
      { am: "婆那加塔、钟屿石岬，避开正午", pm: "I-Resort 泥浆浴；回市区吃海鲜" },
      { am: "跳岛团与珍珠岛二选一：跳岛可比较飞猪‘黑珍珠号’的航线、船型和取消规则", pm: "跳岛继续出海；或乘跨海缆车去珍珠岛游乐园，晚上不要再排项目" },
      { am: "市区海滩、晚起和长早餐", pm: "夜市、沿海散步；只选一个轻量点位" }
    ],
    restDay: { am: "度假酒店、泳池或海边躺着", pm: "继续待在酒店，或按摩、咖啡、找好吃的；不塞景点" },
    image: { src: "nha-trang-zones.jpg", alt: "芽庄市区、北部与南部离岛分区参考图", caption: "分区参考：北部看占婆塔并泡泥浴；市区最方便；南部码头连接离岛。" }
  },
  dalat: {
    name: "大叻", local: "Đà Lạt", airport: "DLI", region: "中部高原",
    minNights: 2, recommendedNights: 3, maxNights: 4, defaultNights: 3, budget: [850000, 1700000], order: 11.9404,
    coordinates: [11.9404, 108.4583],
    summary: "高原气候、咖啡、建筑与瀑布。",
    plays: ["达坦拉瀑布", "春香湖与旧火车站", "咖啡店", "咖啡工作坊候选"],
    caution: "4–11 月多雨，早晚偏凉；山路与户外项目不要排满。DLI 到市区约 40 分钟。",
    stay: "春香湖西南与大叻市场周边适合步行；泉林湖更安静，但每天需要用车。",
    move: "景点分散。城区步行；北线、南线各用半天至一天，建议包车或摩托。",
    days: [
      { am: "春香湖、旧火车站；班次合适再坐小火车去灵福寺", pm: "挑两家咖啡店慢慢坐；咖啡工作坊可改在大叻预约" },
      { am: "达坦拉瀑布，雨大或路滑就取消", pm: "竹林禅院、泉林湖或回酒店休息，不把南线塞满" },
      { am: "咖啡庄园或浪平山二选一", pm: "回城继续喝咖啡、逛市场，不再跨线赶景点" }
    ],
    restDay: { am: "晚起、咖啡和酒店发呆", pm: "SPA、市场晚餐；留给降雨或体力恢复" }
  },
  hue: {
    name: "顺化", local: "Huế", airport: "HUI", region: "中部",
    minNights: 2, recommendedNights: 2, maxNights: 4, defaultNights: 2, budget: [750000, 1500000], order: 16.4637,
    coordinates: [16.4637, 107.5909],
    summary: "皇城、皇陵、寺庙与中部饮食。",
    plays: ["顺化皇城", "阮朝皇陵", "天姥寺", "顺化小吃"],
    caution: "9 月后降雨增加；10 月需防积水。",
    stay: "香河南岸餐饮多；皇城南门一带更靠近古迹。",
    move: "皇城可步行；皇陵分散，适合包车或摩托串联。顺化到岘港约 2.5–3.5 小时。",
    days: [
      { am: "顺化皇城，早到避开热和人流", pm: "启定陵或天姥寺二选一；晚餐吃顺化小吃" },
      { am: "明命陵、东巴市场按天气二选一", pm: "香河沿岸、咖啡；雨天不再增加点位" }
    ],
    restDay: { am: "酒店早餐、香河慢走", pm: "找一家顺化菜餐厅，雨天不勉强跑远" }
  },
  hcmc: {
    name: "胡志明市", local: "TP. Hồ Chí Minh", airport: "SGN", region: "南部",
    minNights: 3, recommendedNights: 3, maxNights: 5, defaultNights: 3, budget: [1100000, 2200000], order: 10.8231,
    coordinates: [10.8231, 106.6297],
    summary: "城市建筑、市场、华人区与夜生活。",
    plays: ["第一郡建筑", "堤岸", "街头饮食", "一日游"],
    caution: "5–11 月雨季；加入后路线明显南延。",
    stay: "第一郡最方便；第三郡更安静、餐饮密集。",
    move: "核心区可步行加 Grab；堤岸需用车；古芝或湄公河各占一整天。",
    days: [
      { am: "第一郡建筑与咖啡，避开正午暴晒", pm: "市场、步行街或河岸夜景" },
      { am: "第三郡街区", pm: "堤岸与华人区；晚餐后直接回酒店" },
      { am: "古芝或湄公河一日游二选一", pm: "一日游返程，不再安排夜间打卡" }
    ],
    restDay: { am: "晚起、酒店早餐和咖啡", pm: "按摩、商场避雨或自由觅食" }
  },
  phuquoc: {
    name: "富国岛", local: "Phú Quốc", airport: "PQC", region: "南部海岛",
    minNights: 3, recommendedNights: 4, maxNights: 5, defaultNights: 4, budget: [1400000, 3000000], order: 10.226,
    coordinates: [10.2899, 103.984],
    summary: "海滩、日落、跳岛与自然。",
    plays: ["海滩与日落", "跳岛", "国家公园", "夜市"],
    caution: "7–10 月风浪和强降雨风险较高；至少 3 晚。",
    stay: "长滩交通方便；翁朗更安静；南岛适合度假村但离市区远。",
    move: "岛内距离长，包车或摩托更实际；跳岛与南岛景点合并安排。",
    days: [
      { am: "酒店和海滩，不急着出门", pm: "日落、夜市或度假村晚餐" },
      { am: "天气允许再做南岛跳岛或缆车", pm: "返程休息；风浪大就留在酒店" },
      { am: "北岛国家公园或渔村", pm: "回酒店游泳、看日落" }
    ],
    restDay: { am: "度假村、泳池和海滩", pm: "SPA、日落和晚餐；这一天本来就不需要景点" }
  }
};

const PRESETS = [
  {
    id: "classic", name: "海岸高原",
    stops: [["hanoi", 2], ["danang", 3], ["nhatrang", 3], ["dalat", 2], ["hanoi", 2]],
    note: "4 次转场 · 7 个完整游玩日。覆盖最全；大叻只有 1 个完整日，先锁定 09.30 DAD → CXR 与 10.05 DLI → HAN。"
  },
  {
    id: "highland", name: "高原优先",
    stops: [["hanoi", 2], ["danang", 3], ["nhatrang", 2], ["dalat", 3], ["hanoi", 2]],
    note: "4 次转场 · 芽庄压缩为市区与泥浴，大叻获得 2 个完整日；跳岛仅在天气稳定时临时加入。"
  },
  {
    id: "coast", name: "海边慢行",
    stops: [["hanoi", 2], ["danang", 4], ["nhatrang", 4], ["hanoi", 2]],
    note: "3 次转场 · 每个海边节点都有休息时间；10.01 DAD → CXR 直飞是路线成立的关键。"
  },
  {
    id: "central", name: "中部慢游",
    stops: [["hanoi", 2], ["hue", 3], ["danang", 5], ["hanoi", 2]],
    note: "3 次转场 · 顺化、岘港和会安展开最从容；顺化与岘港都留有雨天机动，不需要赶景点。"
  },
  {
    id: "island", name: "南部海岛",
    stops: [["hanoi", 2], ["hcmc", 3], ["phuquoc", 5], ["hanoi", 2]],
    note: "3 次转场 · 度假比重最高；富国岛 5 晚包含完整休息日，但雨季风浪仍可能取消出海。"
  }
];

const DEFAULT_ROUTE = presetRoute(PRESETS[0]);

const TRANSPORT = {};
const leg = (a, b, data) => { TRANSPORT[[a, b].sort().join("|")] = data; };

leg("hanoi", "danang", { mode: "飞机", duration: [1.3, 1.5], price: [700000, 1500000], note: "HAN 与 DAD 之间直飞班次通常较多；另计往返机场时间。", warning: "两地酒店之间按 4–5 小时安排。", window: "优先 09:00–12:00 起飞；约 14:00–16:00 入住。" });
leg("hanoi", "nhatrang", { mode: "飞机", duration: [1.8, 2.0], price: [1000000, 2200000], note: "HAN 与 CXR 之间通常可直飞；金兰机场到芽庄市区还需约 45–60 分钟。", warning: "两地酒店之间通常约 5 小时。", window: "优先上午直飞；抵达后只安排酒店周边散步与晚餐。" });
leg("hanoi", "dalat", { mode: "飞机", duration: [1.6, 2], price: [1200000, 2500000], note: "HAN 与 DLI 有直飞；大叻一侧还需约 40 分钟机场接驳。", warning: "航班频次不如主干线，订票前复核日期。", window: "优先 10:00–15:00 直飞；避免晚班挤压抵达日。" });
leg("hanoi", "hue", { mode: "飞机", duration: [1.2, 1.4], price: [800000, 1700000], note: "HAN 与 HUI 之间优先选直飞，是 12 晚行程最省时的选择。", warning: "另计两端机场接驳。", window: "优先上午直飞；下午入住后只安排酒店周边。" });
leg("hanoi", "hcmc", { mode: "飞机", duration: [2.0, 2.3], price: [1100000, 2400000], note: "HAN 与 SGN 之间航班密集，但这段会跨越越南南北。", warning: "若之后折返中部，会增加一次长距离转场。" });
leg("hanoi", "phuquoc", { mode: "飞机", duration: [2.1, 2.4], price: [1400000, 3000000], note: "HAN 与 PQC 之间优先选直飞；部分时段可能需经胡志明市。", warning: "班次和直飞情况需按出发日确认。" });
leg("danang", "nhatrang", { mode: "飞机", duration: [1.1, 1.3], price: [900000, 2300000], note: "当前航线资料显示约每日 1–2 班直飞；火车约 9–11 小时。", warning: "默认路线的关键航段：先确认当天直飞，再锁定酒店。", window: "优先 09:00–13:00 直飞；约 15:00–17:00 入住下一站。" });
leg("danang", "dalat", { mode: "飞机或中转", duration: [1.1, 6], price: [900000, 2400000], note: "直飞班次可能有限；无合适航班时通常需要经胡志明市或走长途陆路。", warning: "不要在未查日期前假定一定有直飞。" });
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
leg("hue", "phuquoc", { mode: "飞机中转", duration: [4, 7], price: [1500000, 3400000], note: "通常经胡志明市中转；也可先陆路到岘港再飞。", warning: "转场成本较高，12 晚路线不建议同时保留过多节点。" });
leg("hcmc", "phuquoc", { mode: "飞机", duration: [1, 1.2], price: [700000, 1700000], note: "SGN 与 PQC 之间飞行最省时；巴士加轮渡通常约 10–12 小时。", warning: "雨季尾段可能影响海上活动，但通常不影响航空主线。", window: "优先上午直飞；下午只安排酒店周边活动。" });

const PHRASES = {
  基础: [
    ["Xin chào", "你好", "新 招"],
    ["Cảm ơn", "谢谢", "嘎门"],
    ["Xin lỗi", "对不起 / 不好意思", "新 洛伊"],
    ["Tạm biệt", "再见", "答姆 别"],
    ["Vâng / Dạ", "是的（礼貌）", "旺 / 亚"],
    ["Không", "不是 / 不要", "空"],
    ["Tôi không hiểu", "我听不懂", "多伊 空 友"],
    ["Bạn có nói tiếng Anh không?", "你会说英语吗？", "伴 果 诺 颠 安 空"]
  ],
  出行: [
    ["Cho tôi đến địa chỉ này", "请带我去这个地址", "卓 多伊 登 地啊 只 奈"],
    ["Dừng ở đây, làm ơn", "请停在这里", "用 额 得，蓝 恩"],
    ["Đi sân bay mất bao lâu?", "去机场要多久？", "滴 森 拜 麦 包 楼"],
    ["Bao nhiêu tiền?", "多少钱？", "包 纽 甜"],
    ["Bật đồng hồ, làm ơn", "请打表", "北 冬 湖，蓝 恩"],
    ["Tôi bị say xe", "我晕车", "多伊 比 赛 些"],
    ["Ga tàu ở đâu?", "火车站在哪里？", "嘎 道 额 兜"],
    ["Tôi muốn đặt xe", "我想叫车", "多伊 木温 达 些"]
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
    ["Ngon lắm", "很好吃", "农 蓝"]
  ],
  购物: [
    ["Bao nhiêu tiền?", "多少钱？", "包 纽 甜"],
    ["Đắt quá", "太贵了", "达 瓜"],
    ["Có giảm giá không?", "可以便宜吗？", "果 减 架 空"],
    ["Tôi chỉ xem", "我只是看看", "多伊 只 森"],
    ["Tôi có thể trả bằng thẻ không?", "可以刷卡吗？", "多伊 果 特 茶 棒 特 空"],
    ["Có cỡ lớn hơn không?", "有更大码吗？", "果 格 乐 恩 空"]
  ],
  酒店: [
    ["Tôi có đặt phòng", "我预订了房间", "多伊 果 达 风"],
    ["Tên tôi là…", "我的名字是……", "颠 多伊 拉"],
    ["Mấy giờ nhận phòng?", "几点可以入住？", "美 约 任 风"],
    ["Mấy giờ trả phòng?", "几点退房？", "美 约 茶 风"],
    ["Tôi có thể gửi hành lý không?", "可以寄存行李吗？", "多伊 果 特 归 杭 李 空"],
    ["Cho tôi thêm khăn tắm", "请多给我浴巾", "卓 多伊 添 堪 探"],
    ["Máy lạnh không hoạt động", "空调坏了", "麦 冷 空 活 冬"],
    ["Mật khẩu Wi-Fi là gì?", "Wi-Fi 密码是什么？", "末 口 歪法 拉 夷"]
  ],
  求助: [
    ["Tôi cần giúp đỡ", "我需要帮助", "多伊 根 族 德"],
    ["Tôi bị lạc", "我迷路了", "多伊 比 腊"],
    ["Tôi bị mất hộ chiếu", "我的护照丢了", "多伊 比 麦 护 照"],
    ["Gọi cảnh sát, làm ơn", "请报警", "戈 景 萨，蓝 恩"],
    ["Gọi xe cấp cứu, làm ơn", "请叫救护车", "戈 些 格 久，蓝 恩"],
    ["Bệnh viện gần nhất ở đâu?", "最近的医院在哪里？", "病 院 根 一 额 兜"],
    ["Tôi không khỏe", "我不舒服", "多伊 空 快"],
    ["Bạn có thể viết ra không?", "你可以写下来吗？", "伴 果 特 越 扎 空"]
  ]
};

let route = loadRoute();
let activeTool = null;
let fxCurrency = "CNY";
let activePhraseCategory = Object.keys(PHRASES)[0];
let revealObserver = null;
let activePresetId = matchingPreset(route)?.id || "custom";
let customRoute = activePresetId === "custom" ? cloneRoute(route) : null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const routeEditor = $("#route-editor");

function presetRoute(preset) {
  return preset.stops.map(([city, nights], index) => ({
    id: index === 0 ? "start" : index === preset.stops.length - 1 ? "end" : `${preset.id}-${city}-${index}`,
    city,
    nights,
    role: index === 0 ? "start" : index === preset.stops.length - 1 ? "end" : "middle"
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
    const legacy = current ? null : localStorage.getItem(LEGACY_STORAGE_KEY);
    const parsed = JSON.parse(current || legacy);
    if (!Array.isArray(parsed) || parsed.length < 2) return cloneDefaultRoute();
    const middle = parsed.filter(node => node.role === "middle" && CITIES[node.city] && node.city !== "hanoi");
    const uniqueMiddle = middle.filter((node, index) => middle.findIndex(item => item.city === node.city) === index);
    const normalized = [
      { id: "start", city: "hanoi", nights: clampNights(parsed.find(node => node.role === "start")?.nights ?? 2, "hanoi"), role: "start" },
      ...uniqueMiddle.map(node => ({ id: String(node.id || createId()), city: node.city, nights: clampNights(node.nights, node.city), role: "middle" })),
      { id: "end", city: "hanoi", nights: clampNights(parsed.find(node => node.role === "end")?.nights ?? 2, "hanoi"), role: "end" }
    ];
    if (legacy && normalized.reduce((sum, node) => sum + node.nights, 0) === 11 && normalized.at(-1).nights < CITIES.hanoi.maxNights) {
      normalized.at(-1).nights += 1;
    }
    return normalized;
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
  let cursor = new Date(ARRIVAL_DATE);
  return route.map(node => {
    const start = new Date(cursor);
    cursor = addDays(cursor, node.nights);
    return { start, end: new Date(cursor) };
  });
}

function transitionUpdate(callback) {
  callback();
}

const ARRIVAL_PLANS = {
  hanoi: "入住后只在还剑湖或老城附近吃饭，不再跨区",
  danang: "入住后去美溪海滩散步，晚餐就近解决",
  nhatrang: "入住后看海、吃饭；不要在抵达日安排泥浴或出海",
  dalat: "入住、喝咖啡、逛市场；适应山路后早点休息",
  hue: "入住后沿香河散步，晚餐吃顺化小吃",
  hcmc: "入住后在酒店附近吃饭，避开跨区赶景点",
  phuquoc: "留在酒店、泳池或海滩，看天气决定日落安排"
};

function genericTransferWindow(data) {
  if (/飞机/.test(data.mode)) return "07:30–09:00 退房去机场；优先中午前后的直飞，整段按半天计算。";
  if (data.duration[1] <= 4.5) return "08:00–09:00 退房出发；中午至 14:00 前后抵达下一站。";
  return "这段至少消耗半天；优先早班，若只能中转或夜行，不在抵达日安排景点。";
}

function plansForNode(node, index, dates) {
  const city = CITIES[node.city];
  const plans = [];
  const addPlan = (date, tag, am, pm, restful = false) => plans.push({ date: dateLabel(date), tag, am, pm, restful });

  if (node.role === "start") {
    addPlan(dates[index].start, "抵达日", "11:45 前抵达上海浦东 T1；托运、安检后吃午饭", "14:45 MU6013 起飞；17:45 抵达 HAN，约 19:30 入住后在老城附近吃饭");
  } else {
    const previous = route[index - 1];
    const transfer = getLeg(previous.city, node.city);
    addPlan(
      dates[index].start,
      "转场日",
      transfer.window || genericTransferWindow(transfer),
      `${ARRIVAL_PLANS[node.city]}。交通按 ${transfer.mode}，移动约 ${transfer.duration[0]}–${transfer.duration[1]} 小时。`
    );
  }

  for (let offset = 1; offset < node.nights; offset += 1) {
    const restful = offset >= city.recommendedNights;
    const cityPlans = node.role === "end" && city.returnDays ? city.returnDays : city.days;
    const plan = restful ? city.restDay : cityPlans[offset - 1] || city.restDay;
    addPlan(addDays(dates[index].start, offset), restful ? "休息日" : "完整日", plan.am, plan.pm, restful);
  }

  if (node.role === "end") {
    addPlan(
      DEPARTURE_DATE,
      "返程日",
      "睡到自然醒；老城或咖啡馆收尾，12:00 退房后寄存行李",
      "约 14:30 从市区出发，15:30–15:45 抵达 HAN T2；18:45 MU6014 起飞，22:50 抵达浦东 T1",
      true
    );
  }

  return plans;
}

function render() {
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
    const period = compactDateRange(dates[index].start, dates[index].end);
    return `<span class="rail-stop ${node.role}" role="listitem"><button type="button" data-jump-node="${esc(node.id)}" aria-label="查看${city.name} ${period} 日程"><i>${city.airport}</i><b>${city.name}</b><small>${period}</small></button></span>`;
  }).join("");
}

$(".planner-hero").addEventListener("click", event => {
  const button = event.target.closest("button[data-jump-node]");
  if (!button) return;
  const node = routeEditor.querySelector(`[data-id="${CSS.escape(button.dataset.jumpNode)}"]`);
  if (!node) return;
  node.querySelector("details").open = true;
  $$(".route-node.node-focus", routeEditor).forEach(item => item.classList.remove("node-focus"));
  node.classList.add("node-focus");
  window.setTimeout(() => node.classList.remove("node-focus"), 1300);
  node.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
});

function renderPresets() {
  const options = [...PRESETS, { id: "custom", name: "自定义" }];
  $("#preset-options").innerHTML = options.map(option => {
    const active = option.id === activePresetId;
    return `<button type="button" role="tab" data-preset="${option.id}" class="${active ? "active" : ""}" aria-selected="${active}">${option.name}</button>`;
  }).join("");

  const preset = PRESETS.find(item => item.id === activePresetId);
  $("#preset-caption").textContent = preset ? "套用后仍可继续修改" : "正在编辑自己的路线";
  $("#preset-note").textContent = preset
    ? preset.note
    : "拖动中间节点调整顺序；日期、交通和路线分析会同步更新。";
}

function setupReveals() {
  const items = $$(".route-node, .transport-row");
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
    const periodSuffix = node.role === "start" ? " · 17:45 抵达" : node.role === "end" ? " · 10.07 14:30 去机场" : "";
    const options = Object.entries(CITIES)
      .filter(([key]) => key !== "hanoi" && (!usedMiddle.has(key) || key === node.city))
      .map(([key, item]) => `<option value="${key}"${key === node.city ? " selected" : ""}>${esc(item.name)} · ${item.airport}</option>`)
      .join("");
    const budgetMin = city.budget[0] * node.nights;
    const budgetMax = city.budget[1] * node.nights;
    const roleLabel = node.role === "start" ? "固定起点" : node.role === "end" ? "固定终点" : "中间节点";
    const dayPlanHtml = plansForNode(node, index, dates).map(plan => {
      const copyText = `${plan.date} ${city.name}｜${plan.tag}\n上午：${plan.am}\n下午/晚上：${plan.pm}`;
      return `<li class="copyable-plan ${plan.restful ? "restful" : ""}" role="button" tabindex="0" title="点击复制这一天" aria-label="复制 ${plan.date} ${city.name} ${plan.tag}" data-copy-text="${esc(copyText)}">
        <div class="day-marker"><span>${plan.date}</span><strong>${plan.tag}</strong></div>
        <div class="halfday-copy"><p><b>上午</b>${esc(plan.am)}</p><p><b>下午 / 晚上</b>${esc(plan.pm)}</p></div>
      </li>`;
    }).join("");

    return `<li class="route-node${fixed ? "" : " sortable"}" data-id="${esc(node.id)}">
      ${fixed ? "" : `<div class="node-actions" aria-label="${city.name}节点操作">
        <button type="button" class="drag-handle" data-drag-handle draggable="true" aria-label="拖动${city.name}调整顺序" data-tooltip="拖动排序" title="拖动调整顺序">⠿</button>
        <button type="button" class="move-button" data-action="up" aria-label="上移${city.name}" data-tooltip="上移" title="上移"${index === 1 ? " disabled" : ""}>↑</button>
        <button type="button" class="move-button" data-action="down" aria-label="下移${city.name}" data-tooltip="下移" title="下移"${index === route.length - 2 ? " disabled" : ""}>↓</button>
        <button type="button" class="delete-node" data-action="delete" aria-label="删除${city.name}" data-tooltip="删除" title="删除城市">×</button>
      </div>`}
      <div class="node-main">
        <span class="node-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="node-city">
          <span class="node-anchor">${roleLabel}</span>
          ${fixed ? `<strong class="fixed-city">${city.name}</strong>` : `<select class="city-select" aria-label="选择第 ${index + 1} 站城市">${options}</select>`}
          <span class="city-meta">${city.local} · ${city.airport} · ${city.region}</span>
        </div>
        <div class="node-info">
          <span class="node-period">${dateLabel(dates[index].start)} 入住 — ${dateLabel(dates[index].end)} 离开${periodSuffix}</span>
          <p class="node-summary">${city.summary}</p>
          <div class="node-plays">${city.plays.map(play => `<span>${play}</span>`).join("")}</div>
          <p class="node-caution">${city.caution}</p>
        </div>
        <div class="node-side">
          <div class="night-stepper">
            <button type="button" data-action="decrease" aria-label="减少${city.name}住宿晚数"${node.nights <= 1 ? " disabled" : ""}>−</button>
            <span class="night-count"><strong>${node.nights}</strong><span>晚</span></span>
            <button type="button" data-action="increase" aria-label="增加${city.name}住宿晚数"${node.nights >= city.maxNights ? " disabled" : ""}>＋</button>
          </div>
          <span class="node-budget"><strong>${formatCny(budgetMin)}–${formatCny(budgetMax)}</strong>本地停留 / 人<small>建议 ${city.recommendedNights} 晚 · 最多 ${city.maxNights} 晚</small></span>
        </div>
      </div>
      <details class="city-detail"${openNodeIds.has(node.id) ? " open" : ""}>
        <summary><span>半日安排 · ${node.nights} 晚</span><i aria-hidden="true">＋</i></summary>
        <div class="city-detail-body${city.image ? " has-image" : ""}">
          <div class="detail-copy">
            <dl class="city-facts">
              <div><dt>住</dt><dd>${city.stay}</dd></div>
              <div><dt>走</dt><dd>${city.move}</dd></div>
            </dl>
            <ol class="day-plan">${dayPlanHtml}</ol>
          </div>
          ${city.image ? `<figure class="city-figure"><a href="${city.image.src}" target="_blank" rel="noopener"><img src="${city.image.src}" alt="${city.image.alt}" loading="lazy"></a><figcaption>${city.image.caption} · 点击看原图</figcaption></figure>` : ""}
        </div>
      </details>
    </li>`;
  }).join("");

  $("#route-title").innerHTML = route.map((node, index) => {
    const cityName = esc(CITIES[node.city].name);
    const period = compactDateRange(dates[index].start, dates[index].end);
    return `<span class="title-city">${index ? '<i aria-hidden="true">→</i>' : ""}<button type="button" data-jump-node="${esc(node.id)}" aria-label="打开${cityName} ${period} 日程">${cityName}</button></span>`;
  }).join("");
}

function routeTotals() {
  const nights = route.reduce((sum, node) => sum + node.nights, 0);
  const cityBudget = route.reduce((sum, node) => [sum[0] + CITIES[node.city].budget[0] * node.nights, sum[1] + CITIES[node.city].budget[1] * node.nights], [0, 0]);
  const legs = route.slice(0, -1).map((node, index) => getLeg(node.city, route[index + 1].city));
  const transportBudget = legs.reduce((sum, item) => [sum[0] + item.price[0], sum[1] + item.price[1]], [0, 0]);
  const hours = legs.reduce((sum, item) => {
    const airportTime = /飞机/.test(item.mode) ? 3 : 0;
    return [sum[0] + item.duration[0] + airportTime, sum[1] + item.duration[1] + airportTime];
  }, [0, 0]);
  return { nights, cityBudget, transportBudget, hours };
}

function renderAnalysis() {
  const totals = routeTotals();
  const balance = TRIP_NIGHTS - totals.nights;
  const balanceLabel = balance === 0 ? "刚好" : balance > 0 ? `还剩 ${balance} 晚` : `超出 ${Math.abs(balance)} 晚`;
  const fill = Math.min(100, totals.nights / TRIP_NIGHTS * 100);

  $("#night-meter-label").textContent = `已分配 ${totals.nights} 晚`;
  $("#night-balance").textContent = balanceLabel;
  $("#night-meter-fill").style.width = `${fill}%`;
  $("#night-meter-fill").classList.toggle("over", balance < 0);
  $("#city-budget").textContent = `${formatCny(totals.cityBudget[0])}–${formatCny(totals.cityBudget[1])}`;
  $("#transport-budget").textContent = `${formatCny(totals.transportBudget[0])}–${formatCny(totals.transportBudget[1])}`;
  $("#total-budget").textContent = `${formatCny(totals.cityBudget[0] + totals.transportBudget[0])}–${formatCny(totals.cityBudget[1] + totals.transportBudget[1])}`;
  $("#transfer-count").textContent = `${route.length - 1} 次`;
  $("#transport-hours").textContent = `约 ${Math.round(totals.hours[0] * 10) / 10}–${Math.round(totals.hours[1] * 10) / 10}h`;

  const advice = ["10 月 7 日 18:45 从 HAN T2 起飞；当天上午仍可活动，约 14:30 从市区前往机场。"];
  if (balance > 0) advice.push(`还有 ${balance} 晚未分配，可以增加喜欢的城市，或添加一个新节点。`);
  if (balance < 0) advice.push(`当前超出 ${Math.abs(balance)} 晚，实际日期会超过返程窗口，请先减少住宿。`);
  if (balance === 0) advice.push("住宿晚数与 9 月 25 日至 10 月 7 日的 12 晚完全匹配。");

  route.forEach(node => {
    const city = CITIES[node.city];
    const position = node.role === "start" ? "去程段" : node.role === "end" ? "返程段" : "";
    if (node.nights < city.minNights) advice.push(`${city.name}${position}只有 ${node.nights} 晚，建议至少 ${city.minNights} 晚，否则主要时间会耗在转场。`);
    if (node.nights > city.recommendedNights) advice.push(`${city.name}${position}安排 ${node.nights} 晚；超出的时间已作为休息、酒店和自由觅食。`);
  });

  route.forEach(node => {
    const city = CITIES[node.city];
    if (node.nights >= city.maxNights) advice.push(`${city.name}单次停留已到 ${city.maxNights} 晚上限；如仍想增加时间，建议改为附近新节点。`);
  });

  const middle = route.filter(node => node.role === "middle");
  const nhaTrangIndex = middle.findIndex(node => node.city === "nhatrang");
  const dalatIndex = middle.findIndex(node => node.city === "dalat");
  if (nhaTrangIndex >= 0 && dalatIndex >= 0 && Math.abs(nhaTrangIndex - dalatIndex) !== 1) {
    advice.push("芽庄与大叻建议相邻：两地可直接走 3–4.5 小时山路，拆开会增加折返。");
  }
  for (let index = 1; index < middle.length; index += 1) {
    if (CITIES[middle[index].city].order > CITIES[middle[index - 1].city].order + 0.8) {
      advice.push(`${CITIES[middle[index - 1].city].name} → ${CITIES[middle[index].city].name} 出现向北折返，建议调整顺序。`);
      break;
    }
  }
  if (middle.length > 4) advice.push("中间节点超过 4 个，12 晚内会频繁收拾行李，建议删减一站。 ");
  if (middle.some(node => node.city === "phuquoc") && middle.find(node => node.city === "phuquoc")?.nights < 3) advice.push("富国岛受天气影响较大，少于 3 晚不容易留出机动空间。 ");

  const uncertain = route.slice(0, -1).some((node, index) => /中转|有限|并非每天/.test(getLeg(node.city, route[index + 1].city).note));
  if (uncertain) advice.push("路线含班次有限或需要中转的航段，最终锁定顺序前应按 2026 年出发日复核。 ");

  const cityKeys = new Set(route.map(node => node.city));
  if (cityKeys.has("danang") || cityKeys.has("hue")) advice.push("9 月底至 10 月初处在中部沿海天气转换期；会安 10 月起雨势和风暴风险上升，海滩、山路与室内项目要能互换。");
  if (cityKeys.has("nhatrang")) advice.push("芽庄 9–12 月为雨季；跳岛不是必做项，只在出发前 24 小时确认风浪后保留。");
  if (cityKeys.has("dalat")) advice.push("大叻 4–11 月多雨；瀑布和山路不连排，至少保留半天咖啡或酒店机动。");
  $("#advice-list").innerHTML = [...new Set(advice)].slice(0, 7).map(item => `<li>${esc(item.trim())}</li>`).join("");
}

function renderTransport() {
  const dates = nodeDates();
  $("#transport-list").innerHTML = route.slice(0, -1).map((node, index) => {
    const next = route[index + 1];
    const data = getLeg(node.city, next.city);
    const time = data.duration[0] === data.duration[1] ? `${data.duration[0]}h` : `${data.duration[0]}–${data.duration[1]}h`;
    const routeName = `${CITIES[node.city].name} → ${CITIES[next.city].name}`;
    const transferDate = dateLabel(dates[index].end);
    const windowText = data.window || genericTransferWindow(data);
    const copyText = `${transferDate}｜${routeName}\n${data.mode}｜约 ${time}｜₫${formatVnd(data.price[0])}–${formatVnd(data.price[1])}\n${windowText}\n${data.note}`;
    return `<article class="transport-row" role="button" tabindex="0" title="点击复制这段交通" aria-label="复制 ${routeName} 交通信息" data-copy-text="${esc(copyText)}">
      <span class="transport-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="transport-route"><strong>${routeName}</strong><span>${transferDate} · ${CITIES[node.city].airport} / ${CITIES[next.city].airport}</span></div>
      <div class="transport-mode"><strong>${data.mode}</strong><span>约 ${time} · ₫${formatVnd(data.price[0])}–${formatVnd(data.price[1])}</span></div>
      <p class="transport-note"><b>${windowText}</b>${data.note}${data.warning ? `<em>${data.warning}</em>` : ""}</p>
    </article>`;
  }).join("");
}

function renderCityOptions() {
  const used = new Set(route.filter(node => node.role === "middle").map(node => node.city));
  const options = Object.entries(CITIES).filter(([key]) => key !== "hanoi");
  $("#city-options").innerHTML = options.map(([key, city]) => {
    const disabled = used.has(key);
    return `<button class="city-option" type="button" data-city="${key}"${disabled ? " disabled" : ""}>
      <span><strong>${city.name}</strong><span>${city.local} · ${city.airport} · ${city.region}</span><small>建议 ${city.recommendedNights} 晚 · 最多 ${city.maxNights} 晚</small></span>
      <b>${disabled ? "已在路线" : "添加 ＋"}</b>
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
  draggedNodeId = null;
  dragStartOrder = "";
  if (!changed) return;
  route = orderedIds.map(id => route.find(node => node.id === id)).filter(Boolean);
  markCustom();
  render();
}

routeEditor.addEventListener("pointerdown", event => {
  const handle = event.target.closest("[data-drag-handle]");
  if (!handle) return;
  if (event.pointerType === "mouse") return;
  const node = handle.closest(".route-node");
  draggedNodeId = node?.dataset.id || null;
  if (!draggedNodeId) return;
  dragStartOrder = $$(".route-node", routeEditor).map(item => item.dataset.id).join("|");
  event.preventDefault();
  node.classList.add("is-dragging");
  handle.setPointerCapture(event.pointerId);
});

routeEditor.addEventListener("pointermove", event => {
  if (!draggedNodeId || event.pointerType === "mouse") return;
  event.preventDefault();
  autoScrollDuringDrag(event.clientY);
  const overNode = document.elementFromPoint(event.clientX, event.clientY)?.closest(".route-node");
  placeDraggedNode(overNode, event.clientY);
});

routeEditor.addEventListener("pointerup", event => {
  if (!draggedNodeId || event.pointerType === "mouse") return;
  finishDrag();
});

routeEditor.addEventListener("pointercancel", event => {
  if (!draggedNodeId || event.pointerType === "mouse") return;
  finishDrag();
});

routeEditor.addEventListener("dragstart", event => {
  const handle = event.target.closest("[data-drag-handle]");
  const node = handle?.closest(".route-node");
  if (!node) {
    event.preventDefault();
    return;
  }
  draggedNodeId = node.dataset.id;
  dragStartOrder = $$(".route-node", routeEditor).map(item => item.dataset.id).join("|");
  node.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedNodeId);
});

routeEditor.addEventListener("dragover", event => {
  if (!draggedNodeId) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  autoScrollDuringDrag(event.clientY);
  placeDraggedNode(event.target.closest(".route-node"), event.clientY);
});

routeEditor.addEventListener("drop", event => {
  if (!draggedNodeId) return;
  event.preventDefault();
  finishDrag();
});

routeEditor.addEventListener("dragend", finishDrag);

routeEditor.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const nodeElement = button.closest(".route-node");
  const id = nodeElement?.dataset.id;
  const action = button.dataset.action;
  updateNode(id, index => {
    if (action === "decrease") route[index].nights = clampNights(route[index].nights - 1, route[index].city);
    if (action === "increase") route[index].nights = clampNights(route[index].nights + 1, route[index].city);
    if (action === "up" && index > 1) [route[index - 1], route[index]] = [route[index], route[index - 1]];
    if (action === "down" && index < route.length - 2) [route[index + 1], route[index]] = [route[index], route[index + 1]];
    if (action === "delete" && route[index].role === "middle") route.splice(index, 1);
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
  route.splice(route.length - 1, 0, { id: createId(), city, nights: CITIES[city].defaultNights, role: "middle" });
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
  render();
});

function openTool(name) {
  activeTool = name;
  const titles = { weather: "路线天气", exchange: "汇率换算", phrases: "越南常用语", flights: "国际航班" };
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
async function copyText(text) {
  const toast = $("#copy-toast");
  try {
    await writeClipboard(text);
    toast.textContent = "已复制到剪贴板";
  } catch {
    toast.textContent = "复制失败";
  }
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1500);
}

document.addEventListener("click", event => {
  const copyable = event.target.closest("[data-copy-text]");
  if (copyable) copyText(copyable.dataset.copyText);
});

document.addEventListener("keydown", event => {
  const copyable = event.target.closest('[data-copy-text][role="button"]');
  if (!copyable || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  copyText(copyable.dataset.copyText);
});

function renderPhrases() {
  $("#phrase-tabs").innerHTML = Object.keys(PHRASES).map(category => `<button type="button" role="tab" data-phrase-category="${category}" class="${category === activePhraseCategory ? "active" : ""}" aria-selected="${category === activePhraseCategory}">${category}</button>`).join("");
  $("#phrase-list").innerHTML = PHRASES[activePhraseCategory].map(([vietnamese, chinese, pronunciation]) => `<button class="phrase-row" type="button" title="点击复制越南语" data-copy-text="${esc(vietnamese)}"><span><strong>${vietnamese}</strong><small>${chinese} · ${pronunciation}</small></span></button>`).join("");
}

$("#phrase-tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-phrase-category]");
  if (!button) return;
  activePhraseCategory = button.dataset.phraseCategory;
  renderPhrases();
});
render();

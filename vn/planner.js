"use strict";

document.documentElement.classList.add("js");

const TOTAL_NIGHTS = 12;
const TOTAL_DAYS = 13;
const CNY_TO_VND = 3880;
const STORAGE_KEY = "emoboi-vn-route-v6";
const FLIGHT_STORAGE_KEY = "emoboi-vn-flight-choices-v1";
const LEGACY_STORAGE_KEYS = ["emoboi-vn-route-v5", "emoboi-vn-route-v4", "emoboi-vn-route-v3", "emoboi-vn-route-v2"];
const ARRIVAL_DATE = new Date("2026-09-25T17:45:00+07:00");
const MIDDLE_START_DATE = new Date("2026-09-27T12:00:00+07:00");
const HOTEL_CHECKIN_DATE = new Date("2026-10-05T15:00:00+07:00");
const HOTEL_CHECKOUT_DATE = new Date("2026-10-07T12:00:00+07:00");

const CITIES = {
  hanoi: {
    name: "河内", local: "Hà Nội", airport: "HAN", region: "北部",
    minNights: 2, recommendedNights: 2, maxNights: 3, defaultNights: 2, budget: [850000, 1600000], order: 21.03,
    coordinates: [21.0285, 105.8542],
    themes: ["建筑", "老城", "咖啡", "寺庙"],
    durationGuide: {
      2: "1 个完整日：老城、建筑与咖啡足够；离开日按航班保留半天机动。",
      3: "2 个完整日：增加升龙皇城、西湖或一场博物馆，不必跑远郊。",
    },
    summary: "还剑湖老城区连住3晚。老城步行一天，文庙—皇城—西湖一天；周末湖区步行化，接送约在酒店可通车的路口。",
    plays: ["还剑湖", "河内大教堂", "升龙皇城", "文庙", "咖啡工作坊", "西湖与镇国寺", "老城周末步行街 / 夜市"],
    caution: "9–10 月通常舒适；HAN 在城北，去市区的车程容易受晚高峰影响。9 月 26 日周六晚可优先安排老城周末步行街与夜市。",
    stay: "住还剑湖西北侧或老城区边缘：大教堂、咖啡和老城步行可达，夜间比老城腹地安静。",
    move: "老城以步行为主；升龙皇城、文庙、西湖之间用 Grab，单段约 10–25 分钟。机场快线 86 路可作为轻装备备选，带行李或晚高峰优先 Grab。离开日退房后把行李寄存在前台。",
    airportInfo: "内排 HAN → 还剑湖 / 老城区：约 30–35 km，Grab 通常 45–75 分钟；晚高峰按 90 分钟留量。86 路机场快线耗时受站点与路况影响，适合不赶时间时使用。",
    days: [
      { theme: "老城与咖啡", mapStops: [
        { id: "hanoi-hoan-kiem", time: "13:15–15:00" },
        { id: "hanoi-36-streets", time: "13:15–15:00" },
        { id: "hanoi-cathedral", time: "13:15–15:00" },
        { id: "hanoi-weekend-walk", time: "20:30–22:30" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床、午饭；住在还剑湖或老城边缘，先把当天路线控制在步行范围。" },
        { time: "13:15–15:00", text: "还剑湖 → 36 行街 → 河内大教堂，拍照和慢走；不为上午场提前起床。" },
        { time: "15:00–17:00", text: "老城咖啡与街区建筑，坐下来休息；想体验咖啡工作坊，可用已预约的课程替换这段，集合地点按订单。" },
        { time: "17:30–18:30", text: "回酒店休息或沿还剑湖再走一圈。" },
        { time: "19:00–20:00", text: "老城晚饭，控制在一小时。" },
        { time: "20:30–22:30", text: "周六逛老城周末步行街与夜市，累了直接回酒店。" }
      ], food: "午饭可在老城就近吃 Pho 10 或 Bún Bò Nam Bộ；下午用 Cafe Giang 试蛋咖啡，晚饭再选 Bún chả 或 Bánh mì 25。" }
    ],
    alternatives: [
      { name: "升龙皇城", note: "把下午咖啡替换成历史线，留约 1.5–2 小时；先确认开放时段。" },
      { name: "西湖与镇国寺", note: "想从老城换到湖边时安排半天，往返用 Grab，不和老城硬串。" },
      { name: "越南美术馆", note: "09.27｜1.5–2小时。就在文庙附近，雨天替换皇城，不额外叠加。" },
      { name: "越南女性博物馆", note: "09.26｜1.5–2小时。还剑湖南侧，替换咖啡工作坊；适合了解服饰、家庭与女性生活。" },
      { name: "火炉监狱遗址", note: "09.26｜1–1.5小时。还剑湖西南侧的历史展馆，替换一段老城散步；题材较沉重。" },
      { name: "同春市场", note: "想买咖啡、零食或伴手礼时，替换夜市前的一段逛街。" },
      { name: "河内火车街", note: "只在现场允许进入且安全秩序明确时短停，不为拍照等待列车。" }
    ],
    restDay: { blocks: [
      { time: "12:00–13:00", text: "睡到自然醒、午饭或酒店早餐。" },
      { time: "13:30–16:30", text: "咖啡、SPA 或西湖慢走，按体力只选一条线。" },
      { time: "19:00–20:00", text: "晚饭；20:30 后自由觅食或回酒店。" }
    ], food: "午饭和晚饭都在还剑湖 / 老城附近解决；下午可补一杯蛋咖啡，若去同春市场则把小吃和伴手礼集中完成。" }
  },
  danang: {
    name: "岘港", local: "Đà Nẵng", airport: "DAD", region: "中部",
    minNights: 3, recommendedNights: 4, maxNights: 8, defaultNights: 4, budget: [900000, 1800000], order: 16.0544,
    coordinates: [16.0544, 108.2022],
    themes: ["海边", "会安", "占婆文化", "慢生活"],
    durationGuide: {
      2: "只有 1 个完整日：岘港与会安必须二选一，不建议这样排。",
      3: "2 个完整日：城市线 + 巴拿山（必要早起）；会安建议增加到 4 晚再安排。",
      4: "3 个完整日：城市线、巴拿山与会安各占一条主线，节奏仍可控。",
      5: "4 个完整日：加山茶半岛或五行山，不再把两条远线硬塞同一天。",
      6: "5 个完整日：山茶、五行山与会安乡村慢游可以分开，节奏最舒服。",
      7: "6 个完整日：再加一天海钓 / 海上活动，需早起并看海况。",
      8: "7 个完整日：核心景点、海钓与雨天缓冲都能分开安排，适合不赶行程。",
    },
    summary: "暂按美溪 / 安上街区住宿估算。市区、巴拿山、会安、山茶分日安排；9月底进入雨季，山顶大雾或强降雨时改室内，不硬上山出海。",
    plays: ["美溪海滩", "岘港大教堂", "韩市场", "占婆雕刻博物馆", "山茶半岛", "五行山", "巴拿山", "会安古城", "Tra Que 菜园 / 安邦海滩"],
    caution: "9 月底仍温暖，但中部进入降雨窗口；巴拿山园区、缆车末班和天气以官方当天公告为准。",
    stay: "美溪海滩适合休闲，海州区适合餐饮和夜生活；两区通常打车 10–20 分钟。",
    move: "DAD → 美溪约 5–7 km / 15–25 分钟；DAD → 海州（大教堂、韩市场、占婆博物馆）约 3–5 km / 10–15 分钟；会安约 30 km / 45–60 分钟；巴拿山约 35–40 km，正常约 45–75 分钟，接送按 60–90 分钟留量。",
    airportInfo: "岘港 DAD → 美溪海滩住宿区：约 5–7 km，Grab 通常 15–25 分钟；→ 海州区（岘港大教堂 / 韩市场）约 3–5 km，约 10–15 分钟。",
    days: [
      { theme: "海州与美溪", mapStops: [
        { id: "danang-cathedral", time: "13:20–14:00" },
        { id: "danang-market", time: "14:00–15:00" },
        { id: "danang-cham", time: "15:15–16:45" },
        { id: "danang-my-khe", time: "17:15–18:15" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床、午饭，美溪住宿区就近吃；昨晚晚到，今天不早起。" },
        { time: "13:00–13:20", text: "Grab 过河到岘港大教堂，约 4–6 km、15–25 分钟。" },
        { time: "13:20–15:00", text: "岘港大教堂看建筑外观，再步行约 5 分钟到韩市场；市场购物留 45–60 分钟，其余时间喝咖啡。教堂礼拜期间不进入打扰。" },
        { time: "15:00–16:45", text: "沿河向南到占婆雕刻博物馆，步行约 15–20 分钟或短程打车；参观约 1.5 小时，安排在闭馆前。" },
        { time: "16:45–18:15", text: "一次过河回美溪海滩，车程约 15–25 分钟；散步、看海，累了直接回酒店。" },
        { time: "18:30–19:30", text: "美溪 / 安上街区晚饭。" },
        { time: "20:00–21:00", text: "住宿区附近咖啡或按摩，之后回酒店；今晚不再跨河，明天去巴拿山需要早起。" }
      ], food: "午饭试 Mì Quảng（广南面）或 Bún chả cá（鱼饼米粉）；韩市场一带顺路喝椰子咖啡。晚饭选 Bánh tráng cuốn thịt heo（猪肉米纸卷）或海鲜，点海鲜先确认计价单位。" },
      { theme: "巴拿山（必要早起）", mapStops: [
        { id: "danang-ba-na", time: "09:30–16:30" }
      ], blocks: [
        { time: "07:00–08:00", text: "起床、早餐；这天需要早起，因为巴拿山园区与缆车按白天窗口运营。" },
        { time: "08:00–09:30", text: "从美溪 / 海州出发去巴拿山，车程通常约 45–75 分钟；接送与高峰按 60–90 分钟留量，尽量在上午到达。" },
        { time: "09:30–12:00", text: "巴拿山 Ba Na Hills：入园、缆车、金桥与花园；换乘和排队也计入这段，不为拍空景反复上下山。" },
        { time: "12:00–13:00", text: "山上午饭、补水和坐下休息，餐食是否包含按所购票种。" },
        { time: "13:00–16:00", text: "继续游玩法式村与 Fantasy Park 室内项目，按当日开放区选择；15:30开始关注下山排队，不把最后一个项目压在缆车末班。" },
        { time: "16:00–16:30", text: "集合、缆车下山；具体线路末班以 Sun World 当日公告为准。" },
        { time: "16:30–18:00", text: "乘车返回岘港，预留雨天路况余量。" },
        { time: "18:30–19:30", text: "回到住宿区后晚饭。" },
        { time: "20:30 后", text: "直接回酒店休息；不再安排会安或夜间跨城。" }
      ], food: "巴拿山山上餐饮选择有限，早餐先吃饱并带水；回到美溪后再安排一小时晚饭，不为山上餐厅绕路。" },
      { theme: "会安古城", mapStops: [
        { id: "danang-hoi-an", time: "14:00–21:00" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床、午饭，带雨具；提前约好21:00返程车和古城外围上车点。" },
        { time: "13:00–14:00", text: "岘港 → 会安古城，约30 km、45–60分钟；古城内步行，车停外围。" },
        { time: "14:00–16:00", text: "会安古城先看福建会馆，再沿陈富街向西走到古宅和来远桥；收费建筑只选1–2处，古城参观券不是所有船票或表演的通票。" },
        { time: "16:00–17:30", text: "古城咖啡休息约45分钟，再走河岸看黄昏；不额外往返安邦海滩或椰林。" },
        { time: "18:00–19:00", text: "会安河边晚饭，一小时。" },
        { time: "19:30–21:00", text: "灯笼夜景、河边与夜市；把最适合拍照的时段留到天黑后。" },
        { time: "21:00–22:00", text: "乘预约车辆返回岘港酒店，车程约 45–60 分钟；不在会安换酒店。" }
      ], food: "会安晚饭可按口味选 Cơm gà（鸡饭）、Cao lầu（高楼面）或白玫瑰；甜品和滴漏咖啡留到河边慢慢吃。" },
      { theme: "山茶半岛与灵应寺", mapStops: [
        { id: "danang-son-tra", time: "13:30–16:30" },
        { id: "danang-linh-ung", time: "14:30–16:00" },
        { id: "danang-han-river", time: "20:00–21:30" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床、午饭；这天不需要早起，午后从美溪出发去山茶半岛。" },
        { time: "13:30–16:30", text: "山茶半岛与灵应寺：看海、观景和短停，山路弯且天气变化快；用车比骑摩托更稳妥。" },
        { time: "17:00–18:00", text: "回美溪或海州休息，天气不好就提前返程。" },
        { time: "19:00–20:00", text: "晚饭，一小时。" },
        { time: "20:00–21:30", text: "10 月 2 日周五可去龙桥附近散步；如当晚有 21:00 喷火喷水表演，提前 20–30 分钟到，雨大则回酒店。" }
      ], food: "午饭在美溪解决；山茶回程后就近吃海鲜或越南煎饼，不为一顿饭再去海州排队。" },
      { theme: "五行山与安邦海滩", mapStops: [
        { id: "danang-marble", time: "13:30–15:30" },
        { id: "danang-tra-que", time: "16:00–17:30" },
        { id: "danang-an-bang", time: "17:30–18:30" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床、午饭；五行山石阶多、洞穴湿滑，穿防滑鞋。" },
        { time: "13:30–15:30", text: "五行山，按体力选择水山主线；炎热或下雨时缩短洞穴路线。" },
        { time: "16:00–17:30", text: "Tra Que 菜园慢走，或直接前往安邦海滩看海；两者只保留轻量停留。" },
        { time: "18:00–19:00", text: "会安 / 安邦附近晚饭，一小时。" },
        { time: "19:30–21:00", text: "有体力再去会安古城看灯，不舒服就直接回岘港。" }
      ], food: "这天可以在会安吃高楼面或鸡饭；若只走五行山，则回美溪附近吃晚饭，避免路线反复。" },
      { theme: "海钓 / 海上活动（需预约）", mapStops: [
        { id: "danang-fishing-port", time: "07:00–13:00" },
        { id: "danang-my-khe", time: "16:30–18:00" }
      ], blocks: [
        { time: "05:30–07:00", text: "这天必须早起；按船家确认的时间前往 Thọ Quang / Tiên Sa 一带集合，具体码头与接送点以订单为准。" },
        { time: "07:00–13:00", text: "海钓或半日海上活动；风浪、降雨、船班和成行人数都会影响安排，前一晚确认，天气差就不要硬出海。" },
        { time: "13:00–16:00", text: "返回后午饭、洗澡和补眠；不再叠加巴拿山或会安。" },
        { time: "16:30–18:00", text: "美溪海滩轻松散步，看体力决定是否下水。" },
        { time: "19:00–20:00", text: "晚饭，一小时。" },
        { time: "20:30 后", text: "早点休息；海上活动日不安排夜间跨区。" }
      ], food: "船上餐食按船家确认；上船前自备水和防晒，回岸后以热食和电解质饮料恢复，不安排复杂晚餐。" },
      { theme: "雨天缓冲与美山备选", mapStops: [
        { id: "danang-my-khe", time: "13:30–16:30" },
        { id: "danang-han-river", time: "20:00–21:30" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床、午饭；把这天作为天气缓冲，不提前锁死远郊。" },
        { time: "13:30–16:30", text: "天气好且愿意早起时，把这天替换为美山圣地整日线；否则留在美溪，安排咖啡、按摩、商场或海边慢走。" },
        { time: "17:00–18:30", text: "回酒店休息，确认下一段航班 / 交通与行李。" },
        { time: "19:00–20:00", text: "晚饭，一小时。" },
        { time: "20:00–21:30", text: "沿韩江或龙桥散步；天气差就直接回酒店。" }
      ], food: "雨天优先选择海州或美溪的室内餐厅；若安排美山，午餐按当地团 / 包车确认，回城后再吃一顿简单热食。" }
    ],
    alternatives: [
      { name: "会安古城", note: "适合下午出发、看灯笼夜景；与巴拿山分开安排。" },
      { name: "山茶半岛", note: "海况和天气好时安排半天，山路弯、用车比摩托更稳妥。" },
      { name: "灵应寺", note: "和山茶半岛绑定，不建议单独跨城往返。" },
      { name: "五行山", note: "10.01｜1.5–2小时。位于去会安途中；想加入就13:00出发先游山，约16:00进古城，删掉部分会馆。石阶湿滑时取消。" },
      { name: "海钓 / 海上活动", note: "10.02｜半天至一天。替换山茶线，通常需清晨集合；先确认船家、实际码头、救生衣与取消条件，强风浪不出海。" },
      { name: "美山圣地", note: "需要早起和较长车程，只在愿意牺牲午睡时作为整日备选。" },
      { name: "安邦海滩", note: "如果会安当天想减少古迹，可和 Tra Que 菜园组成慢游半天。" }
    ],
    restDay: { blocks: [
      { time: "12:00–13:00", text: "起床、午饭。" },
      { time: "13:30–17:00", text: "泳池、海边、咖啡或按摩，选一项作为半天休息。" },
      { time: "18:30–19:30", text: "海鲜晚饭。" },
      { time: "20:00 后", text: "酒店休息，不安排巴拿山式长途打卡。" }
    ], food: "休息日午后用海边咖啡或椰奶咖啡，晚饭就近吃海鲜；当天不为了网红店跨区排队。" }
  },
  nhatrang: {
    name: "芽庄", local: "Nha Trang", airport: "CXR", region: "中南部",
    minNights: 2, recommendedNights: 2, maxNights: 4, defaultNights: 2, budget: [1000000, 2100000], order: 12.2388,
    coordinates: [12.2388, 109.1967],
    themes: ["占婆文化", "泥浆浴", "海岛", "度假"],
    durationGuide: {
      2: "2 晚全部给 Fusion Resort：从大叻山路直送或岘港飞金兰，入住后只留在度假村；不安排芽庄市区。",
      3: "1 个芽庄市区完整日 + 2 个 Fusion 晚：优先婆那加塔、钟屿石岬与泥浴北线。",
      4: "1 个芽庄市区完整日 + 2 个 Fusion 晚，再多一个抵达缓冲夜；海岛与珍珠岛留作替换，不硬塞。",
    },
    summary: "市区只留一个完整日，优先婆那加塔与泥浴。10.05起住金兰 Fusion Resort 两晚，不再往返市区；海岛玩法只能替换10.04整天。",
    plays: ["婆那加塔", "龙山寺", "芽庄大教堂", "I-Resort 泥浆浴", "跳岛团 / 黑珍珠号候选", "珍珠岛", "国家海洋博物馆", "陈富海滩"],
    caution: "9–12 月是雨季；出海前一晚确认风浪、船班与集合码头。CXR 到陈富海滩住宿区约 35–40 km。",
    stay: "陈富海滩中段最省事；北部安静但餐饮较少；离岛玩法从南部码头出发。",
    move: "市区用 Grab；婆那加塔、钟屿石岬与 I-Resort 在北侧可连排，龙山寺与芽庄大教堂作为市区文化备选。跳岛团或珍珠岛都要单独占一天。",
    airportInfo: "金兰 CXR → 芽庄陈富海滩住宿区：约 35–40 km，Grab / 接送通常 45–60 分钟；机场不在芽庄市区，抵达日只排入住、看海和晚饭。→ Fusion Resort Cam Ranh 约 5–6 km，约 10–15 分钟。",
    days: [
      { theme: "占婆与泥浴", mapStops: [
        { id: "nhatrang-po-nagar", time: "13:15–14:15" },
        { id: "nhatrang-i-resort", time: "14:45–17:15" },
        { id: "nhatrang-tran-phu", time: "18:00–19:30" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床，在陈富海滩住宿区午饭；带泳衣、干衣和防水袋。" },
        { time: "13:00–14:15", text: "Grab 北上到婆那加塔，约 4–5 km、15–20 分钟；参观一小时，入祠遮肩过膝。" },
        { time: "14:15–14:45", text: "婆那加塔 → I-Resort 泥浆浴，向西约 4–5 km，预留 20–30 分钟接送。" },
        { time: "14:45–17:15", text: "I-Resort 泥浆浴：留 2.5 小时给换衣、泥浴、矿泉池和淋浴。预约下午前段，不压末场；泥浴浸泡时长按工作人员指导。" },
        { time: "17:15–18:00", text: "擦干换衣，Grab 返回陈富海滩住宿区，约 6–8 km、20–30 分钟；等车留量。" },
        { time: "18:00–19:00", text: "酒店附近晚饭，之后不再折返北部景点。" },
        { time: "19:30–20:30", text: "陈富海滩散步或直接回房休息；钟屿石岬留作不泡泥浴时的替换。" }
      ], food: "午饭吃 Bún chả cá（鱼饼米粉）；晚饭在市区选 Nem nướng（烤肉卷）或 Bánh căn（小煎饼），泥浴后补水，不为某一家网红店绕路。" },
      { theme: "海岛全天（必要早起）", mapStops: [
        { id: "nhatrang-port", time: "08:00–16:00" }
      ], blocks: [
        { time: "07:00–08:00", text: "起床、早餐；跳岛团常见 07:30–08:30 集合，这天需要早起。" },
        { time: "08:00–16:00", text: "跳岛团 / 出海；风浪不好就改为珍珠岛 VinWonders，按船班或缆车运营时间完整留一天。" },
        { time: "16:30–18:00", text: "返程、洗漱和休息。" },
        { time: "18:30–19:30", text: "晚饭，一小时。" },
        { time: "20:30 后", text: "回酒店；出海日不再叠加夜市以外的景点。" }
      ], food: "出海团餐和饮水以实际预订为准；回城后若仍有体力，再吃鱼饼米粉或海鲜，不把晚饭排到跨区。" },
      { theme: "海洋与慢游", mapStops: [
        { id: "nhatrang-long-son", time: "13:30–15:30" },
        { id: "nhatrang-tran-phu", time: "16:00–18:00" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床、午饭。" },
        { time: "13:30–15:30", text: "龙山寺与芽庄大教堂二选一，预留约 2 小时；若更想看海，再改越南国家海洋博物馆。" },
        { time: "16:00–18:00", text: "陈富海滩、咖啡或酒店休息；若前一晚确认风浪不适合出海，这天作为跳岛替代日。" },
        { time: "18:30–19:30", text: "晚饭，一小时。" },
        { time: "20:00–21:30", text: "芽庄夜市与海边散步，之后回酒店。" }
      ], food: "下午用海景咖啡缓冲，晚饭可在陈富海滩附近选海鲜、Bánh Căn 或 Nem Nướng；夜市只补小吃，不重复吃撑。" }
    ],
    resortTransition: { theme: "入住金兰湾", mapStops: [
      { id: "nhatrang-tran-phu", time: "11:30–12:30" },
      { id: "nhatrang-fusion", time: "13:30–14:30" }
    ], blocks: [
      { time: "10:30–11:30", text: "起床、早餐、收拾行李；不再新增芽庄市区景点。" },
      { time: "11:30–12:30", text: "退房后在陈富海滩附近吃午饭，补好饮水和零食。" },
      { time: "13:30–14:30", text: "芽庄市区 → Fusion Resort Cam Ranh，约 35–45 km，打车 / 酒店接送通常 45–70 分钟。" },
      { time: "15:00–17:00", text: "办理入住，泳池、海滩和 SPA 按预约安排；之后不再往返芽庄市区。" },
      { time: "19:00–20:00", text: "度假村晚餐，一小时。" },
      { time: "20:30 后", text: "留在金兰湾休息。" }
    ], food: "午饭在芽庄市区解决；入住 Fusion 后晚餐留在度假村，不为一顿饭往返市区。" },
    resortDay: { theme: "金兰湾度假", mapStops: [
      { id: "nhatrang-fusion", time: "13:30–20:30" }
    ], blocks: [
      { time: "12:00–13:00", text: "睡到自然醒，在 Fusion Resort 吃午饭。" },
      { time: "13:30–17:00", text: "海滩、泳池与度假村活动；SPA 按预约时段插入，不再往返芽庄市区。" },
      { time: "17:00–18:00", text: "傍晚海边散步，回房休息。" },
      { time: "19:00–20:00", text: "度假村晚餐。" },
      { time: "20:30 后", text: "继续在度假村休息，或直接睡觉。" }
    ], food: "晚饭留在度假村。All Spa Inclusive 指SPA权益，不等于三餐全包；餐食与SPA预约次数按订单确认。" },
    alternatives: [
      { name: "钟屿石岬", note: "10.04｜45–60分钟。替换泥浴后，与婆那加塔走同一条北部线；不要为了凑点压缩泥浴换衣和接送。" },
      { name: "珍珠岛 VinWonders", note: "可替换 10 月 4 日整天的市区线；建议早起，先核对跨海缆车与园区时间。" },
      { name: "跳岛团 / 黑珍珠号候选", note: "需要 07:30–08:30 集合；前一晚确认风浪、码头和船班。" },
      { name: "蚕岛 Hòn Tằm", note: "想要更偏度假的海岛替代跳岛团，按当天船班与天气决定。" },
      { name: "越南国家海洋博物馆", note: "10.04｜1.5–2小时。位于市区南侧，雨天替换整段北线；接陈富海滩咖啡，不再南北穿城。" },
      { name: "Tháp Bà 热矿泥浴", note: "如果 I-Resort 预约不合适，可作为泥浴替代，不安排两家都去。" },
      { name: "100 Eggs 泥浴", note: "另一条泥浴备选；确认位置和预约后再决定，避免和市区点位来回折返。" }
    ],
    restDay: { blocks: [
      { time: "12:00–13:00", text: "起床、午饭。" },
      { time: "13:30–17:00", text: "泳池、海边或按摩，按天气留在酒店附近。" },
      { time: "18:30–19:30", text: "晚饭。" },
      { time: "20:00 后", text: "咖啡、夜市或回酒店，不再塞景点。" }
    ], food: "休息日沿陈富海滩就近解决三餐；海鲜、鱼饼米粉和小煎饼各选一项，给天气或肠胃留余量。" },
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
    summary: "Fusion Resort Cam Ranh · Cam Lâm 金兰湾半岛；距 CXR T1 约 5–6 公里，车程通常 10–15 分钟。",
    plays: ["Fusion Resort Cam Ranh", "All Spa Inclusive", "泳池与海滩", "12:00 退房去 CXR T1"],
    caution: "确认订单：10 月 5 日 15:00 入住、10 月 7 日 12:00 退房；金兰湾不在芽庄市区，入住后直接留在度假村。",
    stay: "Fusion Resort Cam Ranh，Lot D10b, Cam Hai Dong, Cam Lam, Khanh Hoa。",
    move: "金兰湾属于芽庄一带但不在芽庄市区；从芽庄陈富海滩到度假村约 35–45 km，通常 45–70 分钟。提前向酒店预约送机。",
    airportInfo: "Fusion Resort → 金兰 CXR T1：约 5–6 km，打车 / 酒店送机通常 10–15 分钟；建议仍按航班提前 2 小时到机场。",
    days: [
      { theme: "纯度假", blocks: [
        { time: "12:00–13:00", text: "睡到自然醒，在 Fusion Resort 吃午饭。" },
        { time: "13:30–17:00", text: "海滩、泳池与度假村活动；SPA 按预约时段插入，不再往返芽庄市区。" },
        { time: "17:00–18:00", text: "回房间休息，看金兰湾日落。" },
        { time: "19:00–20:00", text: "度假村晚餐。" },
        { time: "20:30 后", text: "继续在度假村休息，或直接睡觉。" }
      ], food: "All Spa Inclusive 以度假村餐厅为主；入住前在芽庄市区补好饮水和零食，避免为一顿饭往返市区。" }
    ],
    restDay: { blocks: [
      { time: "12:00–13:00", text: "起床、午饭。" },
      { time: "13:30–17:00", text: "泳池、海滩和 SPA；不再安排跨城点位。" },
      { time: "19:00–20:00", text: "度假村晚餐。" },
      { time: "20:30 后", text: "收拾行李、休息，为第二天返程留余量。" }
    ], food: "晚餐继续在度假村解决；返程前不尝试距离过远的新店，把时间留给收拾和确认送机。" }
  },
  dalat: {
    name: "大叻", local: "Đà Lạt", airport: "DLI", region: "中部高原",
    minNights: 0, recommendedNights: 4, maxNights: 4, defaultNights: 4, budget: [850000, 1700000], order: 11.9404,
    coordinates: [11.9404, 108.4583],
    themes: ["咖啡", "高原建筑", "瀑布", "慢生活"],
    durationGuide: {
      2: "1 个完整日：默认安排市区建筑与咖啡；更想看自然时可替换为达坦拉南线，时间会偏紧。",
      3: "2 个完整日：建筑咖啡一天、瀑布泉林湖一天，节奏最合适。",
      4: "3 个完整日：增加咖啡农场或工作坊，并留半天给降雨和发呆。"
    },
    summary: "高原气候、咖啡、建筑与瀑布。",
    plays: ["达坦拉瀑布", "大叻旧火车站", "灵福寺", "疯狂屋", "大叻花园", "泉林湖", "Cầu Đất 咖啡产区", "K’Ho Coffee"],
    caution: "4–11 月多雨，早晚可能降到十几度；带薄外套和雨具，山路与户外项目不要排满。DLI 到市区约 40–60 分钟。",
    stay: "春香湖西南与大叻市场周边适合步行；泉林湖更安静，但每天需要用车。",
    move: "景点分散：旧火车站、灵福寺是东线；达坦拉、竹林禅院、泉林湖是南线。城区步行，郊区建议包车或摩托。",
    airportInfo: "联姜 DLI → 春香湖 / 大叻市场：约 30–35 km，接送通常 40–60 分钟；→ 疯狂屋、旧火车站等市区点位需先到住宿区，再步行或短途打车；→ 达坦拉 / 泉林湖南线还要从市区再走约 15–30 分钟。",
    days: [
      { theme: "建筑与咖啡", mapStops: [
        { id: "dalat-railway", time: "13:30–15:00" },
        { id: "dalat-crazy-house", time: "15:30–17:00" },
        { id: "dalat-market", time: "17:30–18:30" }
      ], blocks: [
        { time: "12:00–13:00", text: "起床、午饭；春香湖或大叻市场周边解决。" },
        { time: "13:30–15:00", text: "大叻旧火车站，预留约 1.5 小时；按当天班次和成行条件决定是否坐小火车去灵福寺，不把灵福寺当成必达。" },
        { time: "15:30–17:00", text: "疯狂屋 Crazy House，或改回城咖啡；灵福寺与疯狂屋不强行同排。" },
        { time: "17:30–18:30", text: "大叻市场与春香湖散步。" },
        { time: "19:00–20:00", text: "晚饭，一小时。" },
        { time: "20:30 后", text: "选一家咖啡店继续坐，或直接回酒店。" }
      ], food: "大叻市场可试 Bánh tráng nướng（烤米纸）；下午喝 La Viet 或 CHẠM 的咖啡/牛油果甜品，晚上用豆浆和热食收尾。" },
      { theme: "瀑布与山湖", mapStops: [
        { id: "dalat-datanla", time: "11:30–14:00" },
        { id: "dalat-truc-lam", time: "14:30–16:30" },
        { id: "dalat-tuyen-lam", time: "14:30–16:30" }
      ], blocks: [
        { time: "10:00–11:00", text: "起床、早餐；这条南线不必凌晨出发，但要在午后降雨前进入户外。" },
        { time: "11:00–11:30", text: "从市区前往达坦拉瀑布，车程约 15–25 分钟。" },
        { time: "11:30–14:00", text: "达坦拉瀑布 Datanla：过山车、步道与拍照预留约 2–2.5 小时；雨大或路滑就取消户外项目。" },
        { time: "14:30–16:30", text: "竹林禅院与泉林湖，包车走南线；傍晚前离开湖区。" },
        { time: "17:00–18:00", text: "回城休息。" },
        { time: "19:00–20:00", text: "晚饭；20:30 后直接回酒店。" }
      ], food: "南线回城后吃一小时热食；天气凉时可选 Lẩu bò Quán Gỗ 或蔬菜火锅，雨天不为餐厅继续绕路。" },
      { theme: "产地咖啡（需预约才早起）", mapStops: [
        { id: "dalat-cau-dat", time: "09:00–12:00" },
        { id: "dalat-kho-coffee", time: "13:30–17:00" }
      ], blocks: [
        { time: "09:00–12:00", text: "有预约才早起前往 Cầu Đất 茶咖啡产区，往返约占半天，出发前确认参观与杯测时段；没有预约则继续休息，12:00 起床，不去远郊。" },
        { time: "12:00–13:00", text: "有预约：回城吃午饭；无预约：起床后在市区吃午饭。" },
        { time: "13:30–17:00", text: "无预约方案改为 K’Ho Coffee、大叻市场或酒店休息；有预约方案也不再叠加南线景点。" },
        { time: "18:00–19:00", text: "大叻市场与晚饭。" },
        { time: "20:00 后", text: "回酒店，给山路和天气留余量。" }
      ], food: "Cầu Đất 有预约时以产区轻食和咖啡为主；无预约就在市区吃午饭，晚上回市场补热汤或火锅。" }
    ],
    alternatives: [
      { name: "玛利亚修道院", note: "市区轻量建筑备选，适合替换疯狂屋或雨天短走。" },
      { name: "灵福寺", note: "和大叻旧火车站 / Trại Mát 绑定，先核对小火车班次与成行条件。" },
      { name: "大叻花园", note: "春香湖旁的低强度花园线，适合替换一段咖啡或市场慢走。" },
      { name: "Lumiere Da Lat", note: "想安排夜间沉浸式灯光时使用，先查当日入场时段。" },
      { name: "Cầu Đất 咖啡产区", note: "距离市区较远，只有预约确认后才值得早起前往。" },
      { name: "草莓园", note: "郊区农场营业差异较大，先确认地址、采摘条件和回城车程。" },
      { name: "Dapa Hill", note: "景观咖啡替代，天气好时再去；雨雾天不为拍照硬上山路。" }
    ],
    restDay: { blocks: [
      { time: "12:00–13:00", text: "晚起、午饭。" },
      { time: "13:30–17:00", text: "咖啡、酒店发呆或 SPA；把这一段留给降雨和体力恢复。" },
      { time: "18:00–19:00", text: "市场晚餐。" },
      { time: "20:00 后", text: "回酒店休息。" }
    ], food: "休息日午后用本地咖啡或牛油果甜品，晚餐选市场小吃或高原蔬菜火锅；不增加远郊车程。" }
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

const MAP_PLACES = {
  hanoi: [
    { id: "hanoi-airport", name: "内排机场 HAN", lat: 21.2212, lng: 105.8072, kind: "context", terms: ["HAN T1", "HAN T2", "内排"] },
    { id: "hanoi-old-quarter", name: "老城区", lat: 21.0341, lng: 105.8502, kind: "context", terms: ["老城区", "老城"] },
    { id: "hanoi-hoan-kiem", name: "还剑湖", lat: 21.0287, lng: 105.8525, kind: "core", terms: ["还剑湖", "Hoàn Kiếm"] },
    { id: "hanoi-36-streets", name: "36 行街", lat: 21.0355, lng: 105.851, kind: "core", terms: ["36 行街"] },
    { id: "hanoi-cathedral", name: "河内大教堂", lat: 21.0289, lng: 105.8487, kind: "core", terms: ["河内大教堂"] },
    { id: "hanoi-weekend-walk", name: "老城周末步行街 / 夜市", lat: 21.0338, lng: 105.8524, kind: "core", terms: ["老城周末步行街", "夜市"] },
    { id: "hanoi-imperial-city", name: "升龙皇城", lat: 21.0356, lng: 105.8335, kind: "core", terms: ["升龙皇城"] },
    { id: "hanoi-temple-literature", name: "文庙", lat: 21.028, lng: 105.8353, kind: "core", terms: ["文庙"] },
    { id: "hanoi-west-lake", name: "西湖与镇国寺", lat: 21.0455, lng: 105.8369, kind: "core", terms: ["西湖与镇国寺", "西湖"] },
    { id: "hanoi-fine-arts", name: "越南美术馆", lat: 21.0308, lng: 105.8369, kind: "alternative", terms: ["越南美术馆"] },
    // Coordinates checked against the corresponding Wikipedia museum entries, 2026-09-08.
    { id: "hanoi-women", name: "越南女性博物馆", lat: 21.023463, lng: 105.851619, kind: "alternative", terms: ["越南女性博物馆"] },
    { id: "hanoi-hoa-lo", name: "火炉监狱遗址", lat: 21.0257, lng: 105.8461, kind: "alternative", terms: ["火炉监狱遗址"] },
    { id: "hanoi-market", name: "同春市场", lat: 21.0394, lng: 105.8471, kind: "alternative", terms: ["同春市场"] },
    { id: "hanoi-train-street", name: "河内火车街", lat: 21.0245, lng: 105.8412, kind: "alternative", terms: ["河内火车街"] }
  ],
  danang: [
    { id: "danang-airport", name: "岘港机场 DAD", lat: 16.0439, lng: 108.1997, kind: "context", terms: ["DAD T1"] },
    { id: "danang-my-khe", name: "美溪海滩", lat: 16.0678, lng: 108.2467, kind: "core", terms: ["美溪海滩", "美溪"] },
    { id: "danang-hai-chau", name: "海州区", lat: 16.0678, lng: 108.2208, kind: "context", terms: ["海州区"] },
    { id: "danang-cathedral", name: "岘港大教堂", lat: 16.0687, lng: 108.222, kind: "core", terms: ["岘港大教堂"] },
    { id: "danang-market", name: "韩市场", lat: 16.0698, lng: 108.2225, kind: "core", terms: ["韩市场"] },
    { id: "danang-cham", name: "占婆雕刻博物馆", lat: 16.0607, lng: 108.2233, kind: "core", terms: ["占婆雕刻博物馆"] },
    { id: "danang-han-river", name: "韩江 / 龙桥", lat: 16.0615, lng: 108.2267, kind: "core", terms: ["韩江", "龙桥"] },
    { id: "danang-son-tra", name: "山茶半岛", lat: 16.1044, lng: 108.2783, kind: "alternative", terms: ["山茶半岛"] },
    { id: "danang-linh-ung", name: "灵应寺", lat: 16.1048, lng: 108.2845, kind: "alternative", terms: ["灵应寺"] },
    { id: "danang-marble", name: "五行山", lat: 16.0035, lng: 108.2638, kind: "alternative", terms: ["五行山"] },
    { id: "danang-ba-na", name: "巴拿山", lat: 15.9958, lng: 107.9965, kind: "core", terms: ["巴拿山", "Ba Na Hills"] },
    { id: "danang-hoi-an", name: "会安古城", lat: 15.877, lng: 108.3275, kind: "core", terms: ["会安古城", "会安"] },
    { id: "danang-fishing-port", name: "海钓集合码头（Thọ Quang / Tiên Sa）", lat: 16.1172, lng: 108.2262, kind: "alternative", terms: ["Thọ Quang", "Tiên Sa", "海钓", "海上活动"] },
    { id: "danang-tra-que", name: "Tra Que 菜园", lat: 15.9034, lng: 108.3455, kind: "alternative", terms: ["Tra Que 菜园"] },
    { id: "danang-an-bang", name: "安邦海滩", lat: 15.9112, lng: 108.3555, kind: "alternative", terms: ["安邦海滩"] },
    // Approximate sanctuary location: https://en.wikipedia.org/wiki/Mỹ_Sơn
    { id: "danang-my-son", name: "美山圣地", lat: 15.767, lng: 108.117, kind: "alternative", terms: ["美山圣地"] }
  ],
  dalat: [
    { id: "dalat-airport", name: "联姜机场 DLI", lat: 11.7509, lng: 108.3663, kind: "context", terms: ["DLI T1", "联姜"] },
    { id: "dalat-futa-station", name: "FUTA 大叻联运站", lat: 11.9268818, lng: 108.4455138, kind: "transfer", terms: ["FUTA 大叻", "大叻联运站", "Bến Xe Liên Tỉnh", "Tô Hiến Thành", "To Hien Thanh"] },
    { id: "dalat-xuan-huong", name: "春香湖", lat: 11.9467, lng: 108.4419, kind: "context", terms: ["春香湖"] },
    { id: "dalat-market", name: "大叻市场", lat: 11.9406, lng: 108.4371, kind: "context", terms: ["大叻市场"] },
    { id: "dalat-railway", name: "大叻旧火车站", lat: 11.9472, lng: 108.4543, kind: "core", terms: ["大叻旧火车站"] },
    { id: "dalat-crazy-house", name: "疯狂屋", lat: 11.9404, lng: 108.4289, kind: "core", terms: ["疯狂屋", "Crazy House"] },
    { id: "dalat-datanla", name: "达坦拉瀑布", lat: 11.901, lng: 108.4434, kind: "core", terms: ["达坦拉瀑布", "Datanla"] },
    { id: "dalat-truc-lam", name: "竹林禅院", lat: 11.8844, lng: 108.4356, kind: "core", terms: ["竹林禅院"] },
    { id: "dalat-tuyen-lam", name: "泉林湖", lat: 11.899, lng: 108.4197, kind: "core", terms: ["泉林湖"] },
    { id: "dalat-linh-phuoc", name: "灵福寺", lat: 11.9759, lng: 108.4653, kind: "alternative", terms: ["灵福寺"] },
    { id: "dalat-flower-park", name: "大叻花园", lat: 11.9475, lng: 108.443, kind: "alternative", terms: ["大叻花园"] },
    { id: "dalat-domaine", name: "玛利亚修道院", lat: 11.947, lng: 108.4264, kind: "alternative", terms: ["玛利亚修道院"] },
    { id: "dalat-lumiere", name: "Lumiere Da Lat", lat: 11.9623, lng: 108.4456, kind: "alternative", terms: ["Lumiere Da Lat"] },
    { id: "dalat-cau-dat", name: "Cầu Đất 咖啡产区", lat: 11.7802, lng: 108.5343, kind: "core", terms: ["Cầu Đất"] },
    { id: "dalat-kho-coffee", name: "K’Ho Coffee", lat: 11.938, lng: 108.438, kind: "core", terms: ["K’Ho Coffee", "K'Ho Coffee"] },
    { id: "dalat-strawberry", name: "草莓园", lat: 11.963, lng: 108.414, kind: "alternative", terms: ["草莓园"] },
    { id: "dalat-dapa-hill", name: "Dapa Hill", lat: 11.969, lng: 108.355, kind: "alternative", terms: ["Dapa Hill"] }
  ],
  nhatrang: [
    { id: "nhatrang-airport", name: "金兰机场 CXR", lat: 12.0067, lng: 109.2186, kind: "context", terms: ["CXR T1", "金兰 CXR"] },
    { id: "nhatrang-city", name: "芽庄市区", lat: 12.2388, lng: 109.1967, kind: "context", terms: ["芽庄住宿区"] },
    { id: "nhatrang-tran-phu", name: "陈富海滩", lat: 12.238, lng: 109.196, kind: "core", terms: ["陈富海滩"] },
    { id: "nhatrang-po-nagar", name: "婆那加塔", lat: 12.2659, lng: 109.1957, kind: "core", terms: ["婆那加塔", "Po Nagar"] },
    { id: "nhatrang-hon-chong", name: "钟屿石岬", lat: 12.2711, lng: 109.2013, kind: "alternative", terms: ["钟屿石岬", "Hon Chong"] },
    { id: "nhatrang-i-resort", name: "I-Resort 泥浆浴", lat: 12.2795, lng: 109.1794, kind: "core", terms: ["I-Resort 泥浆浴"] },
    { id: "nhatrang-long-son", name: "龙山寺", lat: 12.2488, lng: 109.1828, kind: "core", terms: ["龙山寺"] },
    { id: "nhatrang-cathedral", name: "芽庄大教堂", lat: 12.2457, lng: 109.1946, kind: "core", terms: ["芽庄大教堂"] },
    { id: "nhatrang-museum", name: "国家海洋博物馆", lat: 12.2078, lng: 109.214, kind: "core", terms: ["国家海洋博物馆"] },
    { id: "nhatrang-port", name: "南部码头 / 跳岛集合", lat: 12.192, lng: 109.214, kind: "core", terms: ["跳岛团", "黑珍珠号", "南部码头"] },
    { id: "nhatrang-vinwonders", name: "珍珠岛 VinWonders", lat: 12.2023, lng: 109.238, kind: "core", terms: ["珍珠岛", "VinWonders"] },
    { id: "nhatrang-hon-tam", name: "蚕岛 Hòn Tằm", lat: 12.1724, lng: 109.264, kind: "alternative", terms: ["蚕岛", "Hòn Tằm"] },
    { id: "nhatrang-thap-ba", name: "Tháp Bà 热矿泥浴", lat: 12.2688, lng: 109.194, kind: "alternative", terms: ["Tháp Bà"] },
    { id: "nhatrang-100-eggs", name: "100 Eggs 泥浴", lat: 12.1932, lng: 109.17, kind: "alternative", terms: ["100 Eggs"] },
    { id: "nhatrang-fusion", name: "Fusion Resort Cam Ranh", lat: 12.0447, lng: 109.1951, kind: "core", terms: ["Fusion Resort", "金兰湾"] }
  ]
};

const DEFAULT_ROUTE = [
  { id: "start", city: "hanoi", nights: 3, role: "start", locked: true },
  { id: "danang", city: "danang", nights: 5, role: "middle", locked: true },
  { id: "end", city: "nhatrang", nights: 4, role: "end", locked: true }
];

const TRANSPORT = {};
const leg = (a, b, data) => { TRANSPORT[[a, b].sort().join("|")] = data; };

leg("hanoi", "danang", { mode: "飞机", duration: [1.3, 1.5], price: [700000, 1500000], note: "HAN 与 DAD 直飞选择通常最多；以下列出 9 月 27 日已提供的越捷航班，另计两端机场时间。", warning: "两地酒店之间按 4–5 小时安排。", startWindow: "9 月 27 日默认优先 14:05–15:30：不用清晨赶机场，抵达后仍能去美溪海滩；早班或晚班可按体力切换。", window: "优先 09:00–12:00 起飞；约 14:00–16:00 入住。" });
leg("hanoi", "nhatrang", { mode: "飞机", duration: [1.8, 2.0], price: [1000000, 2200000], note: "HAN 与 CXR 通常可直飞；金兰机场到芽庄市区还需约 45–60 分钟。", warning: "两地酒店之间通常约 5 小时。", startWindow: "9 月 27 日优先 11:00–15:00 起飞；落地、进城后只安排看海与晚餐。", window: "优先上午直飞；抵达后只安排酒店周边散步与晚餐。" });
leg("hanoi", "dalat", { mode: "飞机", duration: [1.6, 2], price: [1200000, 2500000], note: "HAN 与 DLI 有直飞；大叻一侧还需约 40 分钟机场接驳。", warning: "航班频次不如主干线，订票前复核 9 月 27 日具体班次。", startWindow: "9 月 27 日优先 11:00–16:00 的直飞；若当天只有早班或晚班，再与先飞岘港的方案比较。", window: "优先 10:00–15:00 直飞；避免晚班挤压抵达日。" });
leg("hanoi", "hue", { mode: "飞机", duration: [1.2, 1.4], price: [800000, 1700000], note: "HAN 与 HUI 之间优先选直飞。", warning: "另计两端机场接驳。", startWindow: "9 月 27 日优先中午至下午直飞；抵达后只沿香河吃饭散步。", window: "优先上午直飞；下午入住后只安排酒店周边。" });
leg("hanoi", "hcmc", { mode: "飞机", duration: [2.0, 2.3], price: [1100000, 2400000], note: "HAN 与 SGN 之间航班密集，但这段会跨越越南南北。", warning: "若之后折返中部，会增加一次长距离转场。" });
leg("hanoi", "phuquoc", { mode: "飞机", duration: [2.1, 2.4], price: [1400000, 3000000], note: "HAN 与 PQC 之间优先选直飞；部分时段可能需经胡志明市。", warning: "班次和直飞情况需按出发日确认。" });
leg("danang", "nhatrang", { mode: "飞机", duration: [1.1, 1.3], price: [900000, 2300000], note: "当前航线资料显示约每日 1–2 班直飞；火车约 9–11 小时。", warning: "默认路线的关键航段：先确认当天直飞，再锁定酒店。", window: "优先 09:00–13:00 直飞；约 15:00–17:00 入住下一站。" });
leg("danang", "dalat", { mode: "飞机", duration: [1.1, 1.3], price: [900000, 2400000], note: "以下为已提供的 9 月 29 日、9 月 30 日、10 月 1 日越捷直飞信息；日期变动时只显示对应日期。", warning: "先按离开日选择航班，再锁定酒店；机场接驳仍按半天计算。", window: "有合适直飞就选 09:00–14:00；整段连机场接驳按半天计算。" });
leg("danang", "hue", { mode: "火车 / 巴士 / 包车", duration: [2.5, 3.5], price: [120000, 450000], note: "经海云岭往返，陆路比坐飞机自然；火车景观较好。", warning: "雨天公路耗时可能增加。", window: "建议 08:00–09:00 出发；午后入住下一站。" });
leg("danang", "hcmc", { mode: "飞机", duration: [1.4, 1.7], price: [900000, 2100000], note: "DAD 与 SGN 之间直飞通常较多。", warning: "两地酒店之间按 4–5 小时安排。" });
leg("danang", "phuquoc", { mode: "飞机", duration: [1.7, 4.5], price: [1200000, 3000000], note: "有直飞时最方便，否则通常经胡志明市中转。", warning: "先按具体日期确认是否直飞。" });
leg("nhatrang", "dalat", { mode: "Klook 专车 / FUTA 大巴", duration: [3, 3.5], price: [180000, 1500000], note: "大叻 → 芽庄约 3 小时；专车可送到酒店，大巴需从 FUTA 站点再打车。", warning: "山路弯道多；请酒店前台协助下单 Klook 专车，或提前确认 FUTA 班次。", window: "建议 10:30–11:00 出发；约 14:00–15:00 抵达芽庄并办理入住。" });
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

const FLIGHTS = {
  "danang|hanoi": { "2026-09-28": [
    { id: "9G935", depart: "19:15", arrive: "20:35", duration: "1h20m", aircraft: "A320" }
  ] },
  "danang|nhatrang": { "2026-10-03": [
    { id: "VN1941", depart: "18:00", arrive: "19:15", duration: "1h15m", aircraft: "A321" }
  ] }
};

// Fixed second full day in Hanoi: a compact west-of-old-quarter cultural route.
CITIES.hanoi.days.push({
  theme: "历史建筑与西湖",
  mapStops: [
    { id: "hanoi-temple-literature", time: "13:15–14:45" },
    { id: "hanoi-imperial-city", time: "15:00–16:30" },
    { id: "hanoi-west-lake", time: "17:00–18:00" }
  ],
  blocks: [
    { time: "12:00–13:00", text: "起床，在还剑湖老城区吃午饭。" },
    { time: "13:00–13:15", text: "Grab 前往文庙，约 3–4 km、10–20 分钟。" },
    { time: "13:15–14:45", text: "文庙与国子监，留 1.5 小时看院落和建筑。" },
    { time: "14:45–15:00", text: "文庙 → 升龙皇城，约 2 km，打车约 10–15 分钟。" },
    { time: "15:00–16:30", text: "升龙皇城，按下午参观安排，闭馆前离开；雨大时可用越南美术馆替换整段。" },
    { time: "16:30–18:00", text: "打车到西湖与镇国寺一带约 15–25 分钟，湖边散步看夕阳；寺院如已关闭就只看外观。" },
    { time: "18:00–19:00", text: "返回老城区，晚饭；今天不再跨区。" },
    { time: "19:30–21:00", text: "周日夜晚可再逛老城周末步行街，或直接回酒店。" }
  ],
  food: "午饭老城河粉或 Bún chả；晚饭回老城吃越南家常菜，咖啡留在两处历史景点之间休息时喝。"
});

const PHRASES = {
  高频词: [
    ["Tôi", "我", "多伊"],
    ["Bạn", "你 / 朋友", "伴"],
    ["Anh / Chị", "您 / 先生 / 女士", "英 / 姐"],
    ["Em", "我（对年长者自称） / 你（称较年轻者）", "诶姆"],
    ["Chúng ta", "我们（包括对方）", "仲 达"],
    ["Người", "人", "努伊"],
    ["Cái", "个 / 件（物品量词）", "该"],
    ["Có", "有 / 是", "果"],
    ["Không", "不 / 没有", "空"],
    ["Được", "可以 / 好", "德"],
    ["Đúng", "对 / 正确", "东"],
    ["Sai", "错", "赛"],
    ["Rồi", "了 / 已经", "若伊"],
    ["Chưa", "还没 / ……了吗", "朱啊"],
    ["Cũng", "也", "贡"],
    ["Rất", "很 / 非常", "热"],
    ["Quá", "太 / 过于", "瓜"],
    ["Chỉ", "只 / 仅仅", "只"],
    ["Một chút", "一点", "木 朱"],
    ["Nhiều", "多", "纽"],
    ["Ít", "少", "一"],
    ["Tất cả", "全部 / 都", "特 嘎"],
    ["Một", "一", "木"],
    ["Hai", "二", "嗨"],
    ["Ba", "三", "巴"],
    ["Bốn", "四", "奔"],
    ["Năm", "五", "南"],
    ["Sáu", "六", "扫"],
    ["Bảy", "七", "拜"],
    ["Tám", "八", "探"],
    ["Chín", "九", "紧"],
    ["Mười", "十", "梅伊"],
    ["Trăm", "百", "占"],
    ["Nghìn", "千", "宁"],
    ["Đồng", "越南盾", "冬"],
    ["Đây", "这里 / 这是", "呆"],
    ["Đó", "那里 / 那是", "多"],
    ["Kia", "那边", "基啊"],
    ["Này", "这个 / 喂", "奈"],
    ["Đâu", "哪里", "兜"],
    ["Gì", "什么", "伊"],
    ["Ai", "谁", "哎"],
    ["Nào", "哪个 / 哪一个", "瑙"],
    ["Bao nhiêu", "多少 / 多少钱", "包 纽"],
    ["Bao lâu", "多久", "包 楼"],
    ["Khi nào", "什么时候", "基 瑙"],
    ["Tại sao", "为什么", "代 桑"],
    ["Ở đâu", "在哪里", "额 兜"],
    ["Hôm nay", "今天", "轰 奈"],
    ["Ngày mai", "明天", "艾 买"],
    ["Hôm qua", "昨天", "轰 瓜"],
    ["Bây giờ", "现在", "拜 约"],
    ["Sau", "以后 / 后面", "扫"],
    ["Trước", "以前 / 前面", "朱额"],
    ["Sáng", "早上 / 上午", "桑"],
    ["Trưa", "中午", "朱啊"],
    ["Chiều", "下午", "桥"],
    ["Tối", "晚上", "多伊"],
    ["Đêm", "夜里", "登姆"],
    ["Ngày", "天 / 日", "艾"],
    ["Giờ", "小时 / 点钟", "约"],
    ["Phút", "分钟", "富特"],
    ["Sớm", "早", "森"],
    ["Muộn", "晚 / 迟", "木温"],
    ["Đi", "去 / 走", "滴"],
    ["Đến", "到", "登"],
    ["Về", "回去", "耶"],
    ["Ăn", "吃", "安"],
    ["Uống", "喝", "翁"],
    ["Mua", "买", "木啊"],
    ["Bán", "卖", "班"],
    ["Xem", "看", "森姆"],
    ["Tìm", "找", "丁姆"],
    ["Chờ", "等", "卓"],
    ["Giúp", "帮助", "族"],
    ["Gọi", "叫 / 打电话", "戈伊"],
    ["Đặt", "预订 / 放置", "达"],
    ["Nhận", "收到 / 领取", "任"],
    ["Trả", "还 / 付", "茶"],
    ["Đổi", "换", "多伊"],
    ["Chọn", "选择", "仲"],
    ["Chờ một chút", "等一下", "卓 木 朱"],
    ["Nói", "说", "诺伊"],
    ["Viết", "写", "越特"],
    ["Hiểu", "懂", "休伊"],
    ["Biết", "知道 / 会", "别特"],
    ["Nhớ", "记得", "涅"],
    ["Quên", "忘记", "昆"],
    ["Thích", "喜欢", "特伊克"],
    ["Cần", "需要", "根"],
    ["Muốn", "想要", "木温"],
    ["Mở", "开 / 营业", "么"],
    ["Đóng", "关 / 打烊", "冬"],
    ["Dừng", "停", "用"],
    ["Lên", "上 / 上去", "连"],
    ["Xuống", "下 / 下去", "松"],
    ["Vào", "进 / 进入", "瓦奥"],
    ["Ra", "出 / 出去", "咋"],
    ["Trái", "左", "摘"],
    ["Phải", "右", "法伊"],
    ["Thẳng", "直走", "探"],
    ["Gần", "近", "根"],
    ["Xa", "远", "撒"],
    ["Trên", "上面", "真"],
    ["Dưới", "下面", "祖伊"],
    ["Trong", "里面", "仲"],
    ["Ngoài", "外面", "外伊"],
    ["Bên cạnh", "旁边", "边 景"],
    ["Ở giữa", "中间", "额 朱啊"],
    ["Lối vào", "入口", "洛伊 瓦奥"],
    ["Lối ra", "出口", "洛伊 咋"],
    ["Cửa", "门", "古啊"],
    ["Đầu", "头 / 开头", "兜"],
    ["Cuối", "末尾 / 最后", "归伊"],
    ["Chậm", "慢", "枕"],
    ["Nhanh", "快", "娘"],
    ["Tốt", "好", "多特"],
    ["Đẹp", "漂亮", "蝶普"],
    ["Xấu", "不好看 / 坏", "扫"],
    ["Ngon", "好吃", "农"],
    ["Rẻ", "便宜", "热"],
    ["Đắt", "贵", "达特"],
    ["Nóng", "热", "农"],
    ["Lạnh", "冷", "冷"],
    ["Mới", "新", "梅伊"],
    ["Cũ", "旧", "古"],
    ["Đầy", "满", "代伊"],
    ["Trống", "空 / 空闲", "仲"],
    ["Bận", "忙", "班"],
    ["Nước", "水", "讷"],
    ["Đồ ăn", "食物", "多 安"],
    ["Cơm", "米饭", "哥姆"],
    ["Phở", "河粉", "佛"],
    ["Bún", "米粉", "本"],
    ["Cà phê", "咖啡", "嘎 费"],
    ["Bia", "啤酒", "比啊"],
    ["Trà", "茶", "茶"],
    ["Sữa", "牛奶", "苏啊"],
    ["Đá", "冰块", "达"],
    ["Đường", "糖", "东"],
    ["Muối", "盐", "木伊"],
    ["Thịt", "肉", "特"],
    ["Gà", "鸡", "嘎"],
    ["Bò", "牛肉", "波"],
    ["Heo", "猪肉", "黑奥"],
    ["Cá", "鱼", "嘎"],
    ["Rau", "蔬菜", "饶"],
    ["Hải sản", "海鲜", "海 桑"],
    ["Nhà vệ sinh", "洗手间", "雅 卫 生"],
    ["Sân bay", "机场", "森 拜"],
    ["Ga tàu", "火车站", "嘎 道"],
    ["Bến xe", "汽车站 / 巴士站", "本 些"],
    ["Xe", "车", "些"],
    ["Taxi", "出租车", "塔西"],
    ["Vé", "票", "耶"],
    ["Tiền", "钱", "甜"],
    ["Giá", "价格", "架"],
    ["Thẻ", "卡", "特"],
    ["Tiền mặt", "现金", "甜 末"],
    ["Hộ chiếu", "护照", "护 照"],
    ["Hành lý", "行李", "杭 李"],
    ["Điện thoại", "手机", "电 话"],
    ["Pin", "电量 / 电池", "宾"],
    ["Wi-Fi", "无线网", "歪法伊"],
    ["Thuốc", "药", "图奥克"],
    ["Bệnh viện", "医院", "病 院"],
    ["Cửa hàng", "商店", "古啊 杭"],
    ["Chợ", "市场", "卓"],
    ["Mở cửa", "开门 / 营业", "么 古啊"],
    ["Đóng cửa", "关门 / 不营业", "冬 古啊"]
  ],
  基础: [
    ["Xin chào", "你好", "新 招"],
    ["Cảm ơn", "谢谢", "嘎门"],
    ["Xin lỗi", "对不起 / 不好意思", "新 洛伊"],
    ["Tạm biệt", "再见", "答姆 别"],
    ["Xin phép", "请问 / 借过", "新 费普"],
    ["Làm ơn", "麻烦 / 请", "蓝 恩"],
    ["Vâng / Dạ", "是的（礼貌）", "旺 / 亚"],
    ["Không", "不是 / 不要", "空"],
    ["Đúng rồi", "对，就是这样", "东 若伊"],
    ["Không có", "没有", "空 果"],
    ["Hết rồi", "没有了 / 用完了", "黑特 若伊"],
    ["Tôi tên là…", "我叫……", "多伊 颠 拉"],
    ["Tôi là người Trung Quốc", "我是中国人", "多伊 拉 努伊 仲 国"],
    ["Tôi nói tiếng Việt một chút", "我会说一点越南语", "多伊 诺伊 颠 越 木 朱"],
    ["Bạn khỏe không?", "你好吗？", "班 快 空"],
    ["Tôi khỏe, cảm ơn", "我很好，谢谢", "多伊 快 嘎门"],
    ["Tôi không hiểu", "我不明白 / 听不懂", "多伊 空 休伊"],
    ["Bạn có nói tiếng Anh không?", "你会说英语吗？", "伴 果 诺 颠 安 空"],
    ["Nói chậm một chút", "请说慢一点", "诺 枕 木 朱"],
    ["Bạn viết ra giúp tôi", "请帮我写下来", "伴 越 扎 族 多伊"],
    ["Bạn có thể nói tiếng Trung không?", "你可以说中文吗？", "班 果 特 诺伊 颠 仲 空"],
    ["Tôi biết một chút", "我会一点", "多伊 别 木 朱"],
    ["Không sao", "没关系", "空 桑"],
    ["Đợi một chút", "请等一下", "多伊 木 朱"],
    ["Tôi cần giúp đỡ", "我需要帮助", "多伊 根 族 德"]
  ],
  出行: [
    ["Cho tôi đến địa chỉ này", "请带我去这个地址", "卓 多伊 登 地啊 只 奈"],
    ["Dừng ở đây, làm ơn", "请停在这里", "用 额 得，蓝 恩"],
    ["Đi sân bay mất bao lâu?", "去机场要多久？", "滴 森 拜 麦 包 楼"],
    ["Bao nhiêu tiền?", "多少钱？", "包 纽 甜"],
    ["Bật đồng hồ tính tiền, làm ơn", "请打开计价器", "北 冬 湖 丁 甜，蓝 恩"],
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
    ["Một ly cà phê sữa đá, làm ơn", "请给我一杯冰奶咖啡", "木 利 嘎 费 苏啊 达，蓝 恩"],
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
    ["Cho tôi một cái túi", "请给我一个袋子", "卓 多伊 木 该 杜伊"]
  ],
  语法: [
    ["Xin …", "请……", "新"],
    ["Tôi muốn …", "我想要……", "多伊 木温"],
    ["Tôi cần …", "我需要……", "多伊 根"],
    ["Tôi thích …", "我喜欢……", "多伊 特伊克"],
    ["Tôi không thích …", "我不喜欢……", "多伊 空 特伊克"],
    ["Cho tôi …", "请给我……", "卓 多伊"],
    ["Cho tôi một …", "请给我一个……", "卓 多伊 木 ……"],
    ["Cho tôi thêm …", "请再给我……", "卓 多伊 添 ……"],
    ["Tôi có thể … không?", "我可以……吗？", "多伊 果 特 …… 空"],
    ["Có … không?", "有……吗？", "果 …… 空"],
    ["Có thể … không?", "可以……吗？", "果 特 …… 空"],
    ["… ở đâu?", "……在哪里？", "……额 兜"],
    ["… là gì?", "……是什么？", "……拉 伊"],
    ["Bao nhiêu tiền?", "多少钱？", "包 纽 甜"],
    ["Bao lâu?", "多久？", "包 楼"],
    ["Mấy giờ?", "几点？", "美 约"],
    ["Khi nào?", "什么时候？", "基 瑙"],
    ["Tại sao?", "为什么？", "代 桑"],
    ["Ai …?", "谁……？", "哎"],
    ["Cái gì?", "什么？", "该 伊"],
    ["Cái nào?", "哪一个？", "该 瑙"],
    ["Đi từ … đến …", "从……到……", "滴 特 …… 登 ……"],
    ["Từ … đến … bao lâu?", "从……到……多久？", "特 …… 登 …… 包 楼"],
    ["Đi …", "去……", "滴"],
    ["Tôi muốn đi …", "我想去……", "多伊 木温 滴"],
    ["Tôi đã đặt …", "我已经预订了……", "多伊 达 达 ……"],
    ["Tôi đang …", "我正在……", "多伊 当"],
    ["Tôi đã …", "我已经……", "多伊 达 ……"],
    ["Tôi chưa …", "我还没有……", "多伊 朱啊 ……"],
    ["Tôi không muốn …", "我不想要……", "多伊 空 木温"],
    ["Không …", "不要 / 不……", "空"],
    ["Đừng …", "请不要……", "登"],
    ["Làm ơn …", "麻烦请……", "蓝 恩"],
    ["Nói chậm một chút", "请说慢一点", "诺伊 枕 木 朱"],
    ["Bạn nói lại được không?", "你可以再说一遍吗？", "伴 诺伊 莱 德 空"],
    ["Bạn có thể viết ra không?", "你可以写下来吗？", "伴 果 特 越 扎 空"],
    ["Tôi hiểu / Tôi không hiểu", "我懂 / 我不懂", "多伊 休伊 / 多伊 空 休伊"],
    ["Tôi nói tiếng Việt chưa tốt", "我的越南语还不太好", "多伊 诺伊 颠 越 朱啊 多特"],
    ["Bạn có thể nói tiếng Trung không?", "你可以说中文吗？", "班 果 特 诺伊 颠 仲 空"],
    ["Cái này / cái đó", "这个 / 那个", "该 奈 / 该 多"],
    ["Đây là …", "这是……", "呆 拉"],
    ["Tôi có … / Tôi không có …", "我有…… / 我没有……", "多伊 果 / 多伊 空 果"],
    ["Có thể đổi … không?", "可以换……吗？", "果 特 多伊 空"],
    ["Có thể thanh toán bằng thẻ không?", "可以刷卡吗？", "果 特 汤 顿 棒 特 空"],
    ["Một …, làm ơn", "请给我一个……", "木 …… 蓝 恩"],
    ["Thêm … / Ít …", "多一点…… / 少一点……", "添 …… / 一 ……"],
    ["Không cay / Ít cay", "不要辣 / 少辣", "空 该 / 一 该"],
    ["Không có …", "没有……", "空 果 ……"],
    ["Đã … chưa?", "已经……了吗？", "达 …… 朱啊"],
    ["Rất … / … quá!", "很＋形容词 / 形容词＋太……了（如 ngon quá：太好吃了）", "惹特 …… / …… 瓜"],
    ["Ở đây / ở đó", "在这里 / 在那里", "额 呆 / 额 多"],
    ["Bên trái / bên phải", "左边 / 右边", "本 摘 / 本 法伊"],
    ["Ở trên / ở dưới", "在上面 / 在下面", "额 真 / 额 祖伊"],
    ["Cho tôi xuống ở đây", "请让我在这里下车", "卓 多伊 松 额 呆"],
    ["Tính tiền, làm ơn", "请买单", "丁 甜 蓝 恩"]
  ]
};

const PHRASE_READINGS = {
  "Tôi": "多伊", "Bạn": "班", "Anh / Chị": "英 / 只", "Em": "诶姆", "Chúng ta": "仲 达", "Chúng tôi": "仲 多伊",
  "Có": "哥", "Không": "空", "Được": "得", "Đúng": "东", "Đúng rồi": "东 若伊", "Rồi": "若伊", "Chưa": "朱啊",
  "Cũng": "贡", "Rất": "惹特", "Quá": "瓜", "Một chút": "木 朱", "Nhiều": "纽", "Ít": "一特", "Tất cả": "特 嘎",
  "Một": "莫特", "Hai": "海", "Ba": "巴", "Bốn": "奔", "Năm": "南", "Sáu": "扫", "Bảy": "拜", "Tám": "探姆", "Chín": "紧", "Mười": "梅",
  "Trăm": "占", "Nghìn": "宁", "Đồng": "东", "Đây": "呆", "Đó": "多", "Đâu": "兜", "Gì": "伊", "Ai": "哎", "Nào": "瑙",
  "Bao nhiêu": "包 纽", "Bao lâu": "包 楼", "Khi nào": "基 瑙", "Tại sao": "代 桑", "Ở đâu": "额 兜", "Hôm nay": "轰 奈", "Ngày mai": "艾 买", "Bây giờ": "拜 哟",
  "Sáng": "桑", "Trưa": "朱啊", "Chiều": "桥", "Tối": "多伊", "Giờ": "约", "Phút": "富特", "Đi": "滴", "Đến": "登", "Về": "维", "Ăn": "安", "Uống": "翁",
  "Mua": "木啊", "Bán": "班", "Xem": "森姆", "Tìm": "丁姆", "Chờ": "卓", "Gọi": "戈伊", "Đặt": "达", "Nhận": "任", "Trả": "茶", "Đổi": "多伊", "Chọn": "仲",
  "Nói": "诺伊", "Viết": "越特", "Hiểu": "休伊", "Biết": "别特", "Cần": "根", "Muốn": "木温", "Mở": "么", "Đóng": "东", "Dừng": "用", "Lên": "连", "Xuống": "松", "Vào": "瓦奥", "Ra": "扎",
  "Trái": "摘", "Phải": "法伊", "Thẳng": "探", "Gần": "根", "Xa": "萨", "Trên": "真", "Dưới": "祖伊", "Trong": "仲", "Ngoài": "外伊", "Bên cạnh": "宾 景", "Ở giữa": "额 朱啊", "Lối vào": "洛伊 瓦奥", "Lối ra": "洛伊 扎",
  "Chậm": "枕", "Nhanh": "娘", "Tốt": "多特", "Ngon": "农", "Rẻ": "热", "Đắt": "达特", "Nóng": "农", "Lạnh": "冷", "Nước": "讷", "Cơm": "哥姆", "Phở": "佛", "Bún": "本", "Cà phê": "嘎 费", "Bia": "比啊", "Trà": "茶", "Đá": "达", "Đường": "东", "Muối": "木伊", "Thịt": "特", "Gà": "嘎", "Bò": "波", "Cá": "嘎", "Rau": "饶", "Hải sản": "海 桑",
  "Nhà vệ sinh": "雅 卫 生", "Sân bay": "森 拜", "Ga tàu": "嘎 道", "Bến xe": "本 些", "Xe": "些", "Taxi": "塔西", "Vé": "维", "Tiền": "甜", "Giá": "架", "Thẻ": "特", "Tiền mặt": "甜 末", "Hộ chiếu": "霍 诏", "Hành lý": "杭 李", "Điện thoại": "电 陶伊", "Pin": "宾", "Cửa hàng": "古啊 杭", "Chợ": "卓"
};

const PLACE_ALIASES = {
  "越南女性博物馆": "Bảo tàng Phụ nữ Việt Nam",
  "火炉监狱遗址": "Di tích Nhà tù Hỏa Lò",
  "还剑湖": "还剑湖 Hoàn Kiếm",
  "36 行街": "河内老城区 36 行街 Hanoi Old Quarter",
  "河内大教堂": "河内大教堂 St. Joseph’s Cathedral",
  "咖啡工作坊": "Coffee Workshop 咖啡工作坊",
  "老城周末步行街": "河内老城周末步行街 Hanoi Weekend Walking Street",
  "越南美术馆": "越南美术馆 Vietnam National Fine Arts Museum",
  "升龙皇城": "升龙皇城 Imperial Citadel of Thăng Long",
  "文庙": "文庙 Temple of Literature",
  "西湖": "河内西湖 Hồ Tây",
  "镇国寺": "镇国寺 Chùa Trấn Quốc",
  "同春市场": "同春市场 Chợ Đồng Xuân",
  "河内火车街": "河内火车街 Hanoi Train Street",
  "Pho 10": "Pho 10 Ly Quoc Su",
  "Bún Bò Nam Bộ": "Bún Bò Nam Bộ",
  "Cafe Giang": "Cafe Giang",
  "Bún chả": "Bún chả Hà Nội",
  "Bánh mì 25": "Bánh Mì 25",
  "美溪海滩": "美溪海滩 Mỹ Khê Beach",
  "占婆雕刻博物馆": "占婆雕刻博物馆 Museum of Cham Sculpture",
  "海州区": "海州区 Hải Châu",
  "岘港大教堂": "岘港大教堂 Da Nang Cathedral",
  "韩市场": "韩市场 Chợ Hàn",
  "韩江": "岘港韩江 Sông Hàn",
  "龙桥": "岘港龙桥 Cầu Rồng",
  "五行山": "五行山 Ngũ Hành Sơn",
  "巴拿山": "巴拿山 Ba Na Hills",
  "Tra Que 菜园": "Tra Que Vegetable Village",
  "Cam Chau 稻田": "Cam Châu Rice Fields",
  "会安古城": "会安古城 Hội An Ancient Town",
  "会安": "会安 Hội An",
  "山茶半岛": "山茶半岛 Sơn Trà Peninsula",
  "灵应寺": "灵应寺 Chùa Linh Ứng",
  "安邦海滩": "安邦海滩 An Bàng Beach",
  "美山圣地": "美山圣地 Mỹ Sơn Sanctuary",
  "WONDERLUST": "WONDERLUST Bakery & Coffee Da Nang",
  "Cộng Cà Phê": "Cộng Cà Phê Đà Nẵng",
  "Bún chả cá": "Bún chả cá Đà Nẵng",
  "Bánh xèo": "Bánh xèo Đà Nẵng",
  "Cơm gà": "Cơm gà Hội An",
  "Cao lầu": "Cao lầu Hội An",
  "婆那加塔": "婆那加塔 Po Nagar Cham Towers",
  "龙山寺": "龙山寺 Long Sơn Pagoda",
  "芽庄大教堂": "芽庄大教堂 Nha Trang Cathedral",
  "钟屿石岬": "钟屿石岬 Hòn Chồng",
  "I-Resort 泥浆浴": "I-Resort Nha Trang 泥浆浴",
  "黑珍珠号": "黑珍珠号芽庄跳岛团",
  "VinWonders": "VinWonders Nha Trang 珍珠岛",
  "越南国家海洋博物馆": "越南国家海洋博物馆 National Oceanographic Museum",
  "陈富海滩": "陈富海滩 Trần Phú Beach",
  "芽庄夜市": "芽庄夜市 Nha Trang Night Market",
  "Bún Chả Cá": "Bún chả cá Nha Trang",
  "Nem Nướng": "Nem Nướng Nha Trang",
  "Bánh Căn": "Bánh Căn Nha Trang",
  "珍珠岛": "VinWonders Nha Trang",
  "蚕岛": "Hòn Tằm Nha Trang",
  "Tháp Bà": "Tháp Bà Hot Springs Nha Trang",
  "100 Eggs": "100 Eggs Mud Bath Nha Trang",
  "Fusion Resort": "Fusion Resort Cam Ranh",
  "春香湖": "春香湖 Hồ Xuân Hương",
  "大叻旧火车站": "大叻旧火车站 Dalat Railway Station",
  "大叻市场": "大叻市场 Chợ Đà Lạt",
  "疯狂屋": "疯狂屋 Crazy House",
  "大叻花园": "大叻花园 Da Lat Flower Park",
  "玛利亚修道院": "玛利亚修道院 Domaine de Marie",
  "Lumiere Da Lat": "Lumiere Da Lat",
  "草莓园": "大叻草莓园 Da Lat Strawberry Farm",
  "Dapa Hill": "Dapa Hill Da Lat",
  "达坦拉瀑布": "达坦拉瀑布 Datanla Waterfall",
  "竹林禅院": "竹林禅院 Thiền Viện Trúc Lâm",
  "泉林湖": "泉林湖 Hồ Tuyền Lâm",
  "Cầu Đất": "Cầu Đất Tea Hill",
  "K'Ho Coffee": "K’Ho Coffee",
  "La Viet": "La Viet Coffee Da Lat",
  "CHẠM": "CHẠM Cafe & Kem Bơ Đà Lạt",
  "Lẩu bò Quán Gỗ": "Lẩu bò Quán Gỗ Da Lat",
  "Bánh tráng nướng": "Bánh tráng nướng Đà Lạt",
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
let flightChoices = loadFlightChoices();
let activeTool = null;
let lastToolTrigger = null;
let fxCurrency = "CNY";
let activePhraseCategory = Object.keys(PHRASES)[0];
let revealObserver = null;
let activeNodeId = route[0]?.id || null;
let mapCityKey = route.find(node => MAP_PLACES[node.city])?.city || "hanoi";
let mapPlanIndex = 0;
let mapSelectedStopId = null;
let mapShowAlternatives = false;
let mapShowAll = false;
let mapViewState = null;
let mapRenderedCityKey = null;
let mapInstance = null;
let mapResizeObserver = null;
let mapMarkerLayer = null;
let mapRouteLayer = null;
let mapMarkerRefs = new Map();
let mapActivePlaceIds = new Set();
let mapOtherPlaceIds = new Set();
let timelineObserver = null;
let timelineFrame = null;
let activePlanAnchor = null;
let placeMenuContext = null;
let pendingMapFocus = null;
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

function activeRouteNodes() {
  return route.filter(node => node.role !== "middle" || node.nights > 0);
}

function routeNodeIndex(id) {
  return route.findIndex(node => node.id === id);
}

function isSkippedNode(node) {
  return node.role === "middle" && node.nights === 0;
}

function endNights() {
  return route.find(node => node.role === "end")?.nights || 2;
}

function startNights() {
  return route.find(node => node.role === "start")?.nights || CITIES.hanoi.defaultNights;
}

function middleStartDate() {
  return addDays(MIDDLE_START_DATE, startNights() - 2);
}

function middleNightsTarget() {
  const nightsUntilCheckout = Math.round((HOTEL_CHECKOUT_DATE - middleStartDate()) / (24 * 60 * 60 * 1000));
  return Math.max(0, nightsUntilCheckout - endNights());
}

function canAdjustNights() { return false; }

function loadRoute() {
  // Booked dates take precedence over every previously saved editable itinerary.
  return cloneDefaultRoute();
}

function loadFlightChoices() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FLIGHT_STORAGE_KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function clampNights(value, cityKey) {
  const minimum = CITIES[cityKey]?.minNights ?? 1;
  const maximum = CITIES[cityKey]?.maxNights ?? 5;
  const parsed = Number.parseInt(value, 10);
  const normalized = Number.isFinite(parsed) ? parsed : minimum;
  return Math.max(minimum, Math.min(maximum, normalized));
}

function saveRoute() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(route));
}

function saveFlightChoices() {
  localStorage.setItem(FLIGHT_STORAGE_KEY, JSON.stringify(flightChoices));
}

function budgetForNode(node) {
  if (node.role === "end" && node.city === "nhatrang") {
    const cityNights = Math.max(0, node.nights - 2);
    return [
      CITIES.nhatrang.budget[0] * cityNights + CITIES.camranh.budget[0] * 2,
      CITIES.nhatrang.budget[1] * cityNights + CITIES.camranh.budget[1] * 2
    ];
  }
  return [CITIES[node.city].budget[0] * node.nights, CITIES[node.city].budget[1] * node.nights];
}

function ensureActiveNode() {
  if (!route.some(node => node.id === activeNodeId)) activeNodeId = route[0]?.id || null;
}

function esc(value) {
  return String(value).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
}

function findMapPlace(term, cityKey = null) {
  const places = cityKey && MAP_PLACES[cityKey]
    ? MAP_PLACES[cityKey]
    : Object.values(MAP_PLACES).flat();
  return places.find(place => place.name === term || place.terms.includes(term))
    || places.find(place => place.terms.some(candidate => candidate.includes(term) || term.includes(candidate))) || null;
}

const PLACE_ORIGINALS = {
  'hanoi-women': 'Bảo tàng Phụ nữ Việt Nam', 'hanoi-hoa-lo': 'Di tích Nhà tù Hỏa Lò',
  'hanoi-airport': 'Sân bay quốc tế Nội Bài', 'hanoi-old-quarter': 'Phố cổ Hà Nội',
  'hanoi-hoan-kiem': 'Hồ Hoàn Kiếm', 'hanoi-36-streets': 'Hà Nội 36 phố phường',
  'hanoi-cathedral': 'Nhà thờ Lớn Hà Nội', 'hanoi-coffee': 'Coffee Workshop, Hanoi',
  'hanoi-weekend-walk': 'Phố đi bộ Hồ Hoàn Kiếm / Chợ đêm phố cổ Hà Nội',
  'hanoi-imperial-city': 'Hoàng thành Thăng Long', 'hanoi-temple-literature': 'Văn Miếu – Quốc Tử Giám',
  'hanoi-west-lake': 'Hồ Tây / Chùa Trấn Quốc', 'hanoi-fine-arts': 'Bảo tàng Mỹ thuật Việt Nam',
  'hanoi-market': 'Chợ Đồng Xuân', 'hanoi-train-street': 'Hanoi Train Street',
  'danang-airport': 'Sân bay quốc tế Đà Nẵng', 'danang-my-khe': 'Bãi biển Mỹ Khê',
  'danang-hai-chau': 'Hải Châu', 'danang-cathedral': 'Nhà thờ Chính tòa Đà Nẵng',
  'danang-market': 'Chợ Hàn', 'danang-cham': 'Bảo tàng Điêu khắc Chăm Đà Nẵng',
  'danang-han-river': 'Sông Hàn / Cầu Rồng', 'danang-son-tra': 'Bán đảo Sơn Trà',
  'danang-linh-ung': 'Chùa Linh Ứng Sơn Trà', 'danang-marble': 'Ngũ Hành Sơn',
  'danang-ba-na': 'Bà Nà Hills', 'danang-hoi-an': 'Phố cổ Hội An',
  'danang-fishing-port': 'Cảng cá Thọ Quang / Cảng Tiên Sa', 'danang-tra-que': 'Làng rau Trà Quế',
  'danang-an-bang': 'Bãi biển An Bàng', 'danang-my-son': 'Thánh địa Mỹ Sơn',
  'dalat-airport': 'Sân bay Liên Khương', 'dalat-futa-station': 'Bến xe liên tỉnh Đà Lạt, 01 Tô Hiến Thành',
  'dalat-xuan-huong': 'Hồ Xuân Hương', 'dalat-market': 'Chợ Đà Lạt',
  'dalat-railway': 'Ga Đà Lạt', 'dalat-crazy-house': 'Crazy House – Biệt thự Hằng Nga',
  'dalat-datanla': 'Thác Datanla', 'dalat-truc-lam': 'Thiền viện Trúc Lâm Đà Lạt',
  'dalat-tuyen-lam': 'Hồ Tuyền Lâm', 'dalat-linh-phuoc': 'Chùa Linh Phước',
  'dalat-flower-park': 'Vườn hoa thành phố Đà Lạt', 'dalat-domaine': 'Nhà thờ Domaine de Marie',
  'dalat-lumiere': 'Lumiere Da Lat', 'dalat-cau-dat': 'Cầu Đất', 'dalat-kho-coffee': 'K’Ho Coffee',
  'dalat-strawberry': 'Vườn dâu tây Đà Lạt', 'dalat-dapa-hill': 'Dapa Hill',
  'nhatrang-airport': 'Sân bay quốc tế Cam Ranh', 'nhatrang-city': 'Nha Trang',
  'nhatrang-tran-phu': 'Bãi biển Trần Phú', 'nhatrang-po-nagar': 'Tháp Bà Ponagar',
  'nhatrang-hon-chong': 'Hòn Chồng', 'nhatrang-i-resort': 'I-Resort Nha Trang',
  'nhatrang-long-son': 'Chùa Long Sơn', 'nhatrang-cathedral': 'Nhà thờ Núi Nha Trang',
  'nhatrang-museum': 'Bảo tàng Hải dương học', 'nhatrang-port': 'Bến tàu du lịch Nha Trang',
  'nhatrang-vinwonders': 'VinWonders Nha Trang', 'nhatrang-hon-tam': 'Hòn Tằm',
  'nhatrang-thap-ba': 'Tắm bùn Tháp Bà', 'nhatrang-100-eggs': 'Trăm Trứng',
  'nhatrang-fusion': 'Fusion Resort Cam Ranh'
};

function placeAttributes({ place, displayName, source, cityKey, planIndex = -1, anchor = "", inline = false }) {
  if (!place) return "";
  source = PLACE_ORIGINALS[place.id] || source;
  return `class="${inline ? "inline-place " : ""}place-trigger" role="button" tabindex="0" aria-haspopup="dialog" aria-label="打开${esc(displayName)}地点操作" data-place-id="${esc(place.id)}" data-place-name="${esc(displayName)}" data-place-source="${esc(source)}" data-place-city="${esc(cityKey)}" data-place-plan-index="${planIndex}" data-place-anchor="${esc(anchor)}"`;
}

function findPlanIndexForPlace(cityKey, plans, displayName) {
  const place = findMapPlace(displayName, cityKey);
  if (!place) return -1;
  const index = plans.findIndex(plan => mapPlaceMatches(MAP_PLACES[cityKey], plan).some(stop => stop.place.id === place.id));
  return index >= 0 ? index : -1;
}

function renderPlanText(value, context = {}) {
  const text = String(value);
  const matches = text.matchAll(new RegExp(PLACE_PATTERN.source, "g"));
  let cursor = 0;
  let html = "";
  for (const match of matches) {
    html += esc(text.slice(cursor, match.index));
    const place = findMapPlace(match[0], context.cityKey);
    html += place
      ? `<span ${placeAttributes({ place, displayName: match[0], source: PLACE_ALIASES[match[0]] || match[0], cityKey: context.cityKey || "", planIndex: context.planIndex ?? -1, anchor: context.anchor || "", inline: true })}>${esc(match[0])}</span>`
      : esc(match[0]);
    cursor = match.index + match[0].length;
  }
  return html + esc(text.slice(cursor));
}

function renderTimeBlocks(blocks, context = {}) {
  return `<div class="time-blocks">${blocks.map(block => `<div class="time-block"><time>${esc(block.time)}</time><p>${renderPlanText(block.text, context)}</p></div>`).join("")}</div>`;
}

function renderDayFood(food, context = {}) {
  if (!food) return "";
  return `<section class="day-food" aria-label="吃喝推荐"><span class="day-food-label">吃喝</span><p>${renderPlanText(food, context)}</p></section>`;
}

function availableAlternatives(city, plans) {
  const scheduled = new Set(plans.flatMap(plan => (plan.mapStops || []).map(stop => stop.id)));
  return (city.alternatives || []).filter(item => {
    const place = findMapPlace(item.name, Object.keys(CITIES).find(key => CITIES[key] === city));
    return !place || !scheduled.has(place.id);
  });
}

function renderAlternatives(city, node, plans = []) {
  if (node.role === "end" && node.city === "nhatrang" && node.nights === 2) return "";
  const alternatives = availableAlternatives(city, plans);
  if (!alternatives.length) return "";
  return `<section class="alternative-shelf" aria-label="备选景点"><div class="alternative-head"><span>备选景点</span></div><ul class="alternative-list">${alternatives.map(item => {
    const place = findMapPlace(item.name, node.city);
    const trigger = place
      ? placeAttributes({ place, displayName: item.name, source: PLACE_ALIASES[item.name] || item.name, cityKey: node.city, planIndex: Math.max(0, plans.findIndex(plan => plan.date === item.note.slice(0, 5)), findPlanIndexForPlace(node.city, plans, item.name)) })
      : `type="button" title="点击复制地点" data-copy-text="${esc(PLACE_ALIASES[item.name] || item.name)}"`;
    return `<li><button type="button" ${trigger}>${esc(item.name)}</button><span>${esc(item.note)}</span></li>`;
  }).join("")}</ul></section>`;
}

function dateLabel(date) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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

function getRouteLeg(node, next) {
  if (node.city === "dalat" && next.role === "end" && next.city === "nhatrang" && next.nights === 2) {
    return {
      mode: "Klook 专车直送",
      duration: [3.5, 4.5],
      price: [350000, 1500000],
      note: "两晚保底方案从大叻直接送到 Fusion Resort Cam Ranh；若坐 FUTA 到芽庄市区，还要再接车。",
      warning: "山路弯道多；请酒店前台协助下单专车，并准备晕车药。",
      window: "10 月 5 日 09:30–10:30 退房出发，约 14:00–15:00 抵达 Fusion。"
    };
  }
  return getLeg(node.city, next.city);
}

function legKey(a, b) {
  return [a, b].sort().join("|");
}

function flightOptionsForLeg(origin, destination, date) {
  return FLIGHTS[legKey(origin, destination)]?.[dateKey(date)] || [];
}

function flightChoiceKey(origin, destination, date) {
  return `${legKey(origin, destination)}@${dateKey(date)}`;
}

function selectedFlightFor(origin, destination, date) {
  return flightOptionsForLeg(origin, destination, date)[0] || null;
}

function clockMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function clockLabel(minutes) {
  const normalized = (minutes + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
}

function shiftClock(value, amount) {
  return clockLabel(clockMinutes(value) + amount);
}

function clockRange(start, end) {
  return `${start}–${end}`;
}

function flightTransferBlocks(origin, destination, date) {
  const flight = selectedFlightFor(origin, destination, date);
  const airportBlocks = origin === "hanoi" ? [
    { time: "12:00–13:00", text: "起床、午饭、退房，行李暂存前台。" },
    { time: "13:00–15:30", text: "同春市场买伴手礼，或在老城喝咖啡；不再去远郊。" },
    { time: "15:30–16:15", text: "回酒店取行李、洗手间和简餐，16:15 出发。" },
    { time: "16:15–17:45", text: "还剑湖 / 老城区 → HAN T1，约 30–35 km；Grab 通常 45–75 分钟，按 90 分钟留量。17:45 到机场，提前 1.5 小时。" }
  ] : [
    { time: "12:00–13:00", text: "起床、午饭、退房，行李暂存前台。" },
    { time: "13:00–15:00", text: "美溪海滩附近咖啡或按摩，留在市区；不安排巴拿山、会安或出海。" },
    { time: "15:00–15:45", text: "简单吃点东西，回酒店取行李；这班机票标注无餐食。" },
    { time: "15:45–16:30", text: "美溪海滩一带 → DAD T1，约 6–8 km、15–25 分钟；留 45 分钟接送余量，16:30 到机场，提前 1.5 小时。" }
  ];
  return [...airportBlocks,
    { time: clockRange(shiftClock(flight.depart, -90), flight.depart), text: "值机、托运、安检，按登机牌时间到登机口。" },
    { time: clockRange(flight.depart, flight.arrive), text: `${flight.id}：${CITIES[origin].airport} T1 → ${CITIES[destination].airport} T1，飞行 ${flight.duration}。` }
  ];
}

function transferBlocksForNode(previous, node, date) {
  return flightTransferBlocks(previous.city, node.city, date);
}

function arrivalBlocksForNode(previous, node, date) {
  const flight = selectedFlightFor(previous.city, node.city, date);
  const blocks = [
    { time: clockRange(flight.depart, flight.arrive), text: `${flight.id}：${CITIES[previous.city].airport} T1 → ${CITIES[node.city].airport} T1，飞行 ${flight.duration}。` }
  ];
  if (node.city === "danang") return [...blocks,
    { time: "20:35–21:15", text: "DAD T1 落地、取行李，联系 Grab 或酒店接送。" },
    { time: "21:15–22:00", text: "DAD T1 → 美溪海滩一带，约 6–8 km、15–25 分钟；余量用于等车和入住。酒店未定，暂按这个区域估算。" },
    { time: "22:00–23:00", text: "酒店附近吃晚饭；若不饿就直接休息，今晚不去会安。" }
  ];
  return [...blocks,
    { time: "19:15–20:00", text: "金兰 CXR T1 落地、取行李，与司机碰面。" },
    { time: "20:00–21:15", text: "CXR T1 → 芽庄陈富海滩一带，约 35–40 km、45–60 分钟；办理入住。10 月 3–5 日市区酒店未定，10 月 5 日再去 Fusion Resort。" },
    { time: "21:15–22:15", text: "酒店附近晚饭，之后休息；今天不安排泥浴或景点。" }
  ];
}

function transferFoodForNode() {
  return "";
}

function arrivalFoodForNode() {
  return "";
}

function returnDayBlocks() {
  return [
    { time: "09:30–10:30", text: "起床、早餐，最后在度假村海滩或泳池停留。" },
    { time: "10:30–11:30", text: "回房间收拾行李；提前确认酒店送机。" },
    { time: "11:30–12:00", text: "办理退房，行李交给接送车。" },
    { time: "12:00–12:20", text: "Fusion Resort → 金兰 CXR T1，约 5–6 km，通常 10–15 分钟；14:05 国内航班按提前 1.5 小时到机场。" },
    { time: "14:05–15:55", text: "VJ772：CXR T1 → HAN T1；抵达后先取行李。" },
    { time: "15:55–16:45", text: "HAN T1 → T2：取行李后乘免费接驳，争取16:45前到T2。两班间隔2小时50分，取行李与换航站楼仅留50分钟；前段延误或行李慢时，立即联系东航确认值机截止时间。" },
    { time: "16:45–18:45", text: "HAN T2 办理国际值机、出境和安检，留在候机区等待登机。" },
    { time: "18:45–22:50", text: "MU6014：HAN T2 → 上海浦东 PVG T1。" }
  ];
}

function legacyPlanBlocks(plan) {
  if (plan.blocks) return plan.blocks;
  return [
    { time: "起床后", text: plan.am },
    { time: "下午 / 晚上", text: plan.pm }
  ];
}

function nodeDates() {
  let cursor = middleStartDate();
  const datesById = new Map();
  route.forEach(node => {
    if (node.role === "start") {
      datesById.set(node.id, { start: new Date(ARRIVAL_DATE), end: middleStartDate() });
      return;
    }
    if (node.role === "end") {
      datesById.set(node.id, { start: addDays(HOTEL_CHECKIN_DATE, 2 - node.nights), end: new Date(HOTEL_CHECKOUT_DATE) });
      return;
    }
    const start = new Date(cursor);
    cursor = addDays(cursor, node.nights);
    datesById.set(node.id, { start, end: new Date(cursor) });
  });
  return route.map(node => datesById.get(node.id));
}

function transitionUpdate(callback) {
  // Update controls immediately; a full-page snapshot delays repeated +/- clicks.
  callback();
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
    const dateText = `${transferDate.getMonth() + 1} 月 ${transferDate.getDate()} 日`;
    return (data.startWindow || `${dateText} 中午、下午或晚上起飞均可；按直飞班次选择，退房后可寄存行李，国内航班提前约 1.5 小时到 HAN T1。`)
      .replace(/9 月 27 日/g, dateText)
      .replace(/国内航班提前约 2 小时/g, "国内航班提前约 1.5 小时");
  }
  if (previous?.city === "nhatrang" && transferDate) {
    return `${dateLabel(transferDate)} 约 13:30 从芽庄市区出发，15:00 前后办理入住。`;
  }
  return data.window || genericTransferWindow(data);
}

function renderFlightOptions() { return ""; }

function durationGuide(city, nights) {
  if (city.durationGuide?.[nights]) return city.durationGuide[nights];
  if (nights > city.recommendedNights) return `${nights - 1} 个完整日：核心玩法后加入酒店、咖啡、SPA 或自由觅食，不继续堆景点。`;
  return `${Math.max(0, nights - 1)} 个完整日：优先保留核心体验，抵达和离开日不安排远点。`;
}

function plansForNode(node, index, dates) {
  if (isSkippedNode(node)) return [];
  const city = CITIES[node.city];
  const plans = [];
  const activeNodes = activeRouteNodes();
  const activeIndex = activeNodes.findIndex(item => item.id === node.id);
  const addPlan = (date, tag, blocks, restful = false, theme = "", food = "", kind = "day", mapStops = null) => plans.push({ date: dateLabel(date), tag, blocks, restful, theme, food, kind, mapStops });

  if (node.role === "start") {
    addPlan(dates[index].start, "抵达日", [
      { time: "12:45–14:15", text: "提前 2 小时到上海浦东 PVG T1，办理国际值机、托运、出境和安检。" },
      { time: "14:45–17:45", text: "MU6013：上海浦东 PVG T1 → 河内 HAN T2。" },
      { time: "17:45–18:45", text: "HAN T2 落地、办理入境和取行李；先留一小时，排队较长时顺延晚饭，不追加景点。" },
      { time: "18:45–20:15", text: "HAN T2 → 还剑湖 / 老城区，约30–35 km，Grab通常45–75分钟，晚高峰按90分钟留量；周五步行区禁车，提前向酒店确认下车路口。" },
      { time: "20:15–21:15", text: "办理入住、老城附近晚饭。" },
      { time: "21:15 后", text: "回酒店休息，不再安排景点。" }
    ], false, "轻量", "PVG T1 先解决正餐；抵达河内后在还剑湖 / 老城附近就近吃河粉或 Bánh mì，不为晚餐跨区。");
  } else {
    const previous = activeNodes[activeIndex - 1];
    addPlan(dates[index].start, "抵达日", arrivalBlocksForNode(previous, node, dates[index].start), false, "抵达", arrivalFoodForNode(previous, node));
  }

  for (let offset = 1; offset < node.nights; offset += 1) {
    const cityPlans = city.days;
    const currentDate = addDays(dates[index].start, offset);
    const isResortCheckIn = node.role === "end" && node.city === "nhatrang" && dateKey(currentDate) === dateKey(HOTEL_CHECKIN_DATE);
    const isResortStay = node.role === "end" && node.city === "nhatrang" && currentDate > HOTEL_CHECKIN_DATE && currentDate < HOTEL_CHECKOUT_DATE;
    const plan = isResortCheckIn ? city.resortTransition : isResortStay ? city.resortDay : cityPlans[offset - 1] || city.restDay;
    const restful = !cityPlans[offset - 1] && !isResortCheckIn;
    addPlan(addDays(dates[index].start, offset), restful ? "休息日" : "完整日", legacyPlanBlocks(plan), restful, plan.theme || (restful ? "放松" : "探索"), plan.food, "day", plan.mapStops);
  }

  if (node.role !== "end") {
    const next = activeNodes[activeIndex + 1];
    const transfer = getRouteLeg(node, next);
    addPlan(dates[index].end, "转场日", transferBlocksForNode(node, next, dates[index].end, transfer), false, "移动", transferFoodForNode(node, next), "transfer");
  }

  if (node.role === "end") {
    addPlan(
      HOTEL_CHECKOUT_DATE,
      "返程日",
      returnDayBlocks(),
      true,
      "返程",
      "",
      "return"
    );
  }

  // Explicit stops prevent mentions of excluded/future attractions becoming today's route.
  const arrivalStops = {
    hanoi: [{ id: "hanoi-airport", time: "17:45–18:45" }, { id: "hanoi-hoan-kiem", time: "20:15–21:15" }],
    danang: [{ id: "danang-airport", time: "20:35–21:15" }, { id: "danang-my-khe", time: "21:15–22:00" }],
    nhatrang: [{ id: "nhatrang-airport", time: "19:15–20:00" }, { id: "nhatrang-tran-phu", time: "20:00–21:15" }]
  };
  plans[0].mapStops = arrivalStops[node.city];
  const transferPlan = plans.find(plan => plan.kind === "transfer");
  if (transferPlan) transferPlan.mapStops = node.city === "hanoi"
    ? [{ id: "hanoi-market", time: "13:00–15:30" }, { id: "hanoi-old-quarter", time: "15:30–16:15" }, { id: "hanoi-airport", time: "17:45–19:15" }]
    : [{ id: "danang-my-khe", time: "13:00–15:00" }, { id: "danang-airport", time: "16:30–18:00" }];
  return plans;
}

function render() {
  ensureActiveNode();
  renderRoute();
  renderTimeline();
  setupTimelineSync();
  renderHeroRail();
  renderAnalysis();
  if (activeTool === "map") renderMap();
  if (activeTool === "weather") void loadWeather();
  saveRoute();
  setupReveals();
}

function renderHeroRail() {
  const rail = $("#route-rail");
  const dates = nodeDates();
  const endIndex = route.findIndex(node => node.role === "end");
  const endDates = dates[endIndex];
  $("#start-window").textContent = `${dateLabel(ARRIVAL_DATE)}—${dateLabel(middleStartDate())}`;
  $("#start-window-label").textContent = `河内 ${startNights()} 晚 · 17:45 抵达`;
  $("#middle-window").textContent = `${dateLabel(middleStartDate())}—${dateLabel(endDates.start)}`;
  $("#middle-window-label").textContent = `岘港 5 晚 · 航班已确认`;
  $("#end-window").textContent = `${dateLabel(endDates.start)}—${dateLabel(endDates.end)}`;
  $("#end-window-label").textContent = `芽庄 ${endNights()} 晚 · Fusion 2 晚 · 14:05 飞`;
  rail.style.setProperty("--stop-count", route.length);
  rail.setAttribute("role", "list");
  rail.innerHTML = route.map((node, index) => {
    const city = CITIES[node.city];
    const railName = city.shortName || city.name;
    const period = isSkippedNode(node) ? "0 晚" : compactDateRange(dates[index].start, dates[index].end);
    const active = node.id === activeNodeId;
    return `<span class="rail-stop ${node.role}${isSkippedNode(node) ? " is-skipped" : ""}${node.locked ? " is-locked" : ""}${active ? " is-active" : ""}" role="listitem"><button type="button" data-jump-node="${esc(node.id)}" aria-label="查看${city.name} ${period} 规划"${active ? ' aria-current="step"' : ""}><i aria-hidden="true"></i><b>${railName}<em>${city.airport}</em></b><small>${period}</small></button></span>`;
  }).join("");
}

function renderTimeline() {
  const timeline = $("#trip-timeline");
  if (!timeline) return;
  const dates = nodeDates();
  const entries = route.flatMap((node, index) => plansForNode(node, index, dates).map((plan, planIndex) => ({
    anchor: `${node.id}-${planIndex}`,
    city: CITIES[node.city].name,
    date: plan.date,
    label: plan.tag,
    nodeId: node.id,
    kind: plan.kind
  })));
  const currentAnchor = entries.some(entry => entry.anchor === activePlanAnchor)
    ? activePlanAnchor
    : entries.find(entry => entry.nodeId === activeNodeId)?.anchor;
  activePlanAnchor = currentAnchor || null;
  timeline.innerHTML = entries.map(entry => `<li class="timeline-item${entry.anchor === currentAnchor ? " is-active" : ""}">
    <button type="button" data-timeline-target="${esc(entry.anchor)}" data-timeline-node="${esc(entry.nodeId)}">
      <time>${esc(entry.date)}</time>
      <span>${esc(entry.city)}</span>
      <b>${esc(entry.label)}</b>
    </button>
  </li>`).join("");
}

function alignTimeline() {
  const timeline = $('#trip-timeline');
  const top = timeline.getBoundingClientRect().top;
  timeline.style.height = `${Math.max(0, routeEditor.getBoundingClientRect().bottom - top)}px`;
  $$('[data-timeline-target]', timeline).forEach(button => {
    const target = $(`[data-plan-anchor="${button.dataset.timelineTarget}"]`, routeEditor);
    const visible = target?.closest('details')?.open;
    button.parentElement.hidden = !visible;
    if (visible) button.parentElement.style.top = `${target.querySelector('.day-marker span').getBoundingClientRect().top - top - 4}px`;
  });
  syncReadingPosition();
}

function syncReadingPosition() {
  if (activeTool) return;
  const items = $$('[data-plan-anchor]', routeEditor).filter(item => item.closest('details')?.open);
  const readingLine = Math.min(220, window.innerHeight * .28);
  const current = items.find(item => {
    const rect = item.getBoundingClientRect();
    return rect.top <= readingLine && rect.bottom > readingLine;
  }) || items.find(item => item.getBoundingClientRect().top >= readingLine);
  if (!current) return;
  activePlanAnchor = current.dataset.planAnchor;
  const nodeId = current.closest('.route-node').dataset.id;
  $$('[data-timeline-target]').forEach(button => {
    const selected = button.dataset.timelineTarget === activePlanAnchor;
    button.parentElement.classList.toggle('is-active', selected);
    if (selected) button.setAttribute('aria-current', 'date');
    else button.removeAttribute('aria-current');
  });
  $$('[data-plan-anchor]').forEach(item => item.classList.toggle('is-reading', item === current));
  if (activeNodeId !== nodeId) {
    activeNodeId = nodeId;
    $$('.route-node').forEach(node => node.classList.toggle('is-active', node.dataset.id === nodeId));
    renderHeroRail();
  }
}

function setupTimelineSync() {
  timelineObserver?.disconnect();
  timelineObserver = new ResizeObserver(() => requestAnimationFrame(alignTimeline));
  timelineObserver.observe(routeEditor);
  requestAnimationFrame(alignTimeline);
}

window.addEventListener('scroll', () => {
  if (timelineFrame) return;
  timelineFrame = requestAnimationFrame(() => { timelineFrame = null; syncReadingPosition(); });
}, { passive: true });
routeEditor.addEventListener('toggle', () => requestAnimationFrame(alignTimeline), true);

function mapNodes() {
  return activeRouteNodes().filter(node => MAP_PLACES[node.city]);
}

function mapPlaceMatches(places, plan) {
  if (Array.isArray(plan.mapStops)) {
    const seen = new Set();
    return plan.mapStops
      .map(stop => ({
        place: places.find(place => place.id === stop.id),
        time: stop.time || ""
      }))
      .filter(stop => stop.place && !seen.has(stop.place.id) && seen.add(stop.place.id));
  }

  const matches = [];
  const seen = new Set();
  const allowContext = ["抵达日", "转场日", "返程日"].includes(plan.tag);
  (plan.blocks || []).forEach(block => {
    const text = String(block.text || "");
    const found = places
      .map(place => {
        if (!allowContext && place.kind === "context") return null;
        const positions = place.terms.map(term => text.indexOf(term)).filter(position => position >= 0);
        return positions.length ? { place, position: Math.min(...positions) } : null;
      })
      .filter(Boolean)
      .sort((first, second) => first.position - second.position);
    found.forEach(({ place }) => {
      if (!seen.has(place.id)) {
        seen.add(place.id);
        matches.push({ place, time: block.time });
      }
    });
  });
  return matches;
}

function mapPlaceForAlternative(places, name) {
  return places.find(place => place.terms.some(term => name.includes(term) || term.includes(name)));
}

function haversineKm(from, to) {
  const earthRadius = 6371;
  const latDelta = (to.lat - from.lat) * Math.PI / 180;
  const lngDelta = (to.lng - from.lng) * Math.PI / 180;
  const fromLat = from.lat * Math.PI / 180;
  const toLat = to.lat * Math.PI / 180;
  const value = Math.sin(latDelta / 2) ** 2 + Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function formatMapDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(km < 10 ? 1 : 0)} km`;
}

function mapLegEstimate(from, to, cityKey) {
  const ids = [from.id, to.id];
  if (ids.includes("hanoi-airport") && ids.some(id => ["hanoi-old-quarter", "hanoi-hoan-kiem", "hanoi-market"].includes(id))) return "Grab / 打车约 45–75 分钟，晚高峰预留 90 分钟";
  if (ids.includes("danang-airport") && ids.includes("danang-my-khe")) return "Grab / 打车约 15–25 分钟";
  if (ids.includes("nhatrang-airport") && ids.includes("nhatrang-tran-phu")) return "Grab / 打车约 45–60 分钟";
  if (ids.includes("nhatrang-airport") && ids.includes("nhatrang-fusion")) return "酒店接送约 10–15 分钟";
  if (ids.includes("nhatrang-fusion") && ids.includes("nhatrang-tran-phu")) return "酒店接送约 45–70 分钟";
  const straightKm = haversineKm(from, to);
  if (!Number.isFinite(straightKm) || straightKm < 0.05) return "就在附近";
  const profiles = {
    hanoi: { roadFactor: 1.3, speed: [24, 34], mode: "Grab / 打车" },
    danang: { roadFactor: 1.24, speed: [27, 40], mode: "Grab / 打车" },
    dalat: { roadFactor: 1.35, speed: [22, 34], mode: "Grab / 打车" },
    nhatrang: { roadFactor: 1.28, speed: [25, 38], mode: "Grab / 打车" }
  };
  if (straightKm <= 0.9) {
    const walkMinutes = Math.max(6, Math.round(straightKm * 1.3 / 4.5 * 60));
    return `步行约 ${walkMinutes}–${walkMinutes + 6} 分钟`;
  }
  const profile = profiles[cityKey] || profiles.danang;
  const roadKm = straightKm * profile.roadFactor;
  const low = Math.max(7, Math.round(roadKm / profile.speed[1] * 60) + 3);
  const high = Math.max(low + 5, Math.round(roadKm / profile.speed[0] * 60) + 5);
  return `${profile.mode}约 ${low}–${high} 分钟`;
}

function mapLegMeta(from, to, cityKey) {
  return `直线 ${formatMapDistance(haversineKm(from, to))} · 估算${mapLegEstimate(from, to, cityKey)}`;
}

function collectOtherDayStops(planSequences, currentIndex) {
  if (!mapShowAll) return [];
  return planSequences.flatMap((item, index) => index === currentIndex
    ? []
    : item.sequence.map(stop => ({
      ...stop,
      date: item.plan.date,
      tag: item.plan.tag,
      planIndex: index
    })));
}

function otherDayMeta(stops) {
  const ids = new Set();
  const labels = new Map();
  stops.forEach(stop => {
    ids.add(stop.place.id);
    const existing = labels.get(stop.place.id) || [];
    if (!existing.includes(stop.date)) existing.push(stop.date);
    labels.set(stop.place.id, existing);
  });
  return { ids, labels };
}

function renderMapRouteList(sequence) {
  if (!sequence.length) return `<li class="map-empty">这一天以机场、转场或休息为主，未匹配到可定位地点。</li>`;
  return sequence.map((stop, index) => {
    const previous = sequence[index - 1];
    const legMeta = previous
      ? `<div class="map-leg-meta"><span aria-hidden="true"></span><small>${esc(mapLegMeta(previous.place, stop.place, mapCityKey))}</small></div>`
      : "";
    return `<li>${legMeta}<button type="button" data-map-stop-id="${esc(stop.place.id)}" class="${stop.place.id === mapSelectedStopId ? "is-selected" : ""}"><b>${esc(stop.time)}</b><span><i>${String(index + 1).padStart(2, "0")}</i><strong class="map-stop-name">${esc(stop.place.name)}</strong></span><em aria-hidden="true">↗</em></button></li>`;
  }).join("");
}

function refreshMapSize(delay = 0) {
  if (!mapInstance) return;
  const refresh = () => {
    if (mapInstance && document.body.classList.contains("map-tool-open")) {
      mapInstance.invalidateSize({ pan: false });
    }
  };
  if (delay) window.setTimeout(refresh, delay);
  else requestAnimationFrame(refresh);
}

function captureMapView() {
  if (!mapInstance || !mapRenderedCityKey || mapViewState) return;
  const size = mapInstance.getSize();
  if (!size?.x || !size?.y) return;
  const center = mapInstance.getCenter();
  mapViewState = {
    city: mapRenderedCityKey,
    center: [center.lat, center.lng],
    zoom: mapInstance.getZoom()
  };
}

function renderMapFallback(places, sequence, viewState = null, otherDayStops = []) {
  const container = $("#trip-map");
  if (!container) return;
  const tileSize = 256;
  const width = Math.max(container.clientWidth, 320);
  const height = Math.max(container.clientHeight, 260);
  const activeIds = new Set(sequence.map(stop => stop.place.id));
  const { ids: otherIds, labels: otherLabels } = otherDayMeta(otherDayStops);
  mapActivePlaceIds = activeIds;
  mapOtherPlaceIds = otherIds;
  const visiblePlaces = places.filter(place => place.kind !== "alternative" || mapShowAlternatives || activeIds.has(place.id) || otherIds.has(place.id));
  const mapPlaces = visiblePlaces.length ? visiblePlaces : places;
  const longitudes = mapPlaces.map(place => place.lng);
  const latitudes = mapPlaces.map(place => place.lat);
  const worldX = (lng, zoom) => ((lng + 180) / 360) * (2 ** zoom) * tileSize;
  const worldY = (lat, zoom) => {
    const safeLat = Math.max(-85.0511, Math.min(85.0511, lat));
    const sin = Math.sin((safeLat * Math.PI) / 180);
    return (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * (2 ** zoom) * tileSize;
  };
  let zoom = 8;
  for (let candidate = 8; candidate <= 16; candidate += 1) {
    const xs = longitudes.map(value => worldX(value, candidate));
    const ys = latitudes.map(value => worldY(value, candidate));
    if (Math.max(...xs) - Math.min(...xs) <= width * .78 && Math.max(...ys) - Math.min(...ys) <= height * .78) zoom = candidate;
    else break;
  }
  const centerLng = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
  const centerLat = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
  const originX = worldX(centerLng, zoom) - width / 2;
  const originY = worldY(centerLat, zoom) - height / 2;
  const project = place => [worldX(place.lng, zoom) - originX, worldY(place.lat, zoom) - originY];
  const tileMinX = Math.floor(originX / tileSize);
  const tileMaxX = Math.floor((originX + width) / tileSize);
  const tileMinY = Math.floor(originY / tileSize);
  const tileMaxY = Math.floor((originY + height) / tileSize);
  const tileCount = 2 ** zoom;
  const tileHosts = ["a", "b", "c"];
  const tiles = [];
  for (let x = tileMinX; x <= tileMaxX; x += 1) {
    for (let y = tileMinY; y <= tileMaxY; y += 1) {
      if (y < 0 || y >= tileCount) continue;
      const wrappedX = ((x % tileCount) + tileCount) % tileCount;
      const host = tileHosts[Math.abs(x + y) % tileHosts.length];
      tiles.push(`<img src="https://${host}.tile.openstreetmap.org/${zoom}/${wrappedX}/${y}.png" alt="" aria-hidden="true" loading="eager" style="left:${x * tileSize - originX}px;top:${y * tileSize - originY}px">`);
    }
  }
  mapMarkerRefs = new Map();
  const order = new Map();
  sequence.forEach((stop, index) => { if (!order.has(stop.place.id)) order.set(stop.place.id, index + 1); });
  const routeLines = [];
  if (sequence.length > 1) {
    routeLines.push(`<polyline class="fallback-map-route" points="${sequence.map(stop => project(stop.place).join(",")).join(" ")}"/>`);
  }
  if (mapShowAll) {
    const otherSequences = new Map();
    otherDayStops.forEach(stop => {
      const sequenceForDay = otherSequences.get(stop.planIndex) || [];
      sequenceForDay.push(stop);
      otherSequences.set(stop.planIndex, sequenceForDay);
    });
    otherSequences.forEach(daySequence => {
      if (daySequence.length > 1) routeLines.push(`<polyline class="fallback-map-route is-other-day" points="${daySequence.map(stop => project(stop.place).join(",")).join(" ")}"/>`);
    });
  }
  const markers = visiblePlaces.map(place => {
    const [x, y] = project(place);
    const active = activeIds.has(place.id);
    const other = !active && otherIds.has(place.id);
    const airport = place.kind === "context" && /机场/.test(place.name);
    const label = active || other || airport || (mapShowAlternatives && place.kind === "alternative")
      ? `<text x="${x + 8}" y="${y + 4}">${order.has(place.id) ? `${order.get(place.id)} · ` : other ? `${otherLabels.get(place.id).join("/")} · ` : ""}${esc(place.name)}</text>`
      : "";
    return `<g class="fallback-map-marker ${active ? "is-active" : other ? "is-other-day" : airport ? "is-airport" : place.kind === "alternative" ? "is-alternative" : ""}" data-map-fallback-place="${esc(place.id)}" tabindex="0" role="button" aria-label="${esc(place.name)}"><circle cx="${x}" cy="${y}" r="${active ? 7 : other ? 5 : airport ? 6 : place.kind === "alternative" ? 5 : 4}"/>${label}<title>${esc(order.has(place.id) ? `${order.get(place.id)} · ` : other ? `${otherLabels.get(place.id).join("/")} · ` : "")}${esc(place.name)}</title></g>`;
  }).join("");
  container.innerHTML = `<div class="tile-map-fallback" role="img" aria-label="基于 OpenStreetMap 的景点分布地图"><div class="tile-map-tiles">${tiles.join("")}</div><svg class="fallback-map-overlay" viewBox="0 0 ${width} ${height}" aria-hidden="true">${routeLines.join("")}${markers}</svg><span class="map-live-badge">LIVE MAP · OSM</span></div><p class="map-fallback-note">OpenStreetMap 瓦片 · 当前为简化加载模式</p>`;
}

function renderLeafletMap(places, sequence, viewState = null, otherDayStops = []) {
  const activeIds = new Set(sequence.map(stop => stop.place.id));
  const { ids: otherIds, labels: otherLabels } = otherDayMeta(otherDayStops);
  mapActivePlaceIds = activeIds;
  mapOtherPlaceIds = otherIds;
  mapMarkerRefs = new Map();
  const order = new Map();
  sequence.forEach((stop, index) => { if (!order.has(stop.place.id)) order.set(stop.place.id, index + 1); });
  mapMarkerLayer.clearLayers();
  mapRouteLayer.clearLayers();
  places.forEach(place => {
    const active = activeIds.has(place.id);
    const other = !active && otherIds.has(place.id);
    const airport = place.kind === "context" && /机场/.test(place.name);
    if (place.kind === "alternative" && !mapShowAlternatives && !active && !other) return;
    const marker = L.circleMarker([place.lat, place.lng], {
      radius: active ? 8 : other ? 6 : airport ? 6 : place.kind === "alternative" ? 7 : 4,
      color: active ? "#f36f59" : other ? "#5f9a9c" : airport ? "#d4b376" : place.kind === "alternative" ? "#b9904b" : "#427c6c",
      weight: active ? 3 : other ? 2 : airport ? 2.5 : place.kind === "alternative" ? 2 : 1.5,
      fillColor: active ? "#f36f59" : other ? "#afd0c7" : airport ? "#f0d38c" : place.kind === "alternative" ? "#e8cb84" : "#9ac9b9",
      fillOpacity: active ? .96 : other ? .7 : airport ? .95 : place.kind === "alternative" ? .9 : .62
    }).addTo(mapMarkerLayer);
    mapMarkerRefs.set(place.id, marker);
    marker.__mapPlace = place;
    marker.on("click", () => selectMapPlace(place.id, true));
    marker.bindTooltip(`${order.has(place.id) ? `${order.get(place.id)} · ` : other ? `${otherLabels.get(place.id).join("/")} · ` : ""}${place.name}`, {
      permanent: airport || active || (place.kind === "alternative" && mapShowAlternatives),
      direction: "top",
      offset: [0, -7],
      className: airport ? "map-tooltip is-airport" : active ? "map-tooltip is-route" : other ? "map-tooltip is-other-day" : place.kind === "alternative" ? "map-tooltip is-alternative" : "map-tooltip"
    });
  });
  if (sequence.length > 1) {
    L.polyline(sequence.map(stop => [stop.place.lat, stop.place.lng]), {
      color: "#f36f59",
      weight: 3,
      opacity: .86,
      dashArray: "7 6",
      lineCap: "round",
      lineJoin: "round"
    }).addTo(mapRouteLayer);
  }
  if (mapShowAll) {
    const otherSequences = new Map();
    otherDayStops.forEach(stop => {
      const sequenceForDay = otherSequences.get(stop.planIndex) || [];
      sequenceForDay.push(stop);
      otherSequences.set(stop.planIndex, sequenceForDay);
    });
    otherSequences.forEach(daySequence => {
      if (daySequence.length > 1) {
        L.polyline(daySequence.map(stop => [stop.place.lat, stop.place.lng]), {
          color: "#5f9a9c",
          weight: 2,
          opacity: .46,
          dashArray: "3 7",
          lineCap: "round",
          lineJoin: "round"
        }).addTo(mapRouteLayer);
      }
    });
  }
  if (viewState) {
    mapInstance.setView(viewState.center, viewState.zoom, { animate: false });
  } else {
    const visiblePlaces = places.filter(place => place.kind !== "alternative" || mapShowAlternatives || activeIds.has(place.id) || otherIds.has(place.id));
    const boundsPlaces = visiblePlaces.length ? visiblePlaces : places;
    const bounds = L.latLngBounds(boundsPlaces.map(place => [place.lat, place.lng]));
    mapInstance.fitBounds(bounds, { padding: [48, 48], maxZoom: 14, animate: false });
  }
  refreshMapSize();
  refreshMapSize(450);
}

function selectMapPlace(placeId, center = false) {
  const place = MAP_PLACES[mapCityKey]?.find(item => item.id === placeId);
  if (!place) return;
  const fallbackExists = $$(".fallback-map-marker").some(item => item.dataset.mapFallbackPlace === placeId);
  mapSelectedStopId = mapActivePlaceIds.has(placeId) || mapOtherPlaceIds.has(placeId) || mapMarkerRefs.has(placeId) || fallbackExists ? placeId : null;
  $$("[data-map-stop-id]").forEach(button => {
    const active = button.dataset.mapStopId === mapSelectedStopId;
    button.classList.toggle("is-selected", active);
    if (active) button.setAttribute("aria-current", "location");
    else button.removeAttribute("aria-current");
  });
  mapMarkerRefs.forEach((marker, id) => {
    const active = mapActivePlaceIds.has(id);
    const other = mapOtherPlaceIds.has(id) && !active;
    const selected = id === mapSelectedStopId;
    const airport = marker.__mapPlace?.kind === "context" && /机场/.test(marker.__mapPlace.name);
    marker.setStyle({
      radius: selected ? 11 : active ? 8 : other ? 6 : airport ? 6 : marker.__mapPlace?.kind === "alternative" ? 5 : 4,
      weight: selected ? 4 : active ? 3 : other ? 2 : airport ? 2.5 : 1.5,
      color: selected ? "#fffaf0" : active ? "#f36f59" : other ? "#5f9a9c" : airport ? "#d4b376" : marker.__mapPlace?.kind === "alternative" ? "#b9904b" : "#427c6c",
      fillColor: selected ? "#f36f59" : active ? "#f36f59" : other ? "#afd0c7" : airport ? "#f0d38c" : marker.__mapPlace?.kind === "alternative" ? "#d4b376" : "#9ac9b9",
      fillOpacity: selected ? 1 : active ? .96 : other ? .7 : airport ? .95 : marker.__mapPlace?.kind === "alternative" ? .48 : .62
    });
  });
  $$('[data-map-fallback-place]').forEach(marker => {
    marker.classList.toggle("is-selected", marker.dataset.mapFallbackPlace === mapSelectedStopId);
  });
  if (center && mapInstance) {
    mapInstance.flyTo([place.lat, place.lng], Math.max(mapInstance.getZoom(), 13), { duration: .45 });
    mapMarkerRefs.get(placeId)?.openTooltip();
  }
}

function flashMapPlace(placeId) {
  const marker = mapMarkerRefs.get(placeId);
  const fallback = $$(".fallback-map-marker").find(item => item.dataset.mapFallbackPlace === placeId);
  const element = marker?.getElement?.() || fallback;
  if (!element) return;
  element.classList.add("is-flashing");
  window.setTimeout(() => element.classList.remove("is-flashing"), 1050);
}

function focusPlaceInMap(context) {
  const place = MAP_PLACES[context.cityKey]?.find(item => item.id === context.placeId);
  if (!place) return;
  if (place.kind === "alternative") mapShowAlternatives = true;
  pendingMapFocus = context;
  openTool("map");
  const focus = () => {
    if (mapInstance) {
      mapInstance.flyTo([place.lat, place.lng], Math.max(mapInstance.getZoom(), 15), { duration: .55 });
      mapMarkerRefs.get(place.id)?.openTooltip();
    }
    selectMapPlace(place.id);
    flashMapPlace(place.id);
  };
  requestAnimationFrame(() => {
    focus();
    window.setTimeout(focus, 280);
  });
}

function renderMap() {
  const mapPanel = $("[data-tool-panel='map']");
  if (!mapPanel || mapPanel.hidden) return;
  const nodes = mapNodes();
  if (!nodes.length) return;
  captureMapView();
  const selectedNode = nodes.find(node => node.city === mapCityKey) || nodes[0];
  mapCityKey = selectedNode.city;
  const nodeIndex = route.findIndex(node => node.id === selectedNode.id);
  const dates = nodeDates();
  const plans = plansForNode(selectedNode, nodeIndex, dates);
  if (!plans[mapPlanIndex]) mapPlanIndex = 0;
  const plan = plans[mapPlanIndex];
  const places = MAP_PLACES[selectedNode.city];
  const city = CITIES[selectedNode.city];
  const showAllInput = $("#map-show-all");
  if (showAllInput) showAllInput.checked = mapShowAll;
  const viewState = mapViewState?.city === selectedNode.city ? mapViewState : null;
  const planSequences = plans.map(item => ({ plan: item, sequence: mapPlaceMatches(places, item) }));
  const sequence = planSequences[mapPlanIndex].sequence;
  const otherDayStops = collectOtherDayStops(planSequences, mapPlanIndex);
  if (!places.some(place => place.id === mapSelectedStopId)) mapSelectedStopId = null;

  $("#map-city-tabs").innerHTML = nodes.map(node => {
    const nodeDate = dates[route.findIndex(item => item.id === node.id)];
    return `<button type="button" role="tab" aria-selected="${String(node.city === mapCityKey)}" data-map-city="${esc(node.city)}"><strong>${esc(CITIES[node.city].name)}</strong><small>${dateLabel(nodeDate.start)}—${dateLabel(nodeDate.end)} · ${node.nights} 晚</small></button>`;
  }).join("");
  $("#map-day-tabs").innerHTML = plans.map((item, index) => `<button type="button" role="tab" aria-selected="${String(index === mapPlanIndex)}" data-map-plan-index="${index}"><time>${esc(item.date)}</time><span>${esc(item.tag)} · ${planSequences[index].sequence.length} 站</span></button>`).join("");
  $("#map-selection").innerHTML = "";
  requestAnimationFrame(() => {
    ["#map-city-tabs", "#map-day-tabs"].forEach(selector => {
      const rail = $(selector);
      const selected = rail.querySelector('[aria-selected="true"]');
      if (!selected) return;
      const box = selected.getBoundingClientRect();
      const bounds = rail.getBoundingClientRect();
      if (box.left < bounds.left || box.right > bounds.right) {
        rail.scrollLeft += box.left - bounds.left - (bounds.width - box.width) / 2;
      }
    });
  });
  $("#map-route-list").innerHTML = renderMapRouteList(sequence);
  const alternatives = availableAlternatives(city, plans);
  $("#map-alternatives").innerHTML = alternatives.length
    ? `<div class="map-alternatives-head"><h3>备选景点</h3><label class="map-alternatives-toggle${mapShowAlternatives ? " is-on" : ""}"><input id="map-show-alternatives" type="checkbox" aria-label="在地图上显示备选景点" ${mapShowAlternatives ? "checked" : ""}><span>显示在地图</span></label></div><ul>${alternatives.map(item => {
      const place = mapPlaceForAlternative(places, item.name);
      return `<li>${place ? `<button type="button" data-map-focus="${esc(place.id)}">${esc(item.name)} <em aria-hidden="true">↗</em></button>` : `<strong>${esc(item.name)}</strong>`}<span>${esc(item.note)}</span></li>`;
    }).join("")}</ul>`
    : "";

  if (window.L) {
    const container = $("#trip-map");
    if (!mapInstance) {
      container.innerHTML = "";
      mapInstance = L.map(container, { zoomControl: false, scrollWheelZoom: true, attributionControl: true });
      L.control.zoom({ position: "bottomright" }).addTo(mapInstance);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        detectRetina: true,
        noWrap: true,
        crossOrigin: true,
        attribution: "© OpenStreetMap contributors"
      }).addTo(mapInstance);
      mapMarkerLayer = L.layerGroup().addTo(mapInstance);
      mapRouteLayer = L.layerGroup().addTo(mapInstance);
      L.control.scale({ imperial: false, position: "bottomleft" }).addTo(mapInstance);
      container.insertAdjacentHTML("beforeend", `<span class="map-live-badge">LIVE MAP · OSM</span>`);
      if ("ResizeObserver" in window) {
        mapResizeObserver = new ResizeObserver(() => refreshMapSize());
        mapResizeObserver.observe(container);
      }
    }
    renderLeafletMap(places, sequence, viewState, otherDayStops);
  } else {
    renderMapFallback(places, sequence, viewState, otherDayStops);
  }
  mapRenderedCityKey = selectedNode.city;
  mapViewState = null;
  if (mapSelectedStopId) selectMapPlace(mapSelectedStopId);
}

window.addEventListener("resize", () => {
  if (activeTool === "map") refreshMapSize(80);
});

function activateNode(id, planAnchor = null) {
  if (!route.some(node => node.id === id)) return;
  transitionUpdate(() => {
    activeNodeId = id;
    activePlanAnchor = planAnchor;
    renderRoute();
    renderTimeline();
    setupTimelineSync();
    renderHeroRail();
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    const target = planAnchor ? routeEditor.querySelector(`[data-plan-anchor="${planAnchor}"]`) : routeEditor.querySelector(".route-node.is-active");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    if (!planAnchor && rect.top >= 12 && rect.top <= window.innerHeight * .5) return;
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: planAnchor ? "center" : "start"
    });
  }));
}

$(".planner-hero").addEventListener("click", event => {
  const button = event.target.closest("button[data-jump-node]");
  if (!button) return;
  activateNode(button.dataset.jumpNode);
});

$("#trip-timeline").addEventListener("click", event => {
  const button = event.target.closest("button[data-timeline-target]");
  if (!button) return;
  expandedNodeIds.add(button.dataset.timelineNode);
  activateNode(button.dataset.timelineNode, button.dataset.timelineTarget);
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

function weekdayLabel(date) {
  const [month, day] = date.split(".").map(Number);
  return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][new Date(2026, month - 1, day).getDay()];
}

function renderRoute() {
  const openNodeIds = new Set($$(".route-node details[open]", routeEditor).map(details => details.closest(".route-node")?.dataset.id));
  openNodeIds.forEach(id => expandedNodeIds.add(id));
  const dates = nodeDates();

  routeEditor.innerHTML = route.map((node, index) => {
    const city = CITIES[node.city];
    if (isSkippedNode(node)) {
      const active = node.id === activeNodeId;
      return `<li class="route-node is-compact is-skipped ${active ? "is-active" : ""}" data-id="${esc(node.id)}" data-select-node="true" tabindex="0" aria-label="${esc(city.name)}，0 晚">
        <div class="node-main">
          <span class="node-number">${String(index + 1).padStart(2, "0")}</span>
          <div class="node-city"><strong class="compact-city-name">${esc(city.name)}</strong></div>
          <div class="node-side"><button type="button" class="compact-night-count compact-restore" data-action="increase" aria-label="恢复${esc(city.name)}规划"><strong>0</strong> 晚 <i aria-hidden="true">＋</i></button></div>
        </div>
      </li>`;
    }
    const adjustable = canAdjustNights(node);
    const periodLabel = node.role === "start"
      ? `${dateLabel(ARRIVAL_DATE)} 17:45 抵达 · 09.28 19:15 飞岘港`
      : node.role === "end"
        ? `${dateLabel(dates[index].start)} 抵达 · 10.05 15:00 度假村入住 · 10.07 12:00 退房`
        : `09.28 20:35 抵达 · 10.03 18:00 飞芽庄`;
    const roleLabel = node.role === "start" ? "已确认" : node.role === "end" ? "已确认 · 芽庄" : "";
    const plans = plansForNode(node, index, dates);
    const lastDayPlanIndex = plans.reduce((lastIndex, plan, planIndex) => {
      const isResortPlan = node.role === "end" && node.city === "nhatrang" && /金兰湾|Fusion/.test(plan.theme);
      return plan.kind === "day" && !isResortPlan ? planIndex : lastIndex;
    }, -1);
    const dayPlanHtml = plans.map((plan, planIndex) => {
      const planAnchor = `${node.id}-${planIndex}`;
      const planContext = { cityKey: node.city, planIndex, anchor: planAnchor };
      const next = activeRouteNodes()[activeRouteNodes().findIndex(item => item.id === node.id) + 1];
      const flights = plan.kind === 'transfer' && next
        ? renderFlightOptions(node.city, next.city, dates[index].end) : '';
      return `<li class="${plan.restful ? "restful" : ""}" data-plan-anchor="${esc(planAnchor)}">
        <div class="day-marker"><span>${plan.date}</span><small>${weekdayLabel(plan.date)} · ${esc(plan.tag)}</small><button type="button" class="day-map-button" data-plan-map-city="${esc(node.city)}" data-plan-map-index="${planIndex}" aria-label="在地图查看${esc(city.name)}${plan.date}行程">地图 <i aria-hidden="true">↗</i></button></div>
        <div class="halfday-copy">${flights}${renderTimeBlocks(plan.blocks, planContext)}${renderDayFood(plan.food, planContext)}${planIndex === lastDayPlanIndex ? renderAlternatives(city, node, plans) : ""}</div>
      </li>`;
    }).join("");

    const active = node.id === activeNodeId;
    const compactPeriod = compactDateRange(dates[index].start, dates[index].end);
    return `<li class="route-node ${active ? "is-active" : ""}${node.locked ? " is-locked" : ""}" style="view-transition-name: route-${esc(node.id)}" data-id="${esc(node.id)}" aria-label="${city.name}，${compactPeriod}">
      <div class="node-main">
        <span class="node-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="node-city">
          ${roleLabel ? `<span class="node-anchor">${roleLabel}</span>` : ""}
          <strong class="compact-city-name">${city.name}</strong>
          <span class="compact-period">${compactPeriod}</span>
          <strong class="fixed-city">${city.name}</strong>
          <span class="city-meta">${city.local} · ${city.airport} · ${city.region}</span>
        </div>
        <div class="node-info">
          <div class="node-schedule-row">
            <span class="node-period">${periodLabel}</span>
            ${adjustable ? `<div class="night-stepper">
              <button type="button" data-action="decrease" aria-label="减少${city.name}住宿晚数"${node.nights <= city.minNights ? " disabled" : ""}>−</button>
              <span class="night-count"><strong>${node.nights}</strong><span>晚</span></span>
              <button type="button" data-action="increase" aria-label="增加${city.name}住宿晚数"${node.nights >= city.maxNights ? " disabled" : ""}>＋</button>
            </div>` : ""}
          </div>
          <p class="node-summary">${esc(city.summary)}</p>
        </div>
      </div>
      <details class="city-detail"${expandedNodeIds.has(node.id) ? " open" : ""}>
        <summary><span>规划</span><i aria-hidden="true">＋</i></summary>
        <div class="city-detail-body${city.image ? " has-image" : ""}">
          <div class="detail-copy">
            <ol class="day-plan">${dayPlanHtml}</ol>
          </div>
          ${city.image ? `<figure class="city-figure"><a href="${city.image.src}" target="_blank" rel="noopener"><img src="${city.image.src}" alt="${city.image.alt}" loading="lazy"></a><figcaption>${city.image.caption} · 点击看原图</figcaption></figure>` : ""}
        </div>
      </details>
    </li>`;
  }).join("");

  $("#route-title").textContent = `${activeRouteNodes().map(node => CITIES[node.city].name).concat("河内").join(" → ")}`;
}

function routeTotals() {
  const activeNodes = activeRouteNodes();
  const middleNights = activeNodes.filter(node => node.role === "middle").reduce((sum, node) => sum + node.nights, 0);
  const plannedDays = route.reduce((sum, node) => sum + node.nights, 0) + 1;
  const cityBudget = route.reduce((sum, node) => {
    const budget = budgetForNode(node);
    return [sum[0] + budget[0], sum[1] + budget[1]];
  }, [0, 0]);
  const legs = activeNodes.slice(0, -1).map((node, index) => getRouteLeg(node, activeNodes[index + 1]));
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
  $("#transfer-count").textContent = `${activeRouteNodes().length - 1} 次 + 返程`;
  $("#transport-hours").textContent = `约 ${Math.round(totals.hours[0] * 10) / 10}–${Math.round(totals.hours[1] * 10) / 10}h`;

  const advice = [];
  if (dayBalance > 0) advice.push(`天数还差 ${dayBalance} 天，请增加一段可调整住宿的晚数。`);
  if (dayBalance < 0) advice.push(`天数超出 ${Math.abs(dayBalance)} 天，请减少一段可调整住宿的晚数。`);
  route.filter(node => node.role === "middle").forEach(node => {
    const city = CITIES[node.city];
    if (node.nights < city.minNights) advice.push(`${city.name}少于 ${city.minNights} 晚，天数需要调整。`);
  });
  $("#advice-list").innerHTML = [...new Set(advice)].map(item => `<li>${esc(item.trim())}</li>`).join("");
}

function updateNode(id, updater) {
  const index = route.findIndex(node => node.id === id);
  if (index < 0) return;
  const action = document.activeElement?.dataset.action;
  transitionUpdate(() => {
    updater(index);
    render();
    if (action) {
      const node = routeEditor.querySelector(`[data-id="${id}"]`);
      const control = node?.querySelector(`[data-action="${action}"]:not(:disabled)`)
        || node?.querySelector('[data-action]:not(:disabled)');
      control?.focus({ preventScroll: true });
    }
  });
}

routeEditor.addEventListener("click", event => {
  const mapButton = event.target.closest("[data-plan-map-city]");
  if (mapButton) {
    pendingMapFocus = { cityKey: mapButton.dataset.planMapCity, planIndex: Number(mapButton.dataset.planMapIndex) };
    openTool("map", mapButton);
    return;
  }
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

document.addEventListener("click", event => {
  const choice = event.target.closest("[data-flight-choice]");
  if (!choice) return;
  const key = `${legKey(choice.dataset.flightOrigin, choice.dataset.flightDestination)}@${choice.dataset.flightDate}`;
  flightChoices[key] = choice.dataset.flightChoice;
  saveFlightChoices();
  render();
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

function openTool(name, trigger = null) {
  closePlaceMenu();
  const wasOpen = document.body.classList.contains("drawer-open");
  if (trigger && !trigger.closest(".drawer-tool-nav")) lastToolTrigger = trigger;
  activeTool = name;
  const titles = { weather: "路线天气", exchange: "汇率换算", phrases: "越南常用语", map: "路线地图", flights: "机票与酒店" };
  $("#drawer-title").textContent = titles[name];
  $$('[data-tool-panel]').forEach(panel => { panel.hidden = panel.dataset.toolPanel !== name; });
  $$("[data-tool]").forEach(button => button.setAttribute("aria-expanded", String(button.dataset.tool === name)));
  document.body.classList.add("drawer-open");
  document.body.classList.toggle("map-tool-open", name === "map");
  $("#tool-drawer").setAttribute("aria-hidden", "false");
  $("#tool-drawer").inert = false;
  $('main').inert = true;
  $('.appbar').inert = true;
  $('.footer').inert = true;
  if (name === "weather") void loadWeather();
  if (name === "exchange") updateExchange();
  if (name === "phrases") renderPhrases();
  if (name === "map") {
    const focus = pendingMapFocus;
    mapCityKey = focus?.cityKey || activeRouteNodes().find(node => node.id === activeNodeId && MAP_PLACES[node.city])?.city || mapCityKey;
    const readingDay = activePlanAnchor ? Number(activePlanAnchor.split('-').at(-1)) : 0;
    mapPlanIndex = Number.isInteger(focus?.planIndex) && focus.planIndex >= 0 ? focus.planIndex : readingDay;
    mapSelectedStopId = focus?.placeId || null;
    mapViewState = null;
    mapRenderedCityKey = null;
    renderMap();
    pendingMapFocus = null;
  }
  if (!wasOpen) requestAnimationFrame(() => $("#close-drawer")?.focus({ preventScroll: true }));
}

function closeTool() {
  const trigger = lastToolTrigger;
  lastToolTrigger = null;
  activeTool = null;
  document.body.classList.remove("drawer-open");
  document.body.classList.remove("map-tool-open");
  $("#tool-drawer").setAttribute("aria-hidden", "true");
  $("#tool-drawer").inert = true;
  $('main').inert = false;
  $('.appbar').inert = false;
  $('.footer').inert = false;
  $$("[data-tool]").forEach(button => button.setAttribute("aria-expanded", "false"));
  if (trigger?.isConnected) requestAnimationFrame(() => trigger.focus({ preventScroll: true }));
}

$$(`[data-tool]`).forEach(button => button.addEventListener("click", () => {
  if (activeTool === button.dataset.tool && document.body.classList.contains("drawer-open")) closeTool();
  else openTool(button.dataset.tool, button);
}));
$("#close-drawer").addEventListener("click", closeTool);
$("#drawer-backdrop").addEventListener("click", closeTool);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && placeMenuContext) {
    const trigger = placeMenuContext.trigger;
    closePlaceMenu();
    trigger?.focus({ preventScroll: true });
  } else if (event.key === 'Escape' && activeTool) closeTool();
  if (event.key !== 'Tab') return;
  const surface = placeMenuContext ? $('#place-action-menu') : activeTool ? $('#tool-drawer') : null;
  if (!surface) return;
  const focusable = $$('button, a[href], input, [tabindex="0"]', surface).filter(el => !el.disabled && el.getClientRects().length);
  const first = focusable[0], last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
});

$("#map-city-tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-map-city]");
  if (!button) return;
  mapCityKey = button.dataset.mapCity;
  mapPlanIndex = 0;
  mapSelectedStopId = null;
  renderMap();
});

$("#map-day-tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-map-plan-index]");
  if (!button) return;
  mapPlanIndex = Number(button.dataset.mapPlanIndex);
  mapSelectedStopId = null;
  renderMap();
});

$("#map-show-all").addEventListener("change", event => {
  mapShowAll = event.target.checked;
  renderMap();
});

$("#map-alternatives").addEventListener("change", event => {
  const input = event.target.closest("#map-show-alternatives");
  if (!input) return;
  mapShowAlternatives = input.checked;
  renderMap();
});

$("#map-route-list").addEventListener("click", event => {
  const button = event.target.closest("[data-map-stop-id]");
  if (!button) return;
  selectMapPlace(button.dataset.mapStopId, true);
});

$("#trip-map").addEventListener("click", event => {
  const marker = event.target.closest("[data-map-fallback-place]");
  if (!marker) return;
  selectMapPlace(marker.dataset.mapFallbackPlace);
});

$("#trip-map").addEventListener("keydown", event => {
  if (!['Enter', ' '].includes(event.key)) return;
  const marker = event.target.closest("[data-map-fallback-place]");
  if (!marker) return;
  event.preventDefault();
  selectMapPlace(marker.dataset.mapFallbackPlace);
});

$("#map-alternatives").addEventListener("click", event => {
  const button = event.target.closest("[data-map-focus]");
  if (!button) return;
  const place = MAP_PLACES[mapCityKey]?.find(item => item.id === button.dataset.mapFocus);
  if (place) {
    if (!mapShowAlternatives) {
      mapShowAlternatives = true;
      renderMap();
    }
    mapSelectedStopId = null;
    if (mapInstance) {
      mapInstance.flyTo([place.lat, place.lng], Math.max(mapInstance.getZoom(), 13), { duration: .45 });
      mapMarkerRefs.get(place.id)?.openTooltip();
    }
  }
});

function uniqueRouteCities() {
  return [...new Set(activeRouteNodes().map(node => node.city))];
}

function renderWeatherPlaceholder(message = "正在读取…") {
  $("#weather-list").innerHTML = uniqueRouteCities().map(key => `<div class="weather-row" data-weather-city="${key}"><span class="weather-city"><b>${CITIES[key].name}</b><small>${CITIES[key].local} · ${CITIES[key].region}</small></span><strong class="weather-value">${message}</strong></div>`).join("");
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
      if (requestId === weatherRequestId && row) row.querySelector(".weather-value").textContent = `${weatherDescription(data.current.weather_code)} · ${Math.round(data.current.temperature_2m)}°C · 体感 ${Math.round(data.current.apparent_temperature)}°C`;
    } catch {
      if (requestId === weatherRequestId && row) row.querySelector(".weather-value").textContent = "暂时读取失败";
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
  if (event.target.closest("[data-flight-choice]")) return;
  const copyable = event.target.closest("[data-copy-text]");
  if (copyable) copyText(copyable.dataset.copyText, copyable);
});

document.addEventListener("keydown", event => {
  const placeTrigger = event.target.closest("[data-place-id]");
  if (placeTrigger && ["Enter", " "].includes(event.key)) {
    event.preventDefault();
    openPlaceMenu(placeTrigger);
    return;
  }
  const copyable = event.target.closest('[data-copy-text][role="button"]');
  if (!copyable || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  copyText(copyable.dataset.copyText, copyable);
});

function renderPhrases() {
  $("#phrase-tabs").innerHTML = Object.keys(PHRASES).map(category => `<button type="button" role="tab" data-phrase-category="${category}" class="${category === activePhraseCategory ? "active" : ""}" aria-selected="${category === activePhraseCategory}">${category}</button>`).join("");
  $("#phrase-list").classList.toggle("is-words", activePhraseCategory === "高频词");
  $("#phrase-list").innerHTML = PHRASES[activePhraseCategory].map(([vietnamese, chinese, pronunciation]) => {
    const reading = PHRASE_READINGS[vietnamese] || pronunciation;
    return `<button class="phrase-row" type="button" title="复制越南语" data-copy-text="${esc(vietnamese)}"><span class="phrase-main"><b>${esc(chinese)}</b><i>·</i><strong lang="vi">${esc(vietnamese)}</strong></span><small><span>读法 · ${esc(reading)}</span></small></button>`;
  }).join("");
}

function closePlaceMenu() {
  const menu = $("#place-action-menu");
  if (!menu) return;
  menu.hidden = true;
  menu.setAttribute("aria-hidden", "true");
  placeMenuContext = null;
}

function openPlaceMenu(trigger) {
  const menu = $("#place-action-menu");
  if (!menu) return;
  placeMenuContext = {
    trigger,
    placeId: trigger.dataset.placeId,
    name: trigger.dataset.placeName || trigger.textContent.trim(),
    source: trigger.dataset.placeSource || trigger.textContent.trim(),
    cityKey: trigger.dataset.placeCity,
    planIndex: Number.parseInt(trigger.dataset.placePlanIndex, 10),
    anchor: trigger.dataset.placeAnchor || ""
  };
  menu.hidden = false;
  menu.setAttribute("aria-hidden", "false");
  const rect = trigger.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const left = Math.min(Math.max(12, rect.left), window.innerWidth - menuRect.width - 12);
  const below = rect.bottom + menuRect.height + 12 <= window.innerHeight;
  const top = below ? rect.bottom + 10 : Math.max(12, rect.top - menuRect.height - 10);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  requestAnimationFrame(() => menu.querySelector("[data-place-action]")?.focus({ preventScroll: true }));
}

document.addEventListener("click", event => {
  const action = event.target.closest("[data-place-action]");
  if (action && $("#place-action-menu")?.contains(action) && placeMenuContext) {
    const context = placeMenuContext;
    const actionName = action.dataset.placeAction;
    closePlaceMenu();
    if (actionName === "map") {
      lastToolTrigger = context.trigger;
      focusPlaceInMap({ cityKey: context.cityKey, planIndex: Number.isFinite(context.planIndex) && context.planIndex >= 0 ? context.planIndex : 0, placeId: context.placeId });
    } else {
      copyText(actionName === "copy-source" ? context.source : context.name);
      context.trigger?.focus({ preventScroll: true });
    }
    return;
  }
  const placeTrigger = event.target.closest("[data-place-id]");
  if (placeTrigger) {
    event.preventDefault();
    openPlaceMenu(placeTrigger);
    return;
  }
  if (!event.target.closest("#place-action-menu")) closePlaceMenu();
});

$("#phrase-tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-phrase-category]");
  if (!button) return;
  activePhraseCategory = button.dataset.phraseCategory;
  renderPhrases();
});
render();

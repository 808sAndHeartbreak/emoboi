# EMOBOI.COM

Personal archive & tools. Gothic / punk / draincore.

## Structure

```text
├── index.html                # 主页
├── boardgames/               # 桌游选择页
│   ├── werewolf/             # 狼人杀发牌与主持人手记
│   └── clocktower/           # 血染钟楼记录与 AI 推理
├── clocktower/               # 旧地址跳转，保留原剧本与文档链接
├── english/                  # 英语 Lexicon
├── shared/                   # 共用 AI 客户端、导航、本地字体和编译样式
├── sf6/                      # SF6 Frame Data Tool
├── gojuon/                   # Japanese Gojūon Learning
├── gallery/                  # Visual Gallery
└── music/                    # Music Player
```

## 桌游

[打开桌游](https://emoboi.com/boardgames/)。主页入口和菜单统一显示“桌游”；选择页提供狼人杀、血染钟楼与静态“其他桌游待开发”。旅行页面保持隐藏，不加入公共导航。

[狼人杀](https://emoboi.com/boardgames/werewolf/)保留标准狼、双身份、自信狼的配置、随机发牌、调配、逐人展示和主持人记录；返回按钮可回到桌游选择页。整合源码在同工作区的 werewolf-integrated/，用户提供的原项目未修改。

[血染钟楼](https://emoboi.com/boardgames/clocktower/)无活动对局时直接打开开局窗口，取消回到桌游页；已有对局继续使用，不自动新建或清空数据。旧 /clocktower/ 保留查询参数和片段跳转到新地址。当前同源路径保证对局、剧本和 API Key 延续使用，不迁移浏览器存储。

钟楼独立HTML仍由 clocktower-notebook/scripts/build-single.cjs 生成。官三及六份常驻剧本、JSON导入导出、玩家线索、独立新分析与增量追问均保留。推理内核见 [观察语义与联合核验](boardgames/clocktower/docs/reasoning-v41.md)、[通用名额约束](boardgames/clocktower/docs/reasoning-v39.md)及[知识路由](boardgames/clocktower/docs/reasoning-v32.md)。

## 个人 AI 设置

英语工具与钟楼均由使用者填写或粘贴 DeepSeek API Key，可选择模型。本机保存的 Key 在同一浏览器、同一域名下共用；模型及思考偏好分别保存。在任一工具修改或清除后，另一工具会同步采用。已保存的旧钟楼 Key 只迁移一次，避免重复输入，不迁移或删除对局。

两者直接请求 https://api.deepseek.com，不默认使用网站账户或英语旧代理。共享客户端只返回配置状态，不向页面展示已保存的原始密钥，不将 Key 写进请求正文、对局、英语历史或导出文件。没有 Key 时不发起付费请求。

workers/deepseek-proxy/ 仅为可选 BYOK 代理源码，已移除站点 Secret 回退。此次 Cloudflare CLI 登录失效，没有重新部署该 Worker 或更改 DNS/CDN；新版页面不调用旧代理。

## 性能与视觉

v0.41补齐观察解析和关键机制输入，在通用名额约束后联合核验身份、技能反馈、误登记和投毒时序；压缩条件结果后交给模型，不按少量样例或分支数量估概率。增加完整身份表及配套机制复核，未通过的报告不标完成。详见 [v0.41](boardgames/docs/release-v41.md)。v0.40报告按钮与精简表达、v0.39名额约束、v0.38格式修复及15分钟总预算继续保留。

当前 v0.36：恢复原站 Syne、Archivo Black、Space Mono、Major Mono 等字体与 E 标志，恢复首页拼贴、反白切片入口、全屏红色菜单。各工具保留自己的字体、配色和交互，不再套用统一哥特字体。精简重复说明，同时保留纸张、印刷错位与悬停响应。

钟楼恢复原正文字体和城镇美术，保留离线打开；字体按应用与角色资料字符做子集，保留400–600可变字重。独立 HTML 为1,818,489字节，比v0.34减少36.8%；字体子集375,228字节，城镇WebP为60,564字节。CSS / JS 按内容生成版本，发布前运行 `node scripts/stamp-assets.cjs`，防止新旧资源混用。

当前视觉入口是 `shared/home-refinement.css`、`shared/home-art.js`、`shared/refinement.css` 和 `boardgames/restored.css`。钟楼源项目使用 `restoration.css`，狼人杀使用原有样式。v0.35的 `shared/edition.css`、`shared/home.css`、`boardgames/hub.css` 和银色哥特美术保留在历史资源中，页面不再引用。

以下为此前资源优化记录：

v0.33 的27张拼贴装饰图使用派生 WebP，总量从3,477,999字节降至411,968字节（减少88.2%），原图保留。v0.36手机保留8张拼贴，桌面选择少量图层浮动与指针视差；可以暂停，并遵循减少动态偏好。取消等待全部资源的遮罩，字体、图标不再依赖第三方运行时。拉丁字体自托管、按需使用并保持 font-display:swap，图标使用小型本地SVG。

桌游选择页为静态HTML/CSS，无额外框架；微动效支持减少动态偏好。狼人杀两张美术资源从656,664字节减至161,908字节。页面保留移动优先布局，兼容平板和桌面。首页菜单改为原生dialog，支持焦点约束和Escape返回。

街霸、五十音、图库、音乐统一站点导航和本地字体/图标；前三者使用本地编译 Tailwind CSS。四个分类脚本独立缓存，提前发现并延迟执行，不等待全部媒体加载。图库31张预览总量从3,790,890字节降至1,298,912字节，减少65.7%，原图按需打开。音乐仅点击播放后加载音视频。指针动态只在桌面操作期间运行，静止、后台与减少动态模式停止。

当前站点托管于GitHub Pages，响应缓存策略由平台控制；没有通过无效的 _headers 文件或HTML标签伪造CDN配置。

## 验证

钟楼349项检查通过，包括140组容量匹配枚举对照、9组独立联合枚举对照及环形旋转/镜像不变性；狼人杀此前11组规则检查及1,600次随机发牌通过；网站整合14项检查通过。此前浏览器验证桌游路由、发牌、英语模拟查询、Key共享及320/390/768/1440布局。本次另验证390px手机下真实请求准备、导出和模拟报告完成。没有新增付费模型评测，也没有读取或修改线上用户的Key、历史对局与词汇记录。

```sh
python -m http.server 8766 --bind 127.0.0.1
node scripts/stamp-assets.cjs
node --test tests/site.test.cjs
```

本轮详情见 [v0.41 发布说明](boardgames/docs/release-v41.md)。历史：[v0.40](boardgames/docs/release-v40.md) · [v0.39](boardgames/docs/release-v39.md) · [v0.37](boardgames/docs/release-v37.md) · [v0.36](boardgames/docs/release-v36.md) · [v0.35](boardgames/docs/release-v35.md) · [v0.34](boardgames/docs/release-v34.md) · [v0.33](boardgames/docs/release-v33.md)。

*Design by 天 · © 2026 emoboi.com*

# EMOBOI.COM

Personal multimedia archive. Drain-core aesthetics.

## Structure

```text
├── index.html                # 主页
├── boardgames/               # 桌游选择页
│   ├── werewolf/             # 狼人杀发牌与主持人手记
│   └── clocktower/           # 血染钟楼记录与 AI 推理
├── clocktower/               # 旧地址跳转，保留原剧本与文档链接
├── english/                  # 英语 Lexicon
├── shared/                   # 共用 AI 客户端、本地字体和小型依赖
├── sf6/                      # SF6 Frame Data Tool
├── gojuon/                   # Japanese Gojūon Learning
├── gallery/                  # Visual Gallery
└── music/                    # Music Player
```

## 桌游

[打开桌游](https://emoboi.com/boardgames/)。主页入口和菜单统一显示“桌游”；选择页提供狼人杀、血染钟楼与静态“其他桌游待开发”。旅行页面保持隐藏，不加入公共导航。

[狼人杀](https://emoboi.com/boardgames/werewolf/)保留标准狼、双身份、自信狼的配置、随机发牌、调配、逐人展示和主持人记录；返回按钮可回到桌游选择页。整合源码在同工作区的 werewolf-integrated/，用户提供的原项目未修改。

[血染钟楼](https://emoboi.com/boardgames/clocktower/)无活动对局时直接打开开局窗口，取消回到桌游页；已有对局继续使用，不自动新建或清空数据。旧 /clocktower/ 保留查询参数和片段跳转到新地址。当前同源路径保证对局、剧本和 API Key 延续使用，不迁移浏览器存储。

钟楼独立HTML仍由 clocktower-notebook/scripts/build-single.cjs 生成。官三及六份常驻剧本、JSON导入导出、玩家线索、独立新分析与增量追问均保留。推理内核见 [架构文档](boardgames/clocktower/docs/reasoning-v32.md)。

## 个人 AI 设置

英语工具与钟楼均由使用者填写或粘贴 DeepSeek API Key，可选择模型。本机保存的 Key 在同一浏览器、同一域名下共用；模型及思考偏好分别保存。在任一工具修改或清除后，另一工具会同步采用。已保存的旧钟楼 Key 只迁移一次，避免重复输入，不迁移或删除对局。

两者直接请求 https://api.deepseek.com，不默认使用网站账户或英语旧代理。共享客户端只返回配置状态，不向页面展示已保存的原始密钥，不将 Key 写进请求正文、对局、英语历史或导出文件。没有 Key 时不发起付费请求。

workers/deepseek-proxy/ 仅为可选 BYOK 代理源码，已移除站点 Secret 回退。此次 Cloudflare CLI 登录失效，没有重新部署该 Worker 或更改 DNS/CDN；新版页面不调用旧代理。

## 性能与视觉

首页保留原拼贴风格，27张装饰图使用派生 WebP，总量从3,477,999字节降至411,968字节（减少88.2%），原图保留。手机减少装饰密度；取消等待全部资源的遮罩，字体、图标不再依赖第三方运行时。拉丁字体自托管、按需使用并保持 font-display:swap，图标使用小型本地SVG。

桌游选择页为静态HTML/CSS，无额外框架；微动效支持减少动态偏好。狼人杀两张美术资源从656,664字节减至161,908字节。页面保留移动优先布局，兼容平板和桌面。首页菜单改为原生dialog，支持焦点约束和Escape返回。

当前站点托管于GitHub Pages，响应缓存策略由平台控制；没有通过无效的 _headers 文件或HTML标签伪造CDN配置。

## 验证

钟楼312项检查通过；狼人杀11组规则检查及1,600次随机发牌通过；网站整合7项检查通过。浏览器验证桌游路由、开局取消、发牌、英语模拟流式查询、Key跨工具共享及清除、320/390/768/1440布局。没有调用付费模型，也没有读取或修改线上用户的 Key、历史对局与词汇记录。

```sh
python -m http.server 8766 --bind 127.0.0.1
node --test tests/site-v33.test.cjs
```

本轮详情见 [v0.33 发布说明](boardgames/docs/release-v33.md)。

*Design by 天 · © 2026 emoboi.com*

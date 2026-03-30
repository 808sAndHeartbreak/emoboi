# DeepSeek 代理（Cloudflare Worker）

把 DeepSeek API Key 放在 Worker 环境变量里，页面用 GitHub Pages 静态托管即可。

## 你需要做的（一次性）

1. **安装 Wrangler**（任选其一）
   - `npm install -g wrangler`
   - 或使用 `npx wrangler`（下面命令前加 `npx`）

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **进入本目录**
   ```bash
   cd workers/deepseek-proxy
   ```

4. **写入 API Key（不会进 Git）**
   ```bash
   wrangler secret put DEEPSEEK_API_KEY
   ```
   粘贴你在 DeepSeek 开放平台生成的 Key，回车。

5. **（推荐）限制浏览器来源**  
   编辑 `wrangler.toml` 里 `[vars]` 的 `ALLOWED_ORIGINS`，可写多个，逗号分隔，例如：
   ```toml
   ALLOWED_ORIGINS = "https://emoboi.com,https://www.emoboi.com"
   ```
   也兼容旧的单个 `ALLOWED_ORIGIN`。本地用 `file://` 调试可临时改为 `ALLOWED_ORIGINS = "*"`。

6. **部署**
   ```bash
   wrangler deploy
   ```
   终端会打印 Worker 地址，例如 `https://deepseek-proxy-english.xxx.workers.dev`。

7. **配置网站**  
   打开仓库里 `english/config.js`，把 `apiBase` 设为该地址（**不要**末尾斜杠），例如：
   ```javascript
   apiBase: "https://deepseek-proxy-english.xxx.workers.dev",
   ```
   保存后推送 GitHub，打开 `https://你的用户名.github.io/english/` 测试。

## 常见问题

- **429 / 限流**：DeepSeek 或 Worker 侧限流，稍后再试。
- **CORS / Failed to fetch**：不要用**资源管理器双击**打开 `english/index.html`（`file://`）。请用 **`https://emoboi.com/english/`**（或你的站点）访问；本地调试可用 `npx serve english -p 8765` 后打开 `http://127.0.0.1:8765`，并把该地址加入 `ALLOWED_ORIGINS` 后重新 `wrangler deploy`。
- **`net::ERR_CONNECTION_TIMED_OUT`**：浏览器到 `*.workers.dev` 的线路不通（国内网络较常见）。可换**手机热点**、**VPN**，或在其他网络下再试；与 Tailwind 控制台提示无关，可忽略。
- **带 `www` 的域名**：在 `wrangler.toml` 里使用 `ALLOWED_ORIGINS = "https://emoboi.com,https://www.emoboi.com"` 后务必执行 **`wrangler deploy`**。若曾在 Cloudflare 控制台手动加过旧的 `ALLOWED_ORIGIN`，到 **Workers → 该 Worker → Settings → Variables** 核对，避免与 `ALLOWED_ORIGINS` 混淆。
- **改 Key**：再次执行 `wrangler secret put DEEPSEEK_API_KEY` 覆盖即可。

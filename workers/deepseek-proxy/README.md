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

### （强烈推荐）自定义域名：解决 `*.workers.dev` 连接超时

国内部分网络访问 **`*.workers.dev` 会长时间超时**（Chrome 里显示 `net::ERR_CONNECTION_TIMED_OUT`），页面本身在 `emoboi.com` 能打开，但请求 Worker 失败。可以把 Worker **绑到你已在 Cloudflare 托管的域名**（与 `ALLOWED_ORIGINS` 里的一致），例如子域 **`api.emoboi.com`**：

1. Cloudflare 控制台 → **Workers & Pages** → 选中本 Worker → **Settings** → **Domains & Routes**（或 **Triggers → Custom Domains**）→ **Add Custom Domain**，按提示添加 `api.emoboi.com` 并完成 DNS（通常自动加一条 CNAME）。
2. 将 `english/config.js` 中的 `apiBase` 改为 **`https://api.emoboi.com`**（无末尾斜杠）。`ALLOWED_ORIGINS` **仍写页面来源**（如 `https://emoboi.com`），不必改成 `api` 子域。
3. 再执行一次 `wrangler deploy`（若控制台要求）。

绑定后，浏览器只访问你的主站域名与 `api.*` 同一家 CDN，往往比直连 `workers.dev` 稳定。

### GitHub Pages + `emoboi.com`：提示「Only domains active on your Cloudflare account」

Cloudflare 给 Worker 加 **`api.emoboi.com`** 的前提是：**根域 `emoboi.com` 必须在你这个 Cloudflare 账号里作为「站点 / Zone」托管 DNS**。  
GitHub Pages 只负责托管网页，域名可以在别处解析；若你**从未**把 `emoboi.com` 的 nameserver 指到 Cloudflare，就会出现这句报错，**与 Secret、Worker 代码无关**。

你可以任选其一：

**方案 A（推荐，仍用 emoboi.com 作 API 子域）**

1. 在 Cloudflare：**Add a site** → 输入 **`emoboi.com`** → 按向导拿到 **两条 Cloudflare nameserver**。  
2. 到**买域名的注册商**（不是 GitHub），把域名的 **DNS / nameserver** 改成 Cloudflare 给你的这两条（整站 DNS 交给 Cloudflare，**网站仍可以是 GitHub Pages**）。  
3. 在 Cloudflare **DNS** 里按 [GitHub Pages 自定义域说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) 配置 **apex / `www`**（例如 GitHub 要求的 **A 记录** 或 **CNAME**），与现在能打开 `https://emoboi.com` 时一致即可。  
4. 再回 Worker → **Custom domain** 添加 **`api.emoboi.com`**（通常会自动多一条指向 Worker 的记录）。  
5. `english/config.js` 的 `apiBase` 改为 `https://api.emoboi.com`。`ALLOWED_ORIGINS` **仍写** `https://emoboi.com`（页面来源不变）。

**方案 B（不动 emoboi.com 的 DNS）**

- 在 Cloudflare 里添加**另一个**你已控制、且 DNS 已在 Cloudflare 的域名（例如单独买一个便宜域名），只为 Worker 使用，例如 `https://api-你的域.com`。  
- `config.js` 里 `apiBase` 写该地址；Worker 的 `ALLOWED_ORIGINS` **照样写** `https://emoboi.com`（跨域允许即可）。

**临时**

- 继续用 `*.workers.dev` 作 `apiBase`，在能访问该域名的网络下使用，或 VPN / 热点。

## 常见问题

- **429 / 限流**：DeepSeek 或 Worker 侧限流，稍后再试。
- **CORS / Failed to fetch**：不要用**资源管理器双击**打开 `english/index.html`（`file://`）。请用 **`https://emoboi.com/english/`**（或你的站点）访问；本地调试可用 `npx serve english -p 8765` 后打开 `http://127.0.0.1:8765`，并把该地址加入 `ALLOWED_ORIGINS` 后重新 `wrangler deploy`。
- **`net::ERR_CONNECTION_TIMED_OUT`**：多为到 **`*.workers.dev` 的 TCP 连不上**（国内较常见），**不是**你没开 VPN 就一定错，也不是「必须用 file://」的问题。请优先按上文 **「自定义域名」** 把 Worker 绑到 `api.你的域名`；临时可换热点/VPN。调试时打开 **F12 → Console**，搜索 **`[English Lexicon API]`** 可看本次请求的 URL 与耗时。
- **带 `www` 的域名**：在 `wrangler.toml` 里使用 `ALLOWED_ORIGINS = "https://emoboi.com,https://www.emoboi.com"` 后务必执行 **`wrangler deploy`**。若曾在 Cloudflare 控制台手动加过旧的 `ALLOWED_ORIGIN`，到 **Workers → 该 Worker → Settings → Variables** 核对，避免与 `ALLOWED_ORIGINS` 混淆。
- **改 Key**：再次执行 `wrangler secret put DEEPSEEK_API_KEY` 覆盖即可。

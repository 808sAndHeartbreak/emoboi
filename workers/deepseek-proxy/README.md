# 可选个人 Key 代理

新版英语工具与钟楼直接请求 DeepSeek，此 Worker 不再是页面依赖。

当前源码只接受请求的 Authorization: Bearer 个人Key，不回退到 DEEPSEEK_API_KEY。没有个人Key返回401，原站点Secret不参与调用。允许来源由wrangler.toml配置。

部署命令：npx wrangler deploy。本轮本机Cloudflare登录已失效，未部署这份修改；线上旧Worker状态保持原样，不能声称它已停止使用站点Secret。重新登录后部署才能替换旧代理。

网站改版不依赖该部署，英语不再调用api.emoboi.com。

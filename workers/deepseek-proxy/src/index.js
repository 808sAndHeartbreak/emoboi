/* DeepSeek 代理：Secret DEEPSEEK_API_KEY；[vars] ALLOWED_ORIGINS 或 ALLOWED_ORIGIN；* 放行任意 Origin */

const UPSTREAM = "https://api.deepseek.com/v1/chat/completions";

function parseAllowedOrigins(env) {
  const raw = env.ALLOWED_ORIGINS || env.ALLOWED_ORIGIN || "*";
  if (raw === "*") return ["*"];
  return String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isReasonableOriginHeader(origin) {
  if (origin == null || typeof origin !== "string") return false;
  if (origin === "null") return true;
  if (origin.length > 512 || /[\r\n\0]/.test(origin)) return false;
  try {
    const u = new URL(origin);
    return (
      (u.protocol === "https:" || u.protocol === "http:") && u.hostname.length > 0
    );
  } catch {
    return false;
  }
}

function corsHeaders(env, request) {
  const origin = request.headers.get("Origin");
  const allowed = parseAllowedOrigins(env);

  let allowOrigin = null;
  if (allowed.includes("*")) {
    allowOrigin = "*";
  } else if (origin && allowed.includes(origin)) {
    allowOrigin = origin;
  } else if (!origin) {
    allowOrigin = allowed[0] || "*";
  } else {
    allowOrigin = null;
  }

  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
  if (allowOrigin !== null) {
    headers["Access-Control-Allow-Origin"] = allowOrigin;
  }
  return { headers };
}

export default {
  async fetch(request, env) {
    const { headers: h } = corsHeaders(env, request);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: h });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: h });
    }

    const origin = request.headers.get("Origin");
    const allowed = parseAllowedOrigins(env);
    if (!allowed.includes("*")) {
      if (!isReasonableOriginHeader(origin)) {
        return new Response(
          JSON.stringify({
            error:
              "缺少有效的 Origin。请用浏览器打开本站页面；若用 curl 测试请加 -H \"Origin: https://你的域名\"。",
          }),
          { status: 403, headers: { ...h, "Content-Type": "application/json" } }
        );
      }
      if (!allowed.includes(origin)) {
        const hint =
          origin === "null"
            ? "不要用 file:// 打开 HTML，请使用 https://你的域名/english/ 或本地 http 服务器。"
            : "Origin not allowed";
        return new Response(JSON.stringify({ error: hint }), {
          status: 403,
          headers: {
            ...h,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
          },
        });
      }
    }

    const url = new URL(request.url);
    if (!url.pathname.endsWith("/v1/chat/completions")) {
      return new Response(JSON.stringify({ error: "Use POST /v1/chat/completions" }), {
        status: 404,
        headers: { ...h, "Content-Type": "application/json" },
      });
    }

    const key = env.DEEPSEEK_API_KEY;
    if (!key) {
      return new Response(
        JSON.stringify({ error: "Worker 未配置 DEEPSEEK_API_KEY" }),
        { status: 500, headers: { ...h, "Content-Type": "application/json" } }
      );
    }

    const body = await request.text();

    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body,
    });

    const ct = upstream.headers.get("Content-Type") || "text/event-stream";

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...h,
        "Content-Type": ct,
      },
    });
  },
};

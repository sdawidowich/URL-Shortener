import { type NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
    const user_agent = userAgent(request);

    const res = NextResponse.next();

    res.headers.set("browser", user_agent.browser.name ?? "");
    res.headers.set("os", user_agent.os.name ?? "");
    res.headers.set("device_type", user_agent.device.type ?? "");
    res.headers.set("isBot", user_agent.isBot ? "1" : "0");

    return res;
}

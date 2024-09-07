import { type NextRequest } from "next/server";
import { ValidateRequest } from "~/lib/auth/auth";
import { type Url } from "~/server/db/schema";
import { GetUrlByKey } from "~/server/db/utils";

export async function GET(req: NextRequest) {
    // Validate user
    const { user } = await ValidateRequest();
    if (!user) {
        return Response.redirect("/login");
    }

    // Validate url
    const key = req.nextUrl.searchParams.get("key")?.toString() ?? "";
    const url: Url | undefined = await GetUrlByKey(key);

    if (url && user.id === url.created_by) {
        return Response.json({ url, error: null }, { status: 200 });
    }
    else if (url && user.id !== url.created_by) {
        return Response.json({ url: null, error: "Forbidden" }, { status: 403 });
    }
    else if (!url) {
        return Response.json({ url: null, error: "Not found" }, { status: 404 });
    }

    return Response.json({ url: null, error: "Internal server error" }, { status: 500 });
}

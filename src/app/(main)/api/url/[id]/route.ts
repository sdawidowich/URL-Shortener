import { type NextRequest } from "next/server";
import { ValidateRequest } from "~/lib/auth/auth";
import { type Url } from "~/server/db/schema";
import { GetUrlById, UpdateUrl } from "~/server/db/utils";

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
    // Validate user
    const { user } = await ValidateRequest();
    if (!user) {
        return Response.redirect("/login");
    }

    // Validate url 
    const url: Url | undefined = await GetUrlById(params.id);

    const data: { key: string } = await req.json() as { key: string };
    const key: string = data.key;

    if (url && user.id === url.created_by && key && key.length > 0) {
        try {
            const res = await UpdateUrl(url.id, key);

            if (res.status === 200) {
                return Response.json({ success: true });
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return Response.json({ success: false, error: 500 });
}
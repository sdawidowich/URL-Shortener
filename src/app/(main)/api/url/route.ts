import { type NextRequest } from 'next/server';
import { ValidateRequest } from '~/lib/auth/auth';
import { DeleteUrl, DeleteUrlVisits, GetUrl, InsertUrl } from '~/server/db/utils';

function generateLinkId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let result = "";
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
 
export async function POST(req: NextRequest) {
    const data: FormData = await req.formData();
    
    const link: string | undefined = data.get("link")?.toString();
    const user_id: string | undefined = data.get("user_id")?.toString();

    if (link && user_id) {
        const maxAttempts = 10;
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                const url_id: string = generateLinkId();

                await InsertUrl(url_id, link, user_id);

                return Response.json({success: true, body: {id: url_id}});
            }
            catch (e) {
                console.log(e);
                attempts++;
            }
        }
    }
    
    return Response.json({success: false, error: 500});
}
 
export async function DELETE(req: NextRequest) {
    const { user } = await ValidateRequest();

    if (!user) {
        return Response.redirect("/login");
    }
    
    const url_id: string | undefined = req.nextUrl.searchParams.get("id")?.toString();

    if (!url_id) {
        return Response.json({ success: false, error: 500 });
    }

    const user_id: string | undefined = (await GetUrl(url_id)).created_by;

    if (url_id && user_id && user.id === user_id) {
        try {
            await DeleteUrlVisits(url_id);
            await DeleteUrl(url_id);

            return Response.json({success: true, body: {id: url_id}});
        }
        catch (e) {
            console.log(e);
        }
    }
    
    return Response.json({success: false, error: 500});
}
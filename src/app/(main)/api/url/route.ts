import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';
import { ValidateRequest } from '~/lib/auth/auth';
import { generateLinkId } from '~/lib/utils';
import { type Url } from '~/server/db/schema';
import { DeleteUrl, DeleteUrlVisits, GetUrlById, InsertUrl } from '~/server/db/utils';
 
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
                revalidatePath('/myurls');

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
    
    const url_id: number = parseInt(req.nextUrl.searchParams.get("id")?.toString() ?? "");
    if (!url_id) {
        return Response.json({ success: false, error: 500 });
    }

    const url: Url | undefined = await GetUrlById(url_id);

    if (url && user.id === url.created_by) {
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
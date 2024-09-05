import { type NextRequest } from 'next/server';
import { db } from '~/server/db';
import { Urls } from '~/server/db/schema';

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

                await db.insert(Urls).values({ id: url_id, url: link, created_by: user_id, created_on: new Date() });

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
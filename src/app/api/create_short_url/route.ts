import { type NextRequest } from 'next/server';
import { db } from '~/server/db';
import { urls } from '~/server/db/schema';

function generateLinkId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
 
export async function POST(req: NextRequest) {
    let url_id: string = generateLinkId();

    while(await db.query.urls.findFirst({ where: (urls, { eq }) => eq(urls.id, url_id)}) != null) {
        url_id = generateLinkId();
    }

    await req.formData().then(async (data: FormData) => {
        await db.insert(urls).values({ id: url_id, link: data.get("link"), created_at: null });
    });

    return Response.json({body: {id: url_id}});
}
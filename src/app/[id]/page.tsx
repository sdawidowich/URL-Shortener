import { notFound, redirect } from 'next/navigation'
import { db } from '~/server/db';
import { visits } from '~/server/db/schema';

export default async function Redirect(ctx: { params: { id: string }}) {
    const url = await db.query.urls.findFirst({ where: (urls, { eq }) => eq(urls.id, ctx.params.id)});
    if (url != null) {
        await db.insert(visits).values({ url_id: url.id, accessed: null });
        try {
            redirect(url.link);
        }
        catch (e) {
            return notFound();
        }
    }
    else {
        return notFound();
    }
}

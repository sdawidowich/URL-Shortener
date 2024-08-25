import { notFound, redirect } from 'next/navigation'
import { db } from '~/server/db';
import { Url, Urls, Visits } from '~/server/db/schema';

export default async function Redirect(ctx: { params: { id: string }}) {
    const url = await db.query.Urls.findFirst({ where: (Urls, { eq }) => eq(Urls.id, ctx.params.id)}) as Url;

    if (url != null) {
        await db.insert(Visits).values({ url_id: url.id, accessed_on: new Date() });
        redirect(url.url);
    }
    else {
        return notFound();
    }
}

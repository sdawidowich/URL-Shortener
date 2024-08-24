import { notFound, redirect } from 'next/navigation'
import { db } from '~/server/db';
import { Urls, Visits } from '~/server/db/schema';

export default async function Redirect(ctx: { params: { id: string }}) {
    // const url = await db.select().from(Urls).where().findFirst({
    //   where: (urls, { eq }) => eq(urls.id, ctx.params.id),
    // });
    const url = await db.query.Urls.findFirst({ where: (Urls, { eq }) => eq(Urls.id, ctx.params.id)});

    if (url != null) {
        await db.insert(Visits).values({ url_id: url.id, accessed_on: null });
        redirect(url.url);
    }
    else {
        return notFound();
    }
}

import { notFound, redirect } from 'next/navigation'
import { GetUrl, InsertVisit } from '~/server/db/utils';

export default async function Redirect(ctx: { params: { id: string }}) {
    const url = await GetUrl(ctx.params.id);

    if (url != null) {
        await InsertVisit(url.id);
        redirect(url.url);
    }
    else {
        return notFound();
    }
}

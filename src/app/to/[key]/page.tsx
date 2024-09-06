import { notFound, redirect } from 'next/navigation'
import {  GetUrlByKey, InsertVisit } from '~/server/db/utils';

export default async function Redirect(ctx: { params: { key: string }}) {
    const url = await GetUrlByKey(ctx.params.key);

    if (url != null) {
        await InsertVisit(url.id);
        redirect(url.url);
    }
    else {
        return notFound();
    }
}

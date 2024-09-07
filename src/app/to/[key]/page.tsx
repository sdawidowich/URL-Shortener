import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation'
import { GetUrlByKey, InsertVisit } from '~/server/db/utils';
import { type UserAgent } from '~/types';

export default async function Redirect(ctx: { params: { key: string }}) {
    const url = await GetUrlByKey(ctx.params.key);
    const head = headers();

    const user_agent: UserAgent = {
        browser: head.get("browser"),
        os: head.get("os"),
        device_type: head.get("device_type"),
        isBot: Boolean(parseInt(head.get("isBot") ?? "0"))
    };

    if (url != null) {
        await InsertVisit(url.id, user_agent);
        redirect(url.url);
    }
    else {
        return notFound();
    }
}
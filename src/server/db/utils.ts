import { eq } from "drizzle-orm";
import { db } from ".";
import { type Url, Urls, UrlsView, type UrlView, type User, Users, type Visit, type VisitCountView, type VisitHrCountView, Visits, VisitsCountView, VisitsHrCountView } from "./schema";
import { ValidateRequest } from "~/lib/auth/auth";
import { redirect } from "next/navigation";
import { type UserAgent } from "~/types";

// Urls
export async function GetUrlById(id: number): Promise<Url> {
    return await db.query.Urls.findFirst({ where: (Urls, { eq }) => eq(Urls.id, id)}) as Url;
}

export async function GetUrlByKey(key: string): Promise<Url> {
    return await db.query.Urls.findFirst({ where: (Urls, { eq }) => eq(Urls.key, key)}) as Url;
}

export async function InsertUrl(key: string, link: string, user_id: string) {
    try {
        await db.insert(Urls).values({ key: key, url: link, created_by: user_id, created_on: new Date() });
    }
    catch (e) {
        throw e;
    }
}

export async function UpdateUrl(id: number, key: string) {
    try {
        await db.update(Urls).set({key: key}).where(eq(Urls.id, id));
        return { status: 200 };
    }
    catch (e) {
        return { status: 409 };
    }
}

export async function DeleteUrl(id: number) {
    await db.delete(Urls).where(eq(Urls.id, id));
}

// UrlView
export async function GetUrlViewList(): Promise<UrlView[]> {
    const { user } = await ValidateRequest();

    if (!user) {
      return redirect("/login");
    }

    return await db.select().from(UrlsView).where(eq(UrlsView.created_by, user.id)).orderBy(UrlsView.id) as UrlView[];
}


export async function GetUrlViewById(id: number): Promise<UrlView> {
    return (await db.select().from(UrlsView).where(eq(UrlsView.id, id)).limit(1))[0] as UrlView;
}

// Users
export async function InsertUser(github_id: number | null = null, username: string) {
    try {
        const userId = crypto.randomUUID();
        await db.insert(Users).values({ id: userId, github_id: github_id, username: username, created_on: new Date() });
        return userId;
    }
    catch (e) {
        throw e;
    }
}

export async function GetUserByGitHubId(github_id: number): Promise<User> {
    return await db.query.Users.findFirst({ where: (Users, { eq }) => eq(Users.github_id, github_id)}) as User;
}

// Visits
export async function GetVisits(url_id: number): Promise<Visit[]> {
    return await db.select().from(Visits).where(eq(Visits.url_id, url_id)) as Visit[];
}

export async function GetVisitCounts(url_id: number): Promise<VisitCountView[]> {
    return await db.select().from(VisitsCountView).where(eq(VisitsCountView.url_id, url_id)) as VisitCountView[];
}

export async function GetVisitHrCounts(url_id: number): Promise<VisitHrCountView[]> {
    return await db.select().from(VisitsHrCountView).where(eq(VisitsHrCountView.url_id, url_id)) as VisitHrCountView[];
}

export async function InsertVisit(url_id: number, user_agent: UserAgent) {
    await db.insert(Visits).values({ url_id: url_id, accessed_on: new Date(), browser: user_agent.browser, os: user_agent.os, device_type: user_agent.device_type, is_bot: user_agent.isBot });
}

export async function DeleteUrlVisits(url_id: number) {
    await db.delete(Visits).where(eq(Visits.url_id, url_id));
}
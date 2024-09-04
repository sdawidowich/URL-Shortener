import { eq } from "drizzle-orm";
import { db } from ".";
import { Urls, Users } from "./schema";

export async function DeleteUrl(id: string) {
    await db.delete(Urls).where(eq(Urls.id, id));
}

export async function InsertUser(github_id: string | null = null, username: string) {
    try {
        const userId = crypto.randomUUID();
        await db.insert(Users).values({ id: userId, github_id: github_id, username: username, created_on: new Date() });
        return userId;
    }
    catch (e) {
        throw e;
    }
}

export async function GetUserByGitHubId(github_id: string) {
    return (await db.select().from(Users).where(eq(Users.github_id, github_id)).limit(1)).at(0);
}
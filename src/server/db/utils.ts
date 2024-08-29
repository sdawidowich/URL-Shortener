import { eq } from "drizzle-orm";
import { db } from ".";
import { Urls } from "./schema";

export async function DeleteUrl(id: string) {
    await db.delete(Urls).where(eq(Urls.id, id));
}
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import DataTable from "~/components/layout/DataTable";
import { ValidateRequest } from "~/lib/auth/auth";
import { db } from "~/server/db";
import { UrlsView, type UrlView } from "~/server/db/schema";

export const dynamic = "force-dynamic";

export default async function MyURLsPage() {
    const { user } = await ValidateRequest();

    if (!user) {
	    return redirect("/login");
    }

    const urlViewList = (await db.select().from(UrlsView).where(eq(UrlsView.created_by, user.id))) as UrlView[];

    return (
        <div className="flex flex-col items-center justify-center px-4 h-full">
            <DataTable data={urlViewList} />
        </div>
    );
}

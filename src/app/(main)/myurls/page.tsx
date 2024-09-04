import DataTable from "~/components/layout/DataTable";
import { db } from "~/server/db";
import { UrlsView, type UrlView } from "~/server/db/schema";

export const dynamic = "force-dynamic";

export default async function MyURLsPage() {
    const urlViewList = (await db.select().from(UrlsView)) as UrlView[];

    return (
        <div className="flex flex-col items-center justify-center px-4 h-full">
            <DataTable data={urlViewList} />
        </div>
    );
}

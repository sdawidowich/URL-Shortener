import DataTable from "~/components/layout/DataTable";
import { db } from "~/server/db";
import { Url, Urls, UrlsView, UrlView } from "~/server/db/schema";

export default async function MyURLsPage() {
    const urlViewList = (await db.select().from(UrlsView)) as UrlView[];

    return (
      <main className="flex flex-col items-center px-4">
        <DataTable data={urlViewList} />
      </main>
    );
}

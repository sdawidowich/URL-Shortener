import DataTable from "~/components/layout/DataTable";
import { GetUrlViewList } from "~/server/db/utils";

export const dynamic = "force-dynamic";

export default async function MyURLsPage() {
    const urlViewList = await GetUrlViewList();

    return (
        <div className="flex flex-col items-center justify-center px-4 h-full">
            <DataTable data={urlViewList} />
        </div>
    );
}

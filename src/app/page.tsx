import DataTable, { type Url } from "~/components/layout/DataTable";
import { Shorten_Form } from "~/components/layout/Shorten_Form";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";
import { Urls } from "~/server/db/schema";

export default async function HomePage() {
    const urlList = (await db.select().from(Urls)) as Url[];

    return (
      <main className="flex flex-col items-center px-4">
        <Shorten_Form />
        <Separator className="my-8" />
        <DataTable data={urlList} />
      </main>
    );
}
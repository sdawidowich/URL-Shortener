import { notFound } from "next/navigation";
import { DetailsCard } from "~/components/layout/DetailsCard";
import { ShortUrlCard } from "~/components/layout/ShortUrlCard";
import { VisitsChart } from "~/components/layout/VisitsChart";
import { Separator } from "~/components/ui/separator";
import { type VisitHrCountView, type VisitCountView } from "~/server/db/schema";
import { GetUrlViewById, GetVisitCounts, GetVisitHrCounts } from "~/server/db/utils";

export const dynamic = "force-dynamic";

export default async function URLPage(ctx: { params: { id: number }}) {
    const url = await GetUrlViewById(ctx.params.id);
    const visitCounts: VisitCountView[] = await GetVisitCounts(url.id);
    const visitHrCounts: VisitHrCountView[] = await GetVisitHrCounts(url.id);

    if (!url) {
        return notFound();
    }

    return (
        <div className="flex h-full flex-col items-center p-4 gap-2">
            <div className="w-full flex flex-row">
                <ShortUrlCard url={url} />
            </div>
            <div className="w-full flex flex-row flex-wrap gap-2">
                <DetailsCard label="URL" value={url.url} />
                <DetailsCard label="Created On" value={url.created_on.toLocaleString()} />
                <DetailsCard label="Visits" value={url.visits} />
            </div>
            <Separator className="my-2" />
            <h2 className="w-full text-2xl font-semibold py-2">Analytics</h2>
            <div className="w-full flex flex-col items-center">
                <VisitsChart hrCountData={visitHrCounts} countData={visitCounts} xLabel="Date" yLabel="Visits" />
            </div>
        </div>
    );
}

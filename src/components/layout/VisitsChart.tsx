"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "~/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { format, toZonedTime } from "date-fns-tz";


export function VisitsChart({data, xLabel, yLabel, customTicks} : {data: Map<string, number>, xLabel: string, yLabel: string, customTicks?: string[] | undefined}) {
    const [historyLength, setHistoryLength] = useState(7);

    const chartConfig = {
        x: {
            label: xLabel
        },
        y: {
            label: yLabel,
            color: "hsl(220 70% 50%)"
        }
    } satisfies ChartConfig;

    const visitsChartData: Array<{x: string, y: number}> = [];
    const dateOffset = 24 * 60 * 60 * 1000;
    for (let i = historyLength - 1; i >= 0; i--) {
        const date = new Date();
        date.setTime(date.getTime() - dateOffset * i);

        const visits = data.get(format(toZonedTime(date, "UTC"), "yyyy-MM-dd", {timeZone: "UTC"})) ?? 0;
        const dateStr = format(toZonedTime(date, "UTC"), "LLL d", {timeZone: "UTC"});
        
        visitsChartData.push({ x: dateStr, y: visits });
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div>
                <DropdownMenu value={historyLength} setValue={setHistoryLength} />
            </div>
            <Card className="flex-1 w-full">
                <CardHeader>
                    <CardTitle>Visits</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="max-h-[60vh] min-h-[200px] w-full">
                        <AreaChart accessibilityLayer data={visitsChartData} margin={{left: -20}}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="x" tickLine={false} axisLine={false} tickMargin={8} interval="equidistantPreserveStart" minTickGap={20} ticks={customTicks} />
                            <YAxis dataKey="y" type="number" />
                            <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="line" />} />
                            <defs>
                                <linearGradient id="fillY" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(220 70% 50%)" stopOpacity={0.8} />
                                    <stop offset="90%" stopColor="hsl(220 70% 50%)" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <Area dataKey="y" type="linear" fill="url(#fillY)" fillOpacity={0.4} stroke="hsl(220 70% 50%)" />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
  );
}

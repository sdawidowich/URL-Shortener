import { type Column } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { type UrlView } from "~/server/db/schema";
import { type ChildElement } from "~/types";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

function GetSortIcon(column: Column<UrlView, unknown>) {
    if (column.getIsSorted() === "asc") {
        return (
            <ArrowUp className="ml-2 h-4 w-4" />
        );
    }
    else if (column.getIsSorted() === "desc") {
        return (
            <ArrowDown className="ml-2 h-4 w-4" />
        );
    }
    else {
        return (
            <ArrowUpDown className="ml-2 h-4 w-4" />
        );
    }
}

export function SortButton({column, children}: {column: Column<UrlView, unknown>, children?: ChildElement}) {
    return (
        <Button
            variant="ghost"
            onClick={() => {
                column.getIsSorted() === "desc" ?
                    column.clearSorting()
                : column.toggleSorting(column.getIsSorted() === "asc")
            }}
            className={cn(column.getIsSorted() ? "text-accent-foreground bg-secondary/85" : "", "w-full justify-start text-left")}
        >
            {children}
            {GetSortIcon(column)}
        </Button>
    )
}
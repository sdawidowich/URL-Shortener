"use client"

import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { Input } from "../ui/input"
import { type UrlView } from "~/server/db/schema"
import { SortButton } from "./SortButton"
import { ExternalLink } from "./ExternalLink"
import { Badge } from "../ui/badge"
import { ActionsDropdown } from "./ActionsDropdown"
import { Skeleton } from "../ui/skeleton"

export default function DataTable({ data }: { data: UrlView[] }) {
    const [sorting, setSorting] = useState<SortingState>([{id: "created_on", desc: true}]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [origin, setOrigin] = useState("");
    
    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    const columns: ColumnDef<UrlView>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "url",
            size: 200,
            header: ({ column }) => {
                return (
                    <SortButton column={column}>URL</SortButton>
                )
            },
            cell: ({ row }) => {
                const shortUrl = `${origin}/to/${String(row.getValue("id"))}`;
                const longUrl = `${String(row.getValue("url"))}`;
                
                return (
                    <div>
                        <div className="mb-1">
                            {
                                !origin ? 
                                    <Skeleton className="h-4 w-[250px]" />
                                :
                                    <ExternalLink href={shortUrl}>{shortUrl}</ExternalLink>
                            }
                        </div>
                        <div className="text-xs text-foreground/60">
                            <Badge variant="outline" className="text-xxs mr-2">
                                Long URL
                            </Badge>
                            <ExternalLink href={longUrl}>{longUrl}</ExternalLink>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "id",
            size: 200,
            header: ({ column }) => {
                return (
                    <SortButton column={column}>ID</SortButton>
                )
            },
            cell: ({ row }) => <div>{row.getValue("id")}</div>
        },
        {
            accessorKey: "created_on",
            size: 200,
            header: ({ column }) => {
                return (
                    <SortButton column={column}>Created On</SortButton>
                )
            },
            cell: ({ row }) => <div>{(new Date(row.getValue("created_on"))).toLocaleString()}</div>,
        },
        {
            accessorKey: "visits",
            size: 200,
            header: ({ column }) => {
                return (
                    <SortButton column={column}>Visits</SortButton>
                )
            },
            cell: ({ row }) => <div>{row.getValue("visits")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const url = row.original

                return (
                    <ActionsDropdown url_id={url.id} />
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        },
    });

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold">My URLs</h2>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter urls..."
                    value={(table.getColumn("url")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("url")?.setFilterValue(event.target.value)
                    }
                    className="mr-2 min-w-36 max-w-2xl"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </TableHead>
                                );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                    </TableCell>
                                ))}
                                </TableRow>
                            ))
                            ) : (
                            <TableRow>
                                <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                                >
                                No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
                </div>
            </div>
        </div>
    );
}

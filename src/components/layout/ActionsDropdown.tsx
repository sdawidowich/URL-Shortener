"use client"

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ConfirmDialog } from "./ConfirmDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ActionsDropdown({url_id, url_key}: {url_id: number, url_key: string}) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const router = useRouter();

    async function DeleteAction() {
        await fetch(`/api/url?id=${url_id}`, {
            method: 'DELETE'
        })
        .then(async (res) => {
            await res.json().then((data: {success: boolean, error: number, body: {id: string}}) => {
                if (!data.success) {
                    console.log(`Something went wrong! Error code: ${data.error}`)
                }
            });
        });
        setOpenDeleteDialog(false);
        router.refresh();
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(url_key)}>
                        Copy URL Key
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Edit width={16} height={16} className="mr-1" /> Edit url</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
                        <Trash width={16} height={16} className="mr-1" /> Delete url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} 
                description="This action cannot be undone. This will permanently delete the selected url."
                actionLabel="Delete" action={DeleteAction} />
        </>
    )
}
"use client"

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ConfirmDialog } from "./ConfirmDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EditUrlDialog } from "./EditUrlDialog";
import { type UrlView } from "~/server/db/schema";

export function ActionsDropdown({url}: {url: UrlView}) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const router = useRouter();

    async function DeleteAction() {
        await fetch(`/api/url?id=${url.id}`, {
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
    
    async function EditAction(values: {link: string, url_key: string}) {
        await fetch(`/api/url/${url.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                key: values.url_key
            })
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
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(url.key)}>
                        Copy URL Key
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
                        <Edit width={16} height={16} className="mr-1" /> Edit url
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
                        <Trash width={16} height={16} className="mr-1" /> Delete url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ConfirmDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} 
                description="This action cannot be undone. This will permanently delete the selected url."
                actionLabel="Delete" action={DeleteAction} />
            <EditUrlDialog open={openEditDialog} setOpen={setOpenEditDialog} url={url} action={EditAction} />
        </>
    )
}
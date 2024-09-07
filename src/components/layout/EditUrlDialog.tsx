import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { type ChildElement } from "~/types"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useContext } from "react"
import { HostnameContext } from "../auth/AuthProvider"
import { type UrlView } from "~/server/db/schema"

export function EditUrlDialog({open, setOpen, url, action, children}: 
    {open?: boolean, setOpen?: (bool: boolean) => void, url: UrlView, action: (values: {link: string, url_key: string}) => void, children?: ChildElement}) {
    const hostname = useContext(HostnameContext);

    const formSchema = z.object({
        link: z.string(),
        url_key: z.string().min(1, {"message": "URL key length cannot be 0"}).refine(async (val) => {
            if (val === url.key) {
                return true;
            }
            
            const res = await fetch(`/api/url/search?key=${val}`, {
                method: 'GET'
            });
            
            return res.status !== 200;

        }, {"message": "This URL key is already taken"})
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: url.url,
            url_key: url.key
        },
    });
    
    return (
        <Dialog open={open} onOpenChange={setOpen ? ((newOpen) => setOpen(newOpen)) : undefined}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit URL</DialogTitle>
                </DialogHeader>
                <div className="grid">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(action)}
                            className="flex w-full flex-col items-start justify-center gap-2"
                        >
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem className="w-full min-w-36 flex-1 pr-2">
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Link" {...field} readOnly disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="url_key"
                                render={({ field }) => (
                                    <FormItem className="w-full min-w-36 flex-1 pr-2">
                                        <FormLabel>URL Key</FormLabel>
                                        <FormControl>
                                            <Input placeholder="url_key1" {...field} />
                                        </FormControl>
                                        <FormDescription>{`${hostname}/${field.value}`}</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="w-full flex flex-row justify-end">
                                <Button type="submit" >Save URL</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

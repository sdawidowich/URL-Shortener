"use client"

import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, type FormEvent } from "react";
import { URL_Card } from "~/components/layout/URL_Card";

export function Shorten_Form() {
    const [shortUrlId, setShortUrlId] = useState<string | null>(null);
    const [longUrl, setLongUrl] = useState<string | null>(null);

    const formSchema = z.object({
        link: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
        },
    });

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        await fetch('/api/create_short_url', {
            method: 'POST',
            body: formData,
        })
        .then(async (res) => {
            await res.json().then((data: {success: boolean, error: number, body: {id: string}}) => {
                if (data.success) {
                    setShortUrlId(data.body.id);
                    setLongUrl(formData.get("link")?.toString() ?? null);
                    form.reset();
                }
                else {
                    console.log(`Something went wrong! Error code: ${data.error}`)
                }
            });
        });
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl py-4">
            <Form {...form}>
                <form onSubmit={onSubmit} className="flex flex-row items-center w-full justify-center">
                    <FormField 
                    control={form.control}
                    name="link"
                    render={
                        ({field}) => (
                        <FormItem className="flex-1 min-w-36 w-full pr-2">
                            <FormControl>
                            <Input placeholder="Long URL" {...field} />
                            </FormControl>
                        </FormItem>
                        )
                    }
                    />
                    <Button type="submit" className="w-24">Shorten</Button>
                </form>
            </Form>
            <URL_Card shortUrlId={shortUrlId} longUrl={longUrl} />
        </div>
    )
}
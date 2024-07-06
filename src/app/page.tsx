"use client"

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { type FormEvent } from "react";

export default function HomePage() {
    const [hostname, setHostname] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    useEffect(() => {
        setHostname(window.location.href);
    }, []);

    const formSchema = z.object({
        link: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
        },
    })

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)

        await fetch('/api/create_short_url', {
            method: 'POST',
            body: formData,
        })
        .then(async (res) => {
            await res.json().then((data: {success: boolean, error: number, body: {id: string}}) => {
            if (data.success) {
                setShortUrl(data.body.id);
            }
            else {
                console.log(`Something went wrong! Error code: ${data.error}`)
            }
            });
        });
    }

    return (
        <main className="flex flex-col items-center">
            <h1 className="p-4 text-center font-semibold text-xl w-full">URL Shortener</h1>
            <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col items-center w-full">
                <FormField 
                control={form.control}
                name="link"
                render={
                    ({field}) => (
                    <FormItem className="flex flex-col p-8 w-full items-center">
                        <FormControl>
                        <Input placeholder="Long URL" {...field} className="flex-1 min-w-36 max-w-4xl" />
                        </FormControl>
                    </FormItem>
                    )
                }
                />
                <Button type="submit" className="mx-4 w-36">Shorten</Button>
            </form>
            </Form>
            <div className="py-8">
            {shortUrl && <a href={hostname + shortUrl} >{hostname}{shortUrl}</a>}
            </div>
        </main>
    );
}
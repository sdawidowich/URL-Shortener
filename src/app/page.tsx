"use client"

import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 

export default function HomePage() {
  const formSchema = z.object({
    link: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <main className="flex flex-col">
      <h1 className="p-4 text-center font-semibold text-xl">URL Shortener</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
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
    </main>
  );
}

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export default function CreatePodcast() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <section className="mt-10 flex flex-col">
            <h1
                className="text-20 font-bold text-white-1">
                Create Podcast
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex flex-col w-full">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        <FormField
                            control={form.control}
                            name="podcastTitle"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="input-class focus-visible:ring-orange-1"
                                            placeholder="GhosT Pro Podcast" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </section>
    )
}

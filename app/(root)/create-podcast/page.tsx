"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

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
                        <div className="flex flex-col gap-2.5">
                            <Label className="text-16 font-bold text-white-1">
                                Select AI Voice
                            </Label>
                            <Select>
                                <SelectTrigger className={cn("text-16 w-full border-none bg-black-1 text-gray-1")}>
                                    <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1" />
                                </SelectTrigger>
                                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                                    {
                                        ["Voice 1", "Voice 2"].map((category) => (
                                            <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                                                {category}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                </form>
            </Form>
        </section>
    )
}

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
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/forms/generatePodcast"
import GenerateThumbnail from "@/components/forms/generateThumbnail"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export default function CreatePodcast() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePrompt, setImagePrompt] = useState<string>('');
    const [iamgeUrl, setIamgeUrl] = useState<string>('');
    const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
    const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
    const [audioUrl, setAudioUrl] = useState<string>('');
    const [audioDuration, setAudioDuration] = useState<number>(0);
    const [voiceType, setVoiceType] = useState<string | null>(null)
    const [voicePrompt, setVoicePrompt] = useState<string>('')

    const voiceCategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"]

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
                            <Select onValueChange={(value) => setVoiceType(value)}>
                                <SelectTrigger className={cn("text-16 w-full border-none bg-black-1 text-gray-1")}>
                                    <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1" />
                                </SelectTrigger>
                                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                                    {
                                        voiceCategories.map((category) => (
                                            <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                                                {category}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            {
                                voiceType && (
                                    <audio
                                        src={`/${voiceType}.mp3`}
                                        autoPlay
                                        className="hidden"
                                    />
                                )
                            }
                        </div>
                        <FormField
                            control={form.control}
                            name="podcastDescription"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="input-class focus-visible:ring-orange-1"
                                            placeholder="Write a short description about the podcast" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col pt-10">
                        <GeneratePodcast />
                        <GenerateThumbnail />
                        <div className="mt-10 w-full">
                            <Button
                                type="submit"
                                className="text-16 w-full bg-orange-1 py-4 font-extrabold 
                                text-white-1 transition-all duration-500 hover:bg-black-1">
                                {isSubmitting ? (
                                    <>
                                        Submitting
                                        <Loader size={20} className="animate-spin ml-2" />
                                    </>
                                ) : (
                                    "Submit & Publish Podcast"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    )
}

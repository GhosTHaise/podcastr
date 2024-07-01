import { GeneratePodcastProps } from '@/types'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react"

const useGeneratePodcast = ({
    setAudioStorageId,
    setAudio,
    voiceType,
    audio,
    voicePrompt,
    setVoicePrompt,
    setAudioDuration }: GeneratePodcastProps) => {
    // todo: Logic for podcast generation 
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    const getAudioUrl = useMutation(api.podcasts.getUrl)
    const { startUpload } = useUploadFiles(generateUploadUrl)

    const getPodcastAudio = useAction(api.openai.generateAudioAction);
    const generatePodcast = async () => {
        setIsGenerating(false);
        setAudio('');

        if (!voicePrompt) {
            // todo: show error message
            return setIsGenerating(false);
        }

        try {
            const response = await getPodcastAudio({
                voice: voiceType!,
                input: voicePrompt
            });

            const blob = new Blob([response], { type: "autio/mpeg" });
            const fileName: string = `podcast0-${uuidv4()}.mp3`;

            const file = new File([blob], fileName, { type: "audio/mpeg" });

            const uploaded = await startUpload([file]);
            const storageId = (uploaded[0].response as any).storageId;

            setAudioStorageId(storageId);
            const audioUrl = await getAudioUrl({ storageId });
            setAudio(audioUrl!);

            // todo : show success message
        } catch (error) {
            console.log("Error generation podcast");
            // todo: show error message 
        } finally {
            setIsGenerating(false);
        }
    }
    return {
        isGenerating,
        generatePodcast
    }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
    const {
        setAudioStorageId,
        setAudio,
        voiceType,
        audio,
        voicePrompt,
        setVoicePrompt,
        setAudioDuration } = props
    const { isGenerating, generatePodcast } = useGeneratePodcast(props)

    return (
        <div>
            <div className='flex flex-col gap-2.5'>
                <Label className='text-16 font-bold text-white-1'>
                    AI Prompt to generate Podcast
                </Label>
                <Textarea
                    className='input-class font-light focus-visible:ring-orange-1'
                    placeholder='Provide text to generate audio'
                    rows={5}
                    value={voicePrompt}
                    onChange={(e) => setVoicePrompt(e.target.value)}
                >

                </Textarea>
            </div>
            <div className='mt-5 w-full max-w-[200px]'>
                <Button
                    type="submit"
                    className="text-16 bg-orange-1 py-4 font-bolf 
                                text-white-1 transition-all">
                    {isGenerating ? (
                        <>
                            Generating
                            <Loader size={20} className="animate-spin ml-2" />
                        </>
                    ) : (
                        "Generate"
                    )}
                </Button>
            </div>
            {
                audio && (
                    <audio
                        controls
                        src={audio}
                        autoPlay
                        className='mt-5'
                        onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                    />
                )
            }
        </div>
    )
}

export default GeneratePodcast
import { GeneratePodcastProps } from '@/types'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'

const useGeneratePodcast = ({
    setAudioStorageId,
    setAudio,
    voiceType,
    audio,
    voicePrompt,
    setVoicePrompt,
    setAudioDuration }: GeneratePodcastProps) => {
    // todo: Logic for podcast generation 
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const generatePodcast = async () => {
        setIsGenerating(false)
        setAudio('')

        if (!voicePrompt) {
            // todo: show error message
            return setIsGenerating(false)
        }

        try {

        } catch (error) {
            console.log("Error generation podcast");
            // todo: show error message 
        } finally {
            setIsGenerating(false)
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
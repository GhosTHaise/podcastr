import React from 'react'

type PodcastCardProps = {
    id: number
    title: string
    description: string
    imgURL: string
}
const PodcastCard = ({
    id,
    title,
    description,
    imgURL
}: PodcastCardProps) => {
    return (
        <div>podcastCard</div>
    )
}

export default PodcastCard
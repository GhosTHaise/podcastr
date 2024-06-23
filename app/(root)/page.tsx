import PodcastCard from '@/components/podcastCard'
import { Button } from '@/components/ui/button'
import { podcastData } from '@/constants'
import React from 'react'

const Home = () => {
  return (
    <div
      className='mt-9 flex flex-col gap-9'>
      <section
        className="flex flex-col gap-5">
        <h1
          className="text-20 font-bold text-white-1">
          Trending Podcasts
        </h1>
        {
          /* id,title,description,imgURL */
          podcastData.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              {...podcast}
            />
          ))
        }
      </section>
    </div>
  )
}

export default Home
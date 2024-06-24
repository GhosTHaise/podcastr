"use client";
import PodcastCard from '@/components/podcastCard'
import { podcastData } from '@/constants'
import { useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';

const Home = () => {
  const tasks = useQuery(api.tasks.get);
  return (
    <div
      className='mt-9 flex flex-col gap-9'>
      <section
        className="flex flex-col gap-5">
        <h1
          className="text-20 font-bold text-white-1">
          Trending Podcasts
        </h1>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
          {tasks?.map(({ _id, text }: { _id: string, text: string }) => <div key={_id}>{text}</div>)}
        </main>
        <div className='podcast_grid'>
          {
            /* id,title,description,imgURL */
            podcastData.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                {...podcast}
              />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Home
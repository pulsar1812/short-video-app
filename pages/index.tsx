import axios from 'axios'

import { Video } from '../types'
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'
import { BASE_URL } from '../utils'

type VideoProps = {
  videos: Video[]
}

export default function Home({ videos }: VideoProps) {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video: Video) => <VideoCard key={video._id} post={video} />)
      ) : (
        <NoResults text={'No Videos'} />
      )}
    </div>
  )
}

export async function getServerSideProps({
  query: { topic },
}: {
  query: { topic: string }
}) {
  let response = null

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  } else {
    response = await axios.get(`${BASE_URL}/api/post`)
  }

  return {
    props: {
      videos: response.data,
    },
  }
}

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

export async function getServerSideProps() {
  const response = await axios.get(`${BASE_URL}/api/post`)

  return {
    props: {
      videos: response.data,
    },
  }
}

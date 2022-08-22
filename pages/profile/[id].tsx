import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { BASE_URL } from '../../utils'
import { Video, IUser } from '../../types'

type ProfileProps = {
  data: {
    user: IUser
    userVideos: Video[]
    userLikedVideos: Video[]
  }
}

export default function Profile({ data }: ProfileProps) {
  const [showUserVideos, setShowUserVideos] = useState<boolean>(true)
  const [videoList, setVideoList] = useState<Video[]>([])

  const { user, userVideos, userLikedVideos } = data

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos)
    } else {
      setVideoList(userLikedVideos)
    }
  }, [showUserVideos, userVideos, userLikedVideos])

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 w-full bg-white mb-4'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            src={user.image}
            width={34}
            height={34}
            alt='user profile'
            layout='responsive'
            className='rounded-full'
          />
        </div>

        <div className='flex flex-col justify-center'>
          <p
            className='flex gap-1 justify-center items-center text-md md:text-2xl tracking-wider font-bold
           text-primary lowercase'
          >
            {user.userName.replaceAll(' ', '')}
            <GoVerified className='text-blue-400' />
          </p>
          <p className='capitalize text-gray-400 text-xs md:text-xl'>
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className='flex gap-10 w-full bg-white border-b-2 border-gray-200 mt-10 mb-10'>
          <p
            onClick={() => setShowUserVideos(true)}
            className={`text-xl font-semibold mt-2 cursor-pointer ${videos}`}
          >
            Videos
          </p>
          <p
            onClick={() => setShowUserVideos(false)}
            className={`text-xl font-semibold mt-2 cursor-pointer ${liked}`}
          >
            Liked
          </p>
        </div>

        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videoList.length > 0 ? (
            videoList.map((post: Video, index: number) => (
              <VideoCard key={index} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string }
}) {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: { data: res.data },
  }
}

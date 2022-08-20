import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'

import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

type DetailProps = {
  postDetails: Video
}

export default function Detail({ postDetails }: DetailProps) {
  const [post, setPost] = useState(postDetails)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const { userProfile }: any = useAuthStore()

  const router = useRouter()

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isMuted
    }
  }, [post, isMuted])

  if (!post) return null

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  return (
    <div
      className='flex flex-wrap lg:flex-nowrap w-full absolute 
    left-0 top-0 bg-white'
    >
      <div
        className='flex justify-center items-center flex-2 w-[1000px]
      lg:w-9/12 relative bg-blurred-img bg-no-repeat bg-cover bg-center'
      >
        <div className='flex gap-6 absolute top-6 left-2 lg:left-6 z-50'>
          <p onClick={() => router.back()} className='cursor-pointer'>
            <MdOutlineCancel className='text-white text-[35px] hover:opacity-70' />
          </p>
        </div>

        <div className='relative'>
          <div className='h-[60vh] lg:h-[100vh]'>
            <video
              src={post?.video?.asset.url}
              ref={videoRef}
              loop
              onClick={onVideoClick}
              className='h-full cursor-pointer'
            ></video>
          </div>

          <div className='absolute top-[45%] left-[40%] cursor-pointer'>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>

        <div className='absolute bottom-5 right-5 lg:bottom-10 lg:right-10 cursor-pointer z-50'>
          {isMuted ? (
            <button onClick={() => setIsMuted(false)}>
              <HiVolumeOff className='text-white text-3xl lg:text-4xl hover:opacity-70' />
            </button>
          ) : (
            <button onClick={() => setIsMuted(true)}>
              <HiVolumeUp className='text-white text-3xl lg:text-4xl hover:opacity-70' />
            </button>
          )}
        </div>
      </div>

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='mt-10 lg:mt-20'>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='w-16 h-16 md:w-20 md:h-20 ml-4'>
              <Link href='/'>
                <>
                  <Image
                    src={post.postedBy.image}
                    width={62}
                    height={62}
                    alt='profile photo'
                    layout='responsive'
                    className='rounded-full'
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href='/'>
                <div className='flex flex-col gap-2 mt-3'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy.userName}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p
                    className='capitalize font-medium text-xs text-gray-500 hidden 
                  md:block'
                  >
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className='text-lg text-gray-600 px-10'>{post.caption}</p>

          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>

          <Comments />
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data },
  }
}

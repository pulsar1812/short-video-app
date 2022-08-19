import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

import { Video } from '../types'

type VideoCardProps = {
  post: Video
}

export default function VideoCard({
  post: { postedBy, video, _id },
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href='/'>
              <>
                <Image
                  src={postedBy.image}
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
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {postedBy.userName}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='flex gap-4 relative lg:ml-20'>
        <div
          onMouseEnter={() => {
            setIsHover(true)
          }}
          onMouseLeave={() => {
            setIsHover(false)
          }}
          className='rounded-3xl'
        >
          <Link href={`/detail/${_id}`}>
            <video
              src={video.asset.url}
              loop
              ref={videoRef}
              className='w-[200px] h-[300px] md:h-[400px] lg:w-[600px] lg:h-[530px] 
              rounded-2xl cursor-pointer bg-gray-100'
            ></video>
          </Link>

          {isHover && (
            <div
              className='absolute bottom-6 left-10 md:left-14 lg:left-0 flex 
            gap-10 lg:justify-between w-[100px] md:w-[50px] p-3 cursor-pointer '
            >
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setIsMuted(false)}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsMuted(true)}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

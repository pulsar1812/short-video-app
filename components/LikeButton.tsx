import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '../store/authStore'

interface LikeButtonProps {
  likes: any[]
  handleLike: () => void
  handleDislike: () => void
}

export default function LikeButton({
  likes,
  handleLike,
  handleDislike,
}: LikeButtonProps) {
  const [alreadyLiked, setAlreadyLiked] = useState(false)

  const { userProfile }: any = useAuthStore()

  const filteredLikes = likes?.filter((item) => item._ref === userProfile?._id)

  useEffect(() => {
    if (filteredLikes?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [filteredLikes, likes])

  return (
    <div className='gap-6'>
      <div className='flex flex-col justify-center items-center mt-4 cursor-pointer'>
        {alreadyLiked ? (
          <div
            onClick={handleDislike}
            className='bg-primary text-[#F51997] rounded-full p-2 md:p-4'
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div
            onClick={handleLike}
            className='bg-primary rounded-full p-2 md:p-4'
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold'>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

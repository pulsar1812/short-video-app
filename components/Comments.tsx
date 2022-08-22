import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'

type CommentsProps = {
  isPostingComment: boolean
  comment: string
  setComment: Dispatch<SetStateAction<string>>
  addComment: (e: React.FormEvent) => void
  comments: CommentType[]
}

type CommentType = {
  comment: string
  length?: number
  _key: string
  postedBy: { _ref?: string; _id?: string }
}

export default function Comments({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: CommentsProps) {
  const { userProfile, allUsers } = useAuthStore()

  return (
    <div
      className='bg-[#F8F8F8] border-t-2 border-b-2 
    border-gray-200 pt-4 px-10 pb-[100px] lg:pb-0'
    >
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          comments.map((item, index) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div key={index} className='items-center p-2'>
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex gap-3 items-start'>
                          <div className='w-8 h-8'>
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              alt='user profile'
                              layout='responsive'
                              className='rounded-full'
                            />
                          </div>

                          <div className='hidden xl:block'>
                            <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                              {user.userName.replaceAll(' ', '')}
                              <GoVerified className='text-blue-400' />
                            </p>
                            <p className='capitalize text-gray-400 text-xs'>
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div>
                        <p className='text-[16px] mt-5 ml-16 mr-8'>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <div>
            <NoResults text='No comments yet! Be First to add the comment.' />
          </div>
        )}
      </div>

      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={addComment} className='flex gap-4'>
            <input
              value={comment}
              placeholder='Add comment...'
              onChange={(e) => setComment(e.target.value.trim())}
              className='bg-primary text-md font-medium w-[250px] md:w-[700px] 
              lg:w-[350px] px-6 py-4 border-2 border-gray-100 focus:outline-none 
              focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            />
            <button onClick={addComment} className='text-md text-gray-400'>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

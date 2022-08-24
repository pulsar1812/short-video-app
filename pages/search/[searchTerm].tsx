import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import { BASE_URL } from '../../utils'
import { IUser, Video } from '../../types'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import useAuthStore from '../../store/authStore'

export default function Search({ videos }: { videos: Video[] }) {
  const [isAccounts, setIsAccounts] = useState(false)

  const router = useRouter()
  const { searchTerm }: any = router.query

  const { allUsers } = useAuthStore()

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='w-full'>
      <div className='flex gap-10 w-full bg-white border-b-2 border-gray-200 mt-10 mb-10'>
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold mt-2 cursor-pointer ${accounts}`}
        >
          Accounts
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold mt-2 cursor-pointer ${isVideos}`}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className='md:mt-16'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, index: number) => (
              <Link key={index} href={`/profile/${user._id}`}>
                <div
                  className='flex gap-3 items-start font-semibold p-2 border-b-2
                 border-gray-200 rounded cursor-pointer'
                >
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      alt='user profile'
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
            ))
          ) : (
            <NoResults text={`No Account Results for "${searchTerm}"`} />
          )}
        </div>
      ) : (
        <div className='flex flex-wrap gap-6 md:justify-start md:mt-16'>
          {videos.length ? (
            videos.map((post: Video, index: number) => (
              <VideoCard key={index} post={post} />
            ))
          ) : (
            <NoResults text={`No Video Results for "${searchTerm}"`} />
          )}
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({
  params: { searchTerm },
}: {
  params: { searchTerm: string }
}) {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props: { videos: res.data },
  }
}

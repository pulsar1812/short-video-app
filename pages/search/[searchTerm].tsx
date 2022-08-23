import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import useAuthStore from '../../store/authStore'

export default function Search({ videos }: { videos: Video[] }) {
  const [isAccounts, setIsAccounts] = useState(false)

  const router = useRouter()
  const { searchTerm }: any = router.query

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'

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
        <div>ACCOUNTS</div>
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

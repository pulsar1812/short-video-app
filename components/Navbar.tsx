import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

import Logo from '../utils/tiktik-logo.png'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'

export default function Navbar() {
  const [user, setUser] = useState<IUser | null>()
  const [searchValue, setSearchValue] = useState('')
  const { userProfile, addUser, removeUser } = useAuthStore()

  const router = useRouter()

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
          <Image
            src={Logo}
            alt='TikTik'
            layout='responsive'
            className='cursor-pointer'
          />
        </div>
      </Link>

      {/* Search */}
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute top-10 -left-20 md:static bg-white'
        >
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search accounts and videos'
            className='w-[300px] md:w-[350px] bg-primary md:text-md 
            font-medium p-3 border-2 border-gray-100
            focus:border-gray-300 focus:outline-none rounded-full'
          />
          <button
            onClick={handleSearch}
            className='absolute top-4 right-6 md:right-5 text-2xl 
            text-gray-400 pl-4 border-l-2 border-gray-300'
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {user ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' />
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {user.image && (
              <Link href='/'>
                <>
                  <Image
                    src={user.image}
                    width={40}
                    height={40}
                    alt='profile photo'
                    className='rounded-full cursor-pointer'
                  />
                </>
              </Link>
            )}
            <button
              type='button'
              className='px-2'
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <AiOutlineLogout color='red' fontSize={22} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  )
}

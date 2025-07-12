import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container px-3 2xl:px-20 mx-auto mt-8 mb-14'>
      <div className='relative bg-gradient-to-r from-violet-50 to-purple-50 p-10 md:p-14 lg:px-16 lg:py-30 rounded-lg flex justify-start items-center'>
        <div>
            <h2 className='sm:text-4xl text-3xl font-bold mb-8 max-w-md'>Download Mobile App for Better Experience</h2>
            <div className='flex items-center gap-4 mt-8'>
                <a className='inline-block'>
                    <img className='h-12' src={assets.play_store} alt="play-store" />
                </a>
                <a className='inline-block'>
                    <img className='h-12' src={assets.app_store} alt="app-store" />
                </a>
            </div>
        </div>
        <img className='w-80 absolute bottom-0 lg:right-20 xl:right-24 max-lg:hidden' src={assets.app_main_img} alt="img"/>
      </div>
    </div>
  )
}

export default AppDownload

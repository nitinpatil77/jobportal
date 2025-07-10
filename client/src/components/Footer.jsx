import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='container 2xl:px-20 px-3 mx-auto mb-8 mt-16'>
            <div className='flex justify-between items-center'>
                <div className='flex justify-start items-center gap-3'>
                    <img width={160} src={assets.logo} alt="logo" />
                    <p className='flex-1 border-l-2 border-gray-400 text-base text-gray-500 min-lg:pl-8 min-lg:ml-4 pl-5 ml-3 max-sm:hidden'>copyright insiderJobs &nbsp; | &nbsp; All rights reserved.</p>
                </div>
                <div className='flex justify-end items-center gap-3 max-sm:gap-2'>
                    <img width={38} src={assets.facebook_icon} alt="facebook" />
                    <img width={38} src={assets.twitter_icon} alt="twitter" />
                    <img width={38} src={assets.instagram_icon} alt="instagram" />
                </div>
            </div>
        </div>
    )
}

export default Footer

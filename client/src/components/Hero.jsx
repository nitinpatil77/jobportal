import React, { useContext, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setIsSearched, setSearchFilter } = useContext(AppContext);

    const titleRef = useRef();
    const locationRef = useRef();

    const onSearch = ()=>{

       setSearchFilter({
          title:titleRef.current.value,
          location:locationRef.current.value
       });

       setIsSearched(true);
    }

    return (
        <div className='container px-3 mx-auto 2xl:px-20 my-10'>
            <div className='bg-gradient-to-r from-[#4F0487] to-[#130121] py-16 text-white text-center rounded-xl max-sm:px-2'>
                <h2 className='text-3xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
                <p className='mb-8 max-w-xl mx-auto text-[15px] font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
                <div className='flex max-sm:flex-col items-center justify-between bg-white rounded text-gray-600 max-w-xl px-4 max-sm:py-4 mx-4 sm:mx-auto max-sm:gap-2'>
                    <div className='flex items-center max-sm:w-full'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt="search-icon" />
                        <input type="text"
                            placeholder='search for jobs'
                            className='max-sm:text-xs p-2 rounded outline-none w-full bg-transparent'
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex items-center max-sm:w-full'>
                        <img className='h-4 sm:h-5 mr-1' src={assets.location_icon} alt="location-icon" />
                        <input type="text"
                            placeholder='location'
                            className='max-sm:text-xs p-2 rounded outline-none w-full bg-transparent'
                            ref={locationRef}
                        />
                    </div>
                    <button onClick={onSearch} className='bg-blue-600 px-8 py-2 rounded text-white my-2 max-sm:w-full'>Search</button>
                </div>
            </div>
            <div className='border border-gray-300 mt-12 max-sm:px-3 max-sm:py-5 p-6 rounded-md flex'>
                <div className='flex justify-center items-center gap-10 lg:gap-16 flex-wrap'>
                    <p className='font-medium'>Trusted by</p>
                    <img className='h-6' src={assets.microsoft_logo} alt="Company Logo" />
                    <img className='h-6' src={assets.walmart_logo} alt="Company Logo" />
                    <img className='h-6' src={assets.accenture_logo} alt="Company Logo" />
                    <img className='h-6' src={assets.samsung_logo} alt="Company Logo" />
                    <img className='h-6' src={assets.amazon_logo} alt="Company Logo" />
                    <img className='h-6' src={assets.adobe_logo} alt="Company Logo" />
                </div>
            </div>
        </div>
    )
}

export default Hero

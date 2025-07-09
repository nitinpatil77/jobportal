import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobLocations, jobsData } from '../assets/assets';
import { JobCategories } from '../assets/assets'
import JobCard from './JobCard';

const Joblist = () => {

    const { searchFilter, setSearchFilter, jobsData } = useContext(AppContext);
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 min-lg:py-6'>
            {/* sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-4 mb-4'>
                {/* search filter hero component */}
                {(searchFilter.title !== '' || searchFilter.location !== '') && (
                    <>
                        <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                        <div className='mb-4 text-gray-600 flex justify-start items-center gap-2.5 flex-wrap'>
                            {searchFilter.title && (
                                <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                    {searchFilter.title}
                                    <img onClick={() => {
                                        setSearchFilter((prev) => {
                                            return { ...prev, title: '' }
                                        })
                                    }} className='cursor-pointer' src={assets.cross_icon} alt="cross icon" />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className='inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                    {searchFilter.location}
                                    <img onClick={() => {
                                        setSearchFilter((prev) => {
                                            return { ...prev, location: '' }
                                        })
                                    }} className='cursor-pointer' src={assets.cross_icon} alt="cross icon" />
                                </span>
                            )}
                        </div>
                    </>
                )}

                <button onClick={()=>{setShowFilters((prev)=> !prev)}} className='px-4 py-2 mt-4 text-gray-600 shadow border border-gray-200 min-lg:hidden'>
                    {showFilters ? 'close' : 'filters'}
                </button>

                {/*categories filter */}
                <div className={`${showFilters ? '' : 'max-lg:hidden'} mt-8`}>
                    <h3 className='font-medium text-lg mb-4'>Search by Categories</h3>
                    <ul className='space-y-4 text-gray-600 max-lg:flex max-lg:flex-row max-lg:gap-4 max-lg:flex-wrap max-lg:mt-2'>
                        {
                            JobCategories.map((category, index) =>
                            (
                                <li key={index} className='flex gap-3 items-center max-lg:mb-1'>
                                    <input className='scale-125' type="checkbox" name='' id='' />
                                    {category}
                                </li>
                            )
                            )
                        }
                    </ul>
                </div>

                {/*location filter */}
                <div className={`${showFilters ? '' : 'max-lg:hidden'} mt-8`}>
                    <h3 className='font-medium text-lg mb-4'>Search by Locations</h3>
                    <ul className='space-y-4 text-gray-600 max-lg:flex max-lg:flex-row max-lg:gap-4 max-lg:flex-wrap max-lg:mt-2'>
                        {
                            JobLocations.map((category, index) =>
                            (
                                <li key={index} className='flex gap-3 items-center max-lg:mb-1'>
                                    <input className='scale-125' type="checkbox" name='' id='' />
                                    {category}
                                </li>
                            )
                            )
                        }
                    </ul>
                </div>
            </div>

            {/* job list */}
            <section className='w-full text-gray-800 max-xl:px-4 max-lg:mt-6'>
                <h3 className='font-semibold text-3xl mb-4' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8'>
                    {
                        jobsData.map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default Joblist

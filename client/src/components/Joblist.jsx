import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobLocations, jobsData } from '../assets/assets';
import { JobCategories } from '../assets/assets'
import JobCard from './JobCard';

const Joblist = () => {

    const { searchFilter, setSearchFilter, jobsData } = useContext(AppContext);
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

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

                <button onClick={() => { setShowFilters((prev) => !prev) }} className='px-4 py-2 mt-4 text-gray-600 shadow border border-gray-200 min-lg:hidden'>
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
            <section className='w-full text-gray-800 max-xl:px-4 max-lg:mt-6' id='job-list'>
                <h3 className='font-semibold text-3xl mb-4'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8'>
                    {
                        jobsData.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    }
                </div>

                {/* pagination */}
                {jobsData.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        {/* Previous Arrow */}
                        <div>
                            <img
                                onClick={() => {
                                    setCurrentPage((prev) => (prev - 1 < 1 ? prev : prev - 1));
                                }}
                                className='mx-5 cursor-pointer'
                                src={assets.left_arrow_icon}
                                alt="left arrow"
                            />
                        </div>

                        {/* Pagination buttons */}
                        {
                            (() => {
                                const totalPages = Math.ceil(jobsData.length / 6);
                                const maxVisiblePages = 10;
                                let startPage = Math.max(currentPage - 4, 1);
                                let endPage = startPage + maxVisiblePages - 1;

                                if (endPage > totalPages) {
                                    endPage = totalPages;
                                    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
                                }

                                return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                                    <a key={pageNum} href="#job-list">
                                        <button
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === pageNum ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    </a>
                                ));
                            })()
                        }

                        {/* Next Arrow */}
                        <div>
                            <img
                                onClick={() => {
                                    setCurrentPage((prev) =>
                                        prev + 1 > Math.ceil(jobsData.length / 6) ? prev : prev + 1
                                    );
                                }}
                                className='mx-5 cursor-pointer'
                                src={assets.right_arrow_icon}
                                alt="right arrow"
                            />
                        </div>
                    </div>
                )}


            </section>
        </div>
    )
}

export default Joblist

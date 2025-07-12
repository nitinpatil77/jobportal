import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobLocations, JobCategories } from '../assets/assets'
import JobCard from './JobCard'

const Joblist = () => {
    const { searchFilter, setSearchFilter, jobsData } = useContext(AppContext);

    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [filterJobs, setFilterJobs] = useState([]);

    const jobListRef = useRef(null);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleLocationChange = (location) => {
        setSelectedLocations(prev =>
            prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
        );
    };

    useEffect(() => {

        let filtered = [...jobsData];

        if (searchFilter.title && searchFilter.title !== 'All') {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
            );
        }

        if (searchFilter.location && searchFilter.location !== 'pune') {
            filtered = filtered.filter(job =>
                job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(job =>
                selectedCategories.includes(job.category)
            );
        }

        if (selectedLocations.length > 0) {
            filtered = filtered.filter(job =>
                selectedLocations.includes(job.location)
            );
        }

        setFilterJobs(filtered);
        setCurrentPage(1);
    }, [jobsData, searchFilter, selectedCategories, selectedLocations]);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
        if (jobListRef.current) {
            jobListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const totalPages = Math.ceil(filterJobs.length / 6);
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 min-lg:py-6'>
            {/* Sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-4 mb-4'>
                {(searchFilter.title || searchFilter.location) && (
                    <>
                        <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                        <div className='mb-4 text-gray-600 flex justify-start items-center gap-2.5 flex-wrap'>
                            {searchFilter.title && (
                                <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                    {searchFilter.title}
                                    <img
                                        onClick={() =>
                                            setSearchFilter(prev => ({ ...prev, title: '' }))
                                        }
                                        className='cursor-pointer'
                                        src={assets.cross_icon}
                                        alt="cross icon"
                                    />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className='inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                    {searchFilter.location}
                                    <img
                                        onClick={() =>
                                            setSearchFilter(prev => ({ ...prev, location: '' }))
                                        }
                                        className='cursor-pointer'
                                        src={assets.cross_icon}
                                        alt="cross icon"
                                    />
                                </span>
                            )}
                        </div>
                    </>
                )}

                <button
                    onClick={() => setShowFilters(prev => !prev)}
                    className='px-4 py-2 mt-4 text-gray-600 shadow border border-gray-200 min-lg:hidden'
                >
                    {showFilters ? 'close' : 'filters'}
                </button>

                {/* Category Filter */}
                <div className={`${showFilters ? '' : 'max-lg:hidden'} mt-8`}>
                    <h3 className='font-medium text-lg mb-4'>Search by Categories</h3>
                    <ul className='space-y-4 text-gray-600 max-lg:flex max-lg:flex-row max-lg:gap-4 max-lg:flex-wrap max-lg:mt-2'>
                        {JobCategories.map((category, index) => (
                            <li key={index} className='flex gap-3 items-center max-lg:mb-1'>
                                <input
                                    className='scale-125'
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={`${showFilters ? '' : 'max-lg:hidden'} mt-8`}>
                    <h3 className='font-medium text-lg mb-4'>Search by Locations</h3>
                    <ul className='space-y-4 text-gray-600 max-lg:flex max-lg:flex-row max-lg:gap-4 max-lg:flex-wrap max-lg:mt-2'>
                        {JobLocations.map((location, index) => (
                            <li key={index} className='flex gap-3 items-center max-lg:mb-1'>
                                <input
                                    className='scale-125'
                                    type="checkbox"
                                    checked={selectedLocations.includes(location)}
                                    onChange={() => handleLocationChange(location)}
                                />
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Job List */}
            <section
                className='w-full text-gray-800 max-xl:px-4 max-lg:mt-6'
                ref={jobListRef}
            >
                <h3 className='font-semibold text-3xl mb-4'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8'>
                    {filterJobs.length === 0 ? (
                        <p className='col-span-full text-center text-gray-500 text-lg'>
                            No jobs found matching your criteria.
                        </p>
                    ) : (
                        filterJobs
                            .slice((currentPage - 1) * 6, currentPage * 6)
                            .map((job, index) => <JobCard key={index} job={job} />)
                    )}
                </div>

                {/* Pagination */}
                {filterJobs.length > 6 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <img
                            onClick={() =>
                                setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))
                            }
                            className={`mx-5 cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                            src={assets.left_arrow_icon}
                            alt="left arrow"
                        />

                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(pageNum => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === pageNum ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <img
                            onClick={() =>
                                setCurrentPage(prev =>
                                    prev < totalPages ? prev + 1 : prev
                                )
                            }
                            className={`mx-5 cursor-pointer ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                            src={assets.right_arrow_icon}
                            alt="right arrow"
                        />
                    </div>
                )}
            </section>
        </div>
    )
}

export default Joblist

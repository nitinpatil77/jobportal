import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';

const ApplyJob = () => {
  const { id } = useParams();
  const { jobsData } = useContext(AppContext);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const selectedJob = jobsData.find(job => job._id === id);
    if (selectedJob) {
      setJob(selectedJob);
    }
  }, [jobsData, id]);

  console.log(job)


  if (!job) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='container min-h-screen py-10 px-3 2xl:px-20 max-lg:py-7 mx-auto'>
        <div className='w-full flex justify-center items-start bg-sky-50 min-xl:px-14 min-lg:px-7 min-xl:py-20 min-lg:py-16 max-sm:py-10 py-14 px-5 rounded-lg border-1 border-sky-400
        max-lg:flex-col max-lg:gap-4'>
          <div className='flex justify-start items-start gap-5 max-sm:gap-1 min-lg:flex-1 max-sm:flex-col'>
            <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200 m-0' src={assets.company_icon} alt="company-icon" />
            <div className='flex flex-col justify-start items-start max-sm:gap-2'>
              <h3 className='text-2xl sm:text-4xl font-medium text-neutral-700 mt-1'>{job.title}</h3>
              <div className='flex justify-center items-center gap-10 text-gray-600 text-[18px] mt-3 max-sm:flex-wrap max-sm:justify-start max-sm:gap-4'>
                <span className='flex justify-start items-center gap-3'>
                  <img src={assets.suitcase_icon} alt="suitcase_icon" />
                  {job.companyId.name}
                </span>
                <span className='flex justify-start items-center gap-3'>
                  <img src={assets.location_icon} alt="location_icon" />
                  {job.location}
                </span>
                <span className='flex justify-start items-center gap-3'>
                  <img src={assets.person_icon} alt="person_icon" />
                  {job.level}
                </span>
                <span className='flex justify-start items-center gap-3'>
                  <img src={assets.money_icon} alt="money_icon" />
                  CTC:&nbsp;{kconvert.convertTo(job.salary)}
                </span>
              </div>
            </div>
          </div>
          <div className='min-lg:w-1/4 flex flex-col justify-end items-center gap-3 max-lg:flex-row max-lg:gap-7 max-lg:mt-4 max-sm:flex-wrap max-sm:justify-start max-sm:w-full max-sm:gap-3.5 
               max-sm:mt-1'>
            <button className="bg-blue-600 p-2.5 px-10 text-white rounded max-sm:w-full">Apply Now</button>
            <p className='text-gray-600 text-base max-sm:ml-1'>Posted {moment(job.date).fromNow()}</p>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:mt-14 max-lg:mt-8'>
          {/* job discription */}
          <div className='w-full lg:w-2/3'>
            <h3 className='font-bold text-2xl mb-4'>Job description</h3>
            <div className='rich-text' dangerouslySetInnerHTML={{ __html: job.description }}></div>
            <button className="bg-blue-600 p-2.5 px-14 text-white rounded max-sm:w-full lg:mt-10 max-lg:mt-7">Apply Now</button>
          </div>
          {/* more job side pannel */}
          <div className='w-full lg:w-1/3 lg:mt-0 lg:ml-8 space-y-5 max-lg:mt-7'>
            <h2 className='font-bold text-2xl mb-4 max-lg:mb-6'>More Jobs</h2>
            {
              jobsData
                .filter(j => j._id !== job._id)
                .sort((a, b) => new Date(b.date) - new Date(a.date))  // sort by latest
                .slice(0, 3)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))
            }
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ApplyJob;

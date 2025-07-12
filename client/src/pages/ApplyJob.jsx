import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';

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
        <Loading/>
      </div>
    );
  }

  return (
    <>
      <Navbar/>
      <div className='container min-h-screen py-10 px-3 2xl:px-20 mx-auto'>
        <div className='w-full flex justify-center items-center'>
          <div className='w-1/2'>
            <div>
               <img src={assets.company_icon} alt="company-icon"/>
               <div>
                  <h3>{job.title}</h3>
                  <div>
                    <span>
                      <img src={assets.suitcase_icon} alt="suitcase_icon"/>
                      {job.companyId.name}
                    </span>
                    <span>
                      <img src={assets.location_icon} alt="location_icon"/>
                      {job.location}
                    </span>
                    <span>
                      <img src={assets.person_icon} alt="person_icon"/>
                      {job.level}
                    </span>
                    <span>
                      <img src={assets.money_icon} alt="money_icon"/>
                      CTC:{kconvert.convertTo(job.salary)}
                    </span>
                  </div>
               </div>
            </div>
          </div>
          <div>
            <button>Apply Now</button>
            <p>Posted {moment(job.date).fromNow()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyJob;

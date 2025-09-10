import React from 'react'
import { manageJobsData } from '../assets/assets'
import Movement from "moment"

const ManageJobs = () => {
  return (
    <div className='container mx-auto'>
      <div className='w-[75%] overflow-x-auto'>
        <table className='border border-gray-400 w-full'>
          <thead>
            <tr>
              <th className='border-b border-gray-400 py-4 px-4 text-left'>#</th>
              <th className='border-b border-gray-400 py-4 px-4 text-left'>job Title</th>
              <th className='border-b border-gray-400 py-4 px-4 text-left'>Date</th>
              <th className='border-b border-gray-400 py-4 px-4 text-left'>Location</th>
              <th className='border-b border-gray-400 py-4 px-4 text-left'>Applicant</th>
              <th className='border-b border-gray-400 py-4 px-4 text-left'>visible</th>
            </tr>
          </thead>
          <tbody>
            {
              manageJobsData.map((jobData, index) => (
                <tr key={index} className='border border-gray-400 text-gray-700'>
                  <td className='text-left py-4 px-4'>{index + 1}</td>
                  <td className='text-left py-4 px-4'>{jobData.title}</td>
                  <td className='text-left py-4 px-4'>{Movement(jobData.date).format('LL')}</td>
                  <td className='text-left py-4 px-4'>{jobData.location}</td>
                  <td className='text-left py-4 px-8'>{jobData.applicants}</td>
                  <td className='text-left py-4 px-8'>
                    <input type="checkbox" checked />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {/* <div className='text-right mt-3'>
          <button className="bg-black text-white px-4 py-2 rounded mt-4">Add New Job</button>
        </div> */}
      </div>
    </div>
  )
}

export default ManageJobs

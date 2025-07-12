import React, { createContext, useEffect, useState } from 'react'
import { getJobs } from '../services/getJobs';


export const AppContext = createContext();

export const AppContextProvide = ({ children }) => {

  const [searchFilter, setSearchFilter] = useState({
    title: 'All',
    location: 'pune'
  });

  const [isSearched,setIsSearched] = useState(false);

  const [jobsData, setjobsData] = useState([]);

  useEffect(()=>{
    setjobsData([...getJobs()]);
  },[]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobsData, 
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}



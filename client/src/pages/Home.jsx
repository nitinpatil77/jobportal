import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Joblist from '../components/Joblist'

const Home = () => {  

  return (
    <div>
      <Navbar/> 
      <Hero/>
      <Joblist/>
    </div>
  )
}

export default Home

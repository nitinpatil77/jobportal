import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Joblist from '../components/Joblist'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'

const Home = () => {  

  return (
    <div>
      <Navbar/> 
      <Hero/>
      <Joblist/>
      <AppDownload/>
      <Footer/>
    </div>
  )
}

export default Home

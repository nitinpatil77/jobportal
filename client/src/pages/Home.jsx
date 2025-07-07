import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Home = () => {  

  return (
    <div>
      <Navbar/> 
      <Hero/>
    </div>
  )
}

export default Home

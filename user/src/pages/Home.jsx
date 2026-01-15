import React from 'react'
import Hero from '../components/Hero'
import Listing from '../components/Listing'
import Plans from '../components/Plans'
import Cta from '../components/Cta'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
        <Hero />
        <Listing />
        <Plans />
        <Cta /> 
        <Footer />
    </div>
  )
}

export default Home
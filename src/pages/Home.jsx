import React from 'react'
import Carousels from '../components/Carousels'
import AboutUs from '../components/AboutUs'
import WhatWeOffer from '../components/WhatWeOffer'
import Working from '../components/Working'
import Testimonials from '../components/Testimonials'
import NewUpdate from '../components/NewUpdate'

const Home = () => {
  return (
    <div>
      <Carousels/>

      <AboutUs/>

      <WhatWeOffer/>

      <Working/>

      <Testimonials/>

      <NewUpdate/>
    </div>
  )
}

export default Home
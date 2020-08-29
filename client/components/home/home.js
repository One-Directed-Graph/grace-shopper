import React from 'react'
import {HomeCarousel} from './HomeCarousel'
import WhyUs from './whyUs'
// import {HomeFooter} from './HomeFooter'

export function Home() {
  return (
    <div>
      <div className="preloader">
        <div className="lds-ellipsis">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <HomeCarousel />
      <WhyUs />
    </div>
  )
}

import React from 'react'
import {HomeCarousel} from './HomeCarousel'
import WhyUs from './whyUs'
import {CategoryBar} from './categoryBar'
import {ShopInfo} from './ShopInfo'
import {Footer} from './Footer'

export function Home() {
  return (
    <div>
      <HomeCarousel />
      <WhyUs />
      <CategoryBar />
      <ShopInfo />
    </div>
  )
}

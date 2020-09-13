import React from 'react'
import {HomeCarousel} from './HomeCarousel'
import WhyUs from './whyUs'
import {CategoryBar} from './categoryBar'
import {ShopInfo} from './ShopInfo'
import {Footer} from './Footer'
import {Component} from 'react'

export class Home extends React.Component {
  componentWillUnmount() {
    var scripts = document.getElementsByTagName('script')
    //console.log(scripts)
    for (var i = scripts.length; i--; ) {
      if (scripts[i].title == 'aleks') {
        scripts[i].parentNode.removeChild(scripts[i])
      }
    }
    // script.parentNode.removeChild(theScript)
  }
  componentDidMount() {
    const script = document.createElement('script')
    script.defer = true
    script.title = 'aleks'
    script.src = '/js/scripts.js'
    script.async = true
    document.body.appendChild(script)
  }
  render() {
    return (
      <div>
        <HomeCarousel />
        <WhyUs />
        <CategoryBar />
        <ShopInfo />
      </div>
    )
  }
}

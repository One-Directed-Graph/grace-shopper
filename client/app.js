import React from 'react'
import {Navbarclass, Checkout} from './components'
import {HomeFooter} from './components/home/HomeFooter'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbarclass />
      <Routes />
      {/* <HomeFooter /> */}
    </div>
  )
}

export default App

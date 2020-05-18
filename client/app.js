import React from 'react'
import {HomeFooter} from './components/home/HomeFooter'
import {Navbarclass} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbarclass />
      <Routes />
      <HomeFooter />
    </div>
  )
}

export default App

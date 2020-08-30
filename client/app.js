import React from 'react'
import {Navbarclass, Checkout} from './components'
import {HomeFooter} from './components/home/HomeFooter'
import Routes from './routes'
// import '../public/js/bootstrap.min.js'
// import '../public/js/popper.min.js'
// import '../public/js/owl.carousel.min.js'
// // import '../node_modules/owl.carousel/dist/assets/owl.carousel.min.css'
// //import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js.map'
// import '../public/js/magnific-popup.min.js'
// import '../public/js/waypoints.min.js'
// import '../public/js/parallax.js'
// import '../public/js/imagesloaded.pkgd.min.js'
// import '../public/js/scripts.js'
// import '../public/js/jquery.elevatezoom.js'
// import '../public/js/slick.min.js'
// import '../public/js/jquery.dd.min.js'
// import '../public/js/isotope.min.js'

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

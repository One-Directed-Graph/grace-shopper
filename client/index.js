import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
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

import './socket'
//import '../node_modules/font-awesome/css/font-awesome.min.css'
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

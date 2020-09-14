import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Footer = ({user, isLoggedIn}) => {
  return (
    <div>
      <footer className="footer_dark">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget">
                  <div className="footer_logo">
                    <Link to="/">
                      <img
                        src="/images/imageSite/maskerade_logo_black.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="widget">
                  <h6 className="widget_title">Useful Links</h6>
                  <ul className="widget_links">
                    <li>
                      <Link to="/products/1?sortBy=AtoZ">Products</Link>
                    </li>
                    <li>
                      <Link to="/contactpage">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="widget">
                  <h6 className="widget_title">Category</h6>
                  <ul className="widget_links">
                    <li>
                      <Link to="/category/handmade/1">Handmade</Link>
                    </li>
                    <li>
                      <Link to="/category/fashion/1">Fashion</Link>
                    </li>
                    <li>
                      <Link to="/category/medical/1">Medical</Link>
                    </li>
                  </ul>
                </div>
              </div>
              {isLoggedIn && (
                <div className="col-lg-2 col-md-6 col-sm-6">
                  <div className="widget">
                    <h6 className="widget_title">My Account</h6>
                    <ul className="widget_links">
                      <li>
                        <Link to="/account">My Account</Link>
                      </li>

                      <li>
                        <Link to="/account/orders">Orders History</Link>
                      </li>
                      <li>
                        <Link to="#">Order Tracking</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="widget">
                  <h6 className="widget_title">Contact Info</h6>
                  <ul className="contact_info contact_info_light">
                    <li>
                      <i className="ti-location-pin"></i>
                      <p>123 Street, Old Trafford, New South London , UK</p>
                    </li>
                    <li>
                      <i className="ti-email"></i>
                      <a href="mailto:info@sitename.com">info@maskerade.com</a>
                    </li>
                    <li>
                      <i className="ti-mobile"></i>
                      <p>+ 123-456-7890</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom_footer border-top-tran">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p className="mb-md-0 text-center text-md-left">
                  © 2020 All Rights Reserved by Maskerade
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <a href="#" className="scrollup" style={{display: 'none'}}>
        <i className="ion-ios-arrow-up"></i>
      </a>
    </div>
  )
}
const mapState = ({user}) => {
  return {
    user,
    isLoggedIn: !!user.id,
  }
}
export default connect(mapState)(Footer)

import React from 'react'

export const Footer = () => {
  return (
    <div>
      <footer className="footer_dark">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget">
                  <div className="footer_logo">
                    <a href="#">
                      <img
                        src="/images/imageSite/maskerade_logo_white.png"
                        alt="logo"
                      />
                    </a>
                  </div>
                  <p>
                    If you are going to use of Lorem Ipsum need to be sure there
                    isn't hidden of text
                  </p>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="widget">
                  <h6 className="widget_title">Useful Links</h6>
                  <ul className="widget_links">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">Location</a>
                    </li>
                    <li>
                      <a href="#">Affiliates</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="widget">
                  <h6 className="widget_title">Category</h6>
                  <ul className="widget_links">
                    <li>
                      <a href="#">Men</a>
                    </li>
                    <li>
                      <a href="#">Woman</a>
                    </li>
                    <li>
                      <a href="#">Kids</a>
                    </li>
                    <li>
                      <a href="#">Best Saller</a>
                    </li>
                    <li>
                      <a href="#">New Arrivals</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6">
                <div className="widget">
                  <h6 className="widget_title">My Account</h6>
                  <ul className="widget_links">
                    <li>
                      <a href="#">My Account</a>
                    </li>
                    <li>
                      <a href="#">Discount</a>
                    </li>
                    <li>
                      <a href="#">Returns</a>
                    </li>
                    <li>
                      <a href="#">Orders History</a>
                    </li>
                    <li>
                      <a href="#">Order Tracking</a>
                    </li>
                  </ul>
                </div>
              </div>
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
                      <a href="mailto:info@sitename.com">info@sitename.com</a>
                    </li>
                    <li>
                      <i className="ti-mobile"></i>
                      <p>+ 457 789 789 65</p>
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
                  © 2020 All Rights Reserved by Bestwebcreator
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

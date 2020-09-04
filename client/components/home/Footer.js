import React from 'react'

export const Footer = () => {
  return (
    <div>
      <footer class="footer_dark">
        <div class="footer_top">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                  <div class="footer_logo">
                    <a href="#">
                      <img
                        src="/images/imageSite/maskerade_logo_black.png"
                        alt="logo"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-6">
                <div class="widget">
                  <h6 class="widget_title">Useful Links</h6>
                  <ul class="widget_links">
                    <li>
                      <a href="#">Products</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-6">
                <div class="widget">
                  <h6 class="widget_title">Category</h6>
                  <ul class="widget_links">
                    <li>
                      <a href="#">Handmade</a>
                    </li>
                    <li>
                      <a href="#">Fashion</a>
                    </li>
                    <li>
                      <a href="#">Medical</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-2 col-md-6 col-sm-6">
                <div class="widget">
                  <h6 class="widget_title">My Account</h6>
                  <ul class="widget_links">
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
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="widget">
                  <h6 class="widget_title">Contact Info</h6>
                  <ul class="contact_info contact_info_light">
                    <li>
                      <i class="ti-location-pin"></i>
                      <p>123 Street, Old Trafford, New South London , UK</p>
                    </li>
                    <li>
                      <i class="ti-email"></i>
                      <a href="mailto:info@sitename.com">info@maskerade.com</a>
                    </li>
                    <li>
                      <i class="ti-mobile"></i>
                      <p>+ 123-456-7890</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_footer border-top-tran">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <p class="mb-md-0 text-center text-md-left">
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

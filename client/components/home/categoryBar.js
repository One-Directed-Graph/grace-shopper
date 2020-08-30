import React from 'react'
import {Link} from 'react-router-dom'

export const CategoryBar = () => {
  return (
    <div>
      <div className="preloader">
        <div className="lds-ellipsis">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="section pb_20">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="single_banner">
                <img
                  src="/images/imageSite/shop_banner_img1.jpg"
                  alt="shop_banner_img1"
                />
                <div className="single_banner_info">
                  <h5 className="single_bn_title1">Super Sale</h5>
                  <h3 className="single_bn_title">New Collection</h3>
                  <a href="shop-left-sidebar.html" className="single_bn_link">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="single_banner">
                <img
                  src="/images/imageSite/shop_banner_img2.jpg"
                  alt="shop_banner_img2"
                />
                <div className="single_banner_info">
                  <h3 className="single_bn_title">New Season</h3>
                  <h4 className="single_bn_title1">Sale 40% Off</h4>
                  <a href="shop-left-sidebar.html" className="single_bn_link">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="single_banner">
                <img
                  src="/images/imageSite/shop_banner_img2.jpg"
                  alt="shop_banner_img2"
                />
                <div className="single_banner_info">
                  <h3 className="single_bn_title">New Season</h3>
                  <h4 className="single_bn_title1">Sale 40% Off</h4>
                  <a href="shop-left-sidebar.html" className="single_bn_link">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

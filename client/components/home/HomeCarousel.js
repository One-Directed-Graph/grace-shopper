import React from 'react'
import {Link} from 'react-router-dom'
import {Carousel, Nav} from 'react-bootstrap'

export const HomeCarousel = () => {
  return (
    <div>
      <div className="preloader">
        <div className="lds-ellipsis">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="banner_section slide_medium shop_banner_slider staggered-animation-wrap">
        <div
          id="carouselExampleControls"
          className="carousel slide carousel-fade light_arrow"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div
              className="carousel-item active background_bg"
              data-img-src="images/banner1.jpg"
            >
              {/* <img
              src="images/banner1.jpg"
              className="carousel-item active background_bg"
            /> */}
              <div className="banner_slide_content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-7 col-9">
                      <div className="banner_content overflow-hidden">
                        <h5
                          className="mb-3 staggered-animation font-weight-light"
                          data-animation="slideInLeft"
                          data-animation-delay="0.5s"
                        >
                          Designed to Filter 95% of Airborne Particles
                        </h5>
                        <h2
                          className="staggered-animation"
                          data-animation="slideInLeft"
                          data-animation-delay="1s"
                        >
                          N95 Respirator Mask
                        </h2>
                        <Link
                          className="btn btn-fill-out rounded-0 staggered-animation text-uppercase"
                          to="/products/1/?sortBy=AtoZ"
                          data-animation="slideInLeft"
                          data-animation-delay="1.5s"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="carousel-item background_bg"
              data-img-src="images/banner2.jpg"
            >
              <div className="banner_slide_content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="banner_content overflow-hidden">
                        <h5
                          className="mb-3 staggered-animation font-weight-light"
                          data-animation="slideInLeft"
                          data-animation-delay="0.5s"
                        >
                          Help protect yourself and community with a custom face
                          mask
                        </h5>
                        <h2
                          className="staggered-animation"
                          data-animation="slideInLeft"
                          data-animation-delay="1s"
                        >
                          Handmade Masks
                        </h2>
                        <Link
                          className="btn btn-fill-out rounded-0 staggered-animation text-uppercase"
                          to="/products/1/?sortBy=AtoZ"
                          data-animation="slideInLeft"
                          data-animation-delay="1.5s"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="carousel-item background_bg"
              data-img-src="/images/banner3.jpg"
            >
              <div className="banner_slide_content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="banner_content overflow-hidden">
                        <h5
                          className="mb-3 staggered-animation font-weight-light"
                          data-animation="slideInLeft"
                          data-animation-delay="0.5s"
                        >
                          {' '}
                          Get face masks in an assortment of on-trend colors and
                          designs
                        </h5>
                        <h2
                          className="staggered-animation"
                          data-animation="slideInLeft"
                          data-animation-delay="1s"
                        >
                          Fashion Masks
                        </h2>
                        <Link
                          className="btn btn-fill-out rounded-0 staggered-animation text-uppercase"
                          to="/products/1/?sortBy=AtoZ"
                          data-animation="slideInLeft"
                          data-animation-delay="1.5s"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <i className="ion-chevron-left"></i>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <i className="ion-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

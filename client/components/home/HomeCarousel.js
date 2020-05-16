import React from 'react'
import {Link} from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

export const HomeCarousel = () => {
  return (
    <div id="home-carousel">
      <Link to="/products/1/AtoZ">
        <Carousel>
          <Carousel.Item>
            <h1>Stop the Virus Wear Mask</h1>
          </Carousel.Item>
          <Carousel.Item>
            <h1>Protect People Around Yourself</h1>
          </Carousel.Item>
          <Carousel.Item>
            <h1>If You Must Go OutSide Wear A Mask</h1>
          </Carousel.Item>
        </Carousel>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/good-homepage.jpg"
              alt="First slide"
            />

            <h2 style={{color: '#38495e'}}>Top Quality Masks</h2>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/good-homepage2.jpg"
              alt="Second slide"
            />

            <h2 style={{color: '#38495e'}}>
              We Work With Private and Exlusive Vendors
            </h2>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/good-homapage3.jpg"
              alt="Third slide"
            />

            <h2 style={{color: '#38495e', alignSelf: 'center'}}>
              We Sell All Kinds Of Masks
            </h2>
          </Carousel.Item>
        </Carousel>
      </Link>
    </div>
  )
}

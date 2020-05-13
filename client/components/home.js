import React from 'react'
import {Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import {Nav} from 'react-bootstrap'
export function Home() {
  console.log('hello from home')
  return (
    <div>
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
              alt="Third slide"
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
      <Nav
        style={{
          backgroundColor: '#38495e',
          height: '100px',
          marginTop: '200px',
        }}
        className="footer"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/products">Products</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/login">login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/sighup" disabled>
            signup
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

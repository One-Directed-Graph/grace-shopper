import React from 'react'
import {Nav} from 'react-bootstrap'
import {HomeCarousel} from './'

export function Home() {
  const navLinks = [
    {name: 'Home', path: '/'},
    {name: 'Products', path: '/products'},
    {name: 'Login', path: '/login'},
    {name: 'Signup', path: '/signup'},
  ]
  return (
    <div>
      <HomeCarousel />
      <Nav
        style={{
          backgroundColor: '#38495e',
          height: '100px',
          marginTop: '200px',
        }}
        className="footer"
        activeKey="/home"
        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        {navLinks.map((navlink) => (
          <Nav.Item key={navlink.name}>
            <Nav.Link to={navlink.path}>{navlink.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  )
}

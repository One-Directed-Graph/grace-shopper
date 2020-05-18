import React from 'react'
import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export function HomeFooter() {
  const navLinks = [
    {name: 'Home', path: '/'},
    {name: 'Products', path: '/products'},
    {name: 'Login', path: '/login'},
    {name: 'Signup', path: '/signup'},
  ]
  return (
    <Nav
      className="footer"
      id="home-footer"
      activeKey="/home"
      // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      {navLinks.map((navlink) => (
        <Nav.Item key={navlink.name}>
          <Nav.Link as={Link} to={navlink.path}>
            {navlink.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

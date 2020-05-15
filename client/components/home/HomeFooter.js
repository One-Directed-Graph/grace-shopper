import React from 'react'
import {Nav} from 'react-bootstrap'

export function HomeFooter() {
  const navLinks = [
    {name: 'Home', path: '/'},
    {name: 'Products', path: '/products'},
    {name: 'Login', path: '/login'},
    {name: 'Signup', path: '/signup'},
  ]
  return (
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
  )
}

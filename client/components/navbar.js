import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout, getProducts, loadPage} from '../store'
import Search from './Search'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// import {render} from 'enzyme' - REMOVE?

class Navbarclass extends Component {
  componentDidMount() {
    this.props.load()
  }

  render() {
    console.log('documenta cookie', document.cookie)
    const {handleClick, isLoggedIn} = this.props

    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="navbarMain"
        >
          <Navbar.Brand as={Link} to="/">
            <img
              src="/images/MaskeradeLogoName.jpeg"
              width="220"
              height="70"
              className="d-inline-block align-top"
              alt="Maskerade logo"
            />
          </Navbar.Brand>
          {/* <Navbar.Brand as={Link} to="/">
            Maskerade
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {isLoggedIn ? (
                <Nav className="mr-auto">
                  {/* This nav links will show these links after you log in */}
                  <Nav.Link
                    as={Link}
                    to="/account"
                    style={{
                      color: ' #38495e',
                      fontWeight: '500',
                      fontSize: '120%',
                    }}
                  >
                    Account
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="#"
                    style={{
                      color: ' #38495e',
                      fontWeight: '500',
                      fontSize: '120%',
                    }}
                    onClick={() => {
                      handleClick()
                    }}
                    className="linksInNavBar"
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav className="mr-auto">
                  {/* This nav links will show these links if you are not logged in */}
                  <Nav.Link
                    as={Link}
                    to="/login"
                    style={{
                      color: ' #38495e',
                      fontWeight: '500',
                      fontSize: '120%',
                    }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/signup"
                    style={{
                      color: ' #38495e',
                      fontWeight: '500',
                      fontSize: '120%',
                    }}
                  >
                    Signup
                  </Nav.Link>
                </Nav>
              )}
              <Nav className="mr-auto"></Nav>
              <Nav.Link
                onClick={() => {
                  this.props.history.push(`/products/1?sortBy=AtoZ`)
                  this.props.loadPages(1)
                }}
                style={{
                  color: ' #38495e',
                  fontWeight: '500',
                  fontSize: '120%',
                }}
              >
                Products
              </Nav.Link>
            </Nav>
            <Search />
          </Navbar.Collapse>

          <Navbar.Brand as={Link} to="/orders">
            <img
              src="/images/shop.png"
              width="40px"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <i className="fas fa-cart-arrow-down"></i>
        </Navbar>
        <div className="hello2">
          <Image src="/images/long3.jpg" fluid style={{width: '100%'}} />
        </div>
        <hr />
        <Container fluid>
          <Row className="hello">
            <Col md={4} className="colpic">
              <Link to="/category/fashion/1" className="linksInNavBar">
                <Image
                  src="/images/manuPic3.jpeg"
                  roundedCircle
                  className="roundImages"
                />
              </Link>
            </Col>
            <Col md={4} className="colpic">
              <Link to="/category/handmade/1" className="linksInNavBar">
                <Image
                  src="/images/manuHMpic1.jpg"
                  roundedCircle
                  className="roundImages"
                />
              </Link>
            </Col>
            <Col md={4} className="colpic">
              <Link to="/category/medical/1" className="linksInNavBar">
                <Image
                  src="/images/menuMed.jpeg"
                  roundedCircle
                  className="roundImages"
                />
              </Link>
            </Col>
          </Row>
        </Container>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  const {products} = state
  return {
    isLoggedIn: !!state.user.id,
    products,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(logout())
    },
    loadPages: (pg, push) => {
      dispatch(loadPage(pg, push))
    },
    load: () => {
      dispatch(getProducts('load'))
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbarclass))

/**
 * PROP TYPES
 */
Navbarclass.propTypes = {
  // load: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

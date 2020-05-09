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
  constructor(props) {
    super()
  }
  componentDidMount() {
    // this.props.load()
  }

  render() {
    const {handleClick, isLoggedIn, products} = this.props

    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="navbarMain"
        >
          <Navbar.Brand href="/">
            <img
              src="/images/backgroundAmblem.jpg"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/">Maskerade</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {isLoggedIn ? (
            <Nav className="mr-auto">
              {/* The navbar will show these links after you log in */}
              <Nav.Link href="/account">Account</Nav.Link>
              <Nav.Link
                href="#"
                onClick={() => {
                  handleClick()
                }}
              >
                Logout
              </Nav.Link>
              <Nav.Link to="/products">Products</Nav.Link>
            </Nav>
          ) : (
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link
                  //href="/products/1"
                  onClick={() => {
                    this.props.history.push(`/products/1?sortBy=AtoZ`)
                    this.props.loadPages(1)
                  }}
                >
                  Products
                </Nav.Link>
              </Nav>

              <Search />
            </Navbar.Collapse>
          )}

          <Navbar.Brand href="/cart">
            <img
              src="/images/shop.png"
              width="40px"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Navbar>
        <div className="hello2">
          <Image src="/images/long3.jpg" fluid style={{width: '100%'}} />
        </div>
        <hr />
        <Container fluid>
          <Row className="hello">
            <Col md={4} className="colpic">
              <Link to="/category/fashion">
                <Image
                  src="/images/manuPic3.jpeg"
                  roundedCircle
                  className="roundImages"
                />
              </Link>
            </Col>
            <Col md={4} className="colpic">
              <Link to="/category/handMade">
                <Image
                  src="/images/manuHMpic1.jpg"
                  roundedCircle
                  className="roundImages"
                />
              </Link>
            </Col>
            <Col md={4} className="colpic">
              <Link to="/category/medical">
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
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbarclass))

/**
 * PROP TYPES
 */
Navbarclass.propTypes = {
  load: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

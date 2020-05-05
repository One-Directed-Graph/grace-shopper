import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getProducts} from '../store'
import Search from './Search'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import Form from 'react-bootstrap/Form' -REMOVE?
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/form'

// import {render} from 'enzyme' - REMOVE?

class Navbarclass extends Component {
  constructor(props) {
    if (props.products.length > 0) {
      console.log('props from nav bar in constructor', props)
    }
    super()
  }
  componentDidMount() {
    // this.props.load()
  }

  render() {
    const {handleClick, isLoggedIn, products} = this.props
    console.log('navbar', products)
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="navbarMain"
        >
          <Navbar.Brand href="/home">
            <img
              src="/images/backgroundAmblem.jpg"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/home">Maskerade</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {isLoggedIn ? (
            <Nav className="mr-auto">
              {/* The navbar will show these links after you log in */}
              <Nav.Link href="/home">Home</Nav.Link>
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
                <Nav.Link href="products">Products</Nav.Link>
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
              <Link to="/categories/fashion">
                <Image
                  src="/images/manuPic3.jpeg"
                  roundedCircle
                  className="roundImages"
                />
              </Link>
            </Col>
            <Col md={4} className="colpic">
              <Link to="/categories/handMade">
                <Image
                  src="/images/manuHMpic1.jpg"
                  roundedCircle
                  className="roundImages"
                />
              </Link>
            </Col>
            <Col md={4} className="colpic">
              <Link to="/categories/medical">
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
    // load: () => {
    //   console.log('loading product data')
    //   dispatch(getProducts())
    // },
  }
}

export default connect(mapState, mapDispatch)(Navbarclass)

/**
 * PROP TYPES
 */
// Navbarclass.propTypes = {
//   load: PropTypes.func.isRequired,
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// }

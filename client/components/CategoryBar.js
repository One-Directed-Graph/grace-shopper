import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CategoryBar = ({categories}) => {
  // const imagePaths = ['/manuPic3.jpeg', '/manuHMpic1.jpg', '/menuMed.jpeg']
  return (
    <Container fluid>
      <Row className="hello">
        {categories.map((category) => (
          <Col key={category.id} md={4} className="colpic">
            <Link to={`/products/${category.name}/1`} className="linksInNavBar">
              <Image
                src={`/images${category.img}`}
                roundedCircle
                className="roundImages"
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

const mapState = ({categories}) => ({categories})

export default connect(mapState)(CategoryBar)

CategoryBar.propTypes = {
  categories: PropTypes.array.isRequired,
}

import React, {Component} from 'react'
import {connect} from 'react-redux'
// import { createProduct } from '../../../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ProductCreate extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      // img: FormFile,
      categoryId: null,
      error: '',
    }
  }

  change = (ev) => {
    console.log('in change', ev.target)
    this.setState({[ev.target.name]: ev.target.value})
  }

  submit = async () => {
    const {title, description, price, quantity, categoryId} = this.state
    console.log('in submit', {title, description, price, quantity, categoryId})
    try {
      await this.props.save({title, description, price, quantity, categoryId})
      this.setState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        // img: FormFile,
        categoryId: null,
        error: '',
      })
    } catch (ex) {
      this.setState({error: ex.response.data.message})
    }
  }

  render() {
    const {change, submit} = this
    const {title, description, price, quantity, categoryId, error} = this.state
    const {products, categories} = this.props
    return (
      <div id="product-create-form-div">
        <Form onSubmit={(ev) => ev.preventDefault()}>
          <Form.Group controlId="productForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={change}
              placeholder="Name the product"
            />
          </Form.Group>

          <Form.Group controlId="productForm.price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={price}
              onChange={change}
              placeholder="1.00"
            />
          </Form.Group>

          <Form.Group controlId="productForm.quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={quantity}
              onChange={change}
              placeholder="10"
            />
          </Form.Group>

          <Form.Group controlId="productForm.description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              value={description}
              onChange={change}
              placeholder="Describe the product"
            />
          </Form.Group>

          <Form.Group controlId="productForm.category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="categoryId"
              defaultValue={categoryId === null ? 'null' : categoryId}
              onChange={change}
            >
              <option value="null">-- Choose Category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submit}>
            Submit
          </Button>
        </Form>
        {error && error.response && <div> {error.response.data} </div>}
      </div>
    )
  }
}

const mapStateToProps = ({products, categories}) => ({products, categories})
const mapDispatchToProps = (dispatch) => {
  return {
    save: (product) => {
      console.log('sending to thunk', product)
    },
    // save: (product) => dispatch(createProduct(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)

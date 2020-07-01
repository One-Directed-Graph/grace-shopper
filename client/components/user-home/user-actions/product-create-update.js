import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProduct, updateProduct} from '../../../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

//TODO: Error handling
//TODO: Fix reload error on update

class ProductForm extends Component {
  constructor() {
    super()
    this.state = this.defaultState
  }

  componentDidMount() {
    if (this.props.action === 'update' && this.props.match.params.id) {
      this.setStateToProduct()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.id !== this.props.match.params.id &&
      this.props.match.params.id
    ) {
      this.setStateToProduct()
    }
  }

  defaultState = {
    id: '',
    title: '',
    description: '',
    price: '',
    quantity: '',
    img: '',
    categoryId: null,
    error: '',
  }

  setStateToProduct = () => {
    const product = this.props.products.find(
      (_product) => _product.id === this.props.match.params.id
    )
    const {id, title, description, price, quantity, img, categoryId} = product
    this.setState({id, title, description, price, quantity, img, categoryId})
  }

  change = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  submit = async () => {
    const {
      id,
      title,
      description,
      price,
      quantity,
      img,
      categoryId,
    } = this.state
    const {action} = this.props
    try {
      if (action === 'update') {
        await this.props.save(
          {
            id,
            title,
            description,
            price,
            quantity,
            img,
            categoryId,
          },
          action
        )
      } else {
        await this.props.save(
          {
            title,
            description,
            price,
            quantity,
            img,
            categoryId,
          },
          action
        )
      }
      this.setState(this.defaultState)
      const select = document.getElementById('productForm.category')
      select.selectedIndex = 0
    } catch (ex) {
      console.log('error', ex)
      this.setState({error: ex.response.data.message})
    }
  }
  render() {
    const {change, submit} = this
    const {
      title,
      description,
      price,
      quantity,
      categoryId,
      img,
      error,
    } = this.state
    const {categories, action, displayName, history} = this.props

    return (
      <div id="product-create-form-div">
        {img && (
          <div
            className="product-form-image"
            style={{
              backgroundImage: 'url(' + img + ')',
              margin: '1rem',
            }}
          />
        )}
        <Form
          id="product-form"
          name={action}
          onSubmit={(ev) => {
            ev.preventDefault()
            if (!error) history.push('/account/product-list')
          }}
        >
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
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                name="price"
                value={price}
                onChange={change}
                placeholder="1.00"
              />
            </InputGroup>
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
              value={categoryId === null ? 'null' : categoryId}
              onChange={change}
            >
              <option value="null">-- Choose Category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} - {category.description}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="productForm.image">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={img}
              onChange={change}
              placeholder="URL of image"
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={submit}>
            {displayName}
          </Button>
        </Form>
        {error && <div> {error} </div>}
      </div>
    )
  }
}

const mapCreateState = ({categories}) => ({
  categories,
  action: 'create',
  displayName: 'Create Product',
})

const mapUpdateState = ({products, categories}) => ({
  products,
  categories,
  action: 'update',
  displayName: 'Update Product',
})

const mapDispatch = (dispatch) => {
  return {
    save: (product, action) => {
      console.log(`${action} product`, product)
      if (action === 'create') dispatch(createProduct(product))
      if (action === 'update') dispatch(updateProduct(product))
    },
  }
}

export const ProductCreate = connect(mapCreateState, mapDispatch)(ProductForm)
export const ProductUpdate = connect(mapUpdateState, mapDispatch)(ProductForm)

//code for import file
/* <Form.Group controlId="productForm.image">
      <Form.Label>Product Image</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <Button variant="secondary" onClick={upload}>
              Upload
            </Button>
          </InputGroup.Prepend>
          <Form.File
            name="img"
            type="file"
            label=""
            onChange={change}
            custom
          />
        </InputGroup>
    </Form.Group> */

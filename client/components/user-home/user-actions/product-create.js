import React, {Component} from 'react'
import {connect} from 'react-redux'
// import { createProduct } from '../../../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateProduct extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
    }
  }

  change = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  submit = async (ev) => {
    ev.preventDefault()
    try {
      await this.props.save(this.state)
      this.setState({
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        // img: FormFile,
        catogoryId: 0,
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
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Name of product"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={description}
              placeholder="Descripton of product"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              defaultValue={categoryId === null ? 'null' : categoryId}
              onChange={change}
            >
              <option value="null">-- Choose Category --</option>
              {categories.map((category) => (
                <option key={category.id}>{category.description}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        {error && error.response && <div> {error.response.data} </div>}
      </div>
      //   <form onSubmit={submit}>
      //     <div id="error">{error}</div>
      //     <label>
      //       First Name:{' '}
      //       <input name="nameFirst" value={nameFirst} onChange={change} />
      //     </label>
      //     <label>
      //       Last Name:{' '}
      //       <input name="nameLast" value={nameLast} onChange={change} />
      //     </label>
      //     <label>
      //       Email: <input name="email" value={email} onChange={change} />
      //     </label>
      //     <label>
      //       GPA: <input name="gpa" value={gpa} onChange={change} />
      //     </label>
      //     <select
      //       name="schoolId"
      //       defaultValue={schoolId === null ? 'null' : schoolId}
      //       onChange={change}>
      //       <option value="null">-- Not Enrolled --</option>
      //       {products.map((school) => (
      //         <option key={school.id} value={school.id}>
      //           {school.name}
      //         </option>
      //       ))}
      //     </select>
      //     <button type="submit">Create</button>
      //   </form>
    )
  }
}

const mapStateToProps = ({products}) => ({products})
const mapDispatchToProps = (dispatch) => {
  return {
    save: (product) => dispatch(createProduct(product)),
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(CreateProduct)

export default Connected

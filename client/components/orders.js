import React, {Component} from 'react'
import {getOrders} from '../store'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'
import {MyVerticallyCenteredModal} from './modelPopup'
class Orders extends Component {
  constructor() {
    super()
    // this.state = {
    //   modalShow: false,
    // }
    // this.setModalShow = this.setModalShow.bind(this)
  }
  // setModalShow(input) {
  //   console.log(input)
  //   this.setState({modalShow: input})
  //   console.log(this.state.modalShow)
  // }
  componentDidMount() {
    this.props.load()
  }
  render() {
    return <hr />
    //     const {modalShow} = this.props
    //     const {setModalShow} = this
    //     return (
    //       <div>
    //         <Button variant="primary" onClick={() => setModalShow(true)}>
    //           Launch vertically centered modal
    //         </Button>

    //         <MyVerticallyCenteredModal
    //           show={modalShow}
    //           onHide={() => setModalShow(false)}
    //         />
    //       </div>
    //     )
  }
}
const mapState = ({orders}) => {
  return {
    orders,
  }
}
const mapDispatch = (dispatch) => {
  return {
    load: () => {
      dispatch(getOrders())
    },
  }
}
export default connect(mapState, mapDispatch)(Orders)
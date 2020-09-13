import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Moment from 'react-moment'
import OrderDetails from './order-details'

const Orders = (props) => {
  const orders = props.orders || []

  return (
    <div className="card">
      <div className="card-header">
        <h3>Orders</h3>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {/* <th>Order</th> */}
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  {/* <td>{order.id}</td> */}
                  <td>
                    {' '}
                    <Moment format="MMMM D, YYYY h:mma">
                      {order.dateOfPurchase}
                    </Moment>
                  </td>
                  <td>{order.status}</td>
                  <td>${order.subTotal}</td>
                  <td>
                    <OrderDetails order={order} />
                  </td>
                  {/* <td><a href="#" className="btn btn-fill-out btn-sm">View</a></td> */}
                </tr>
                // <ListGroup.Item key={order.id}>
                //   <h6>Order Id: {order.id}</h6>
                //   <p>
                //     Date of Purchase:{' '}
                //     <Moment format="MMMM D, YYYY h:mma">
                //       {order.dateOfPurchase}
                //     </Moment>
                //   </p>
                //   <p>Total: {order.subTotal}</p>
                //   <p>Status: {order.status}</p>
                //   <OrderDetails order={order} />
                // </ListGroup.Item>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="user-home-comps">
  //     <h3>My Orders</h3>
  //     <ListGroup variant="flush" id="order-list-orders">
  //       {orders.map((order) => (
  //         <ListGroup.Item key={order.id}>
  //           <h6>Order Id: {order.id}</h6>
  //           <p>
  //             Date of Purchase:{' '}
  //             <Moment format="MMMM D, YYYY h:mma">
  //               {order.dateOfPurchase}
  //             </Moment>
  //           </p>
  //           <p>Total: {order.subTotal}</p>
  //           <p>Status: {order.status}</p>
  //           <OrderDetails order={order} />
  //         </ListGroup.Item>
  //       ))}
  //     </ListGroup>
  //   </div>
  // )
}

const mapState = ({orders, products}) => {
  const processedOrders = orders.map((order) => {
    if (order.orderitems) {
      order.orderitems.map((item) => {
        const product = products.find(
          (_product) => _product.id === item.productId
        )
        item.productTitle = product.title
        item.productImg = product.img
      })
    }
    return order
  })
  return {orders: processedOrders}
}

export default connect(mapState)(Orders)

Orders.propTypes = {
  orders: PropTypes.array.isRequired,
}

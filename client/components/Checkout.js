import React from 'react'
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import CardSection from './CardSection'
import axios from 'axios'
import OrderSummary from './OrderSummary'
// import '../../public/common.css'
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      CLIENT_SECRET: '',
    }
  }

  async componentDidMount() {
    const response = await axios.get('/secret')
    console.log('response from cheout,', response)
    const client_secret = await response.data.client_secret
    console.log('client Secret: ', response.data.client_secret)
    this.setState({CLIENT_SECRET: client_secret})
    // Call stripe.confirmCardPayment() with the client secret.
  }

  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    //const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

    /* const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integrationCheck: 'accept_a_payment'},
  }) */
    /*  amount: 1099
canceled_at: null
cancellation_reason: null
capture_method: "automatic"
client_secret: "pi_1GkN7u2eZvKYlo2C7zuu6gdj_secret_3JXbQIMh5QiSbJxGoGluTuB5M"
confirmation_method: "automatic"
created: 1589862746
currency: "usd"
description: null
id: "pi_1GkN7u2eZvKYlo2C7zuu6gdj"
last_payment_error: null
livemode: false
next_action: null
object: "payment_intent"
payment_method: null
payment_method_types: ["card"]
receipt_email: null
setup_future_usage: null
shipping: null
source: null
status: "requires_payment_method" */

    const {stripe, elements} = this.props
    //const elements = this.props
    console.log('stripe elements', stripe, elements)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }
    //console.log(paymentIntent)
    const {CLIENT_SECRET} = this.state
    //const result = await stripe.confirmCardPayment(CLIENT_SECRET,paymentIntent)
    const result = await stripe.confirmCardPayment(CLIENT_SECRET, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    })
    console.log('result', result)

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('The payment has been processed!')
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }

  render() {
    console.log('In checkout ', this.props)
    return (
      <form onSubmit={this.handleSubmit} className="credit">
        <CardSection />
        <button className="credit">Confirm order</button>
        {/* disabled={!this.props.stripe} */}
      </form>
    )
  }
}

export default function InjectedCheckoutForm() {
  return (
    <div id="stripe-checkout">
      <ElementsConsumer>
        {({stripe, elements}) => (
          <Checkout stripe={stripe} elements={elements} />
        )}
      </ElementsConsumer>
    </div>
  )
}

//export default Checkout

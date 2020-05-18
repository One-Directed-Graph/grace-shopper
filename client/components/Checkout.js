import React from 'react'
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import CardSection from './CardSection'
import axios from 'axios'
// import '../../public/common.css'

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

    const {stripe, elements} = this.props
    console.log('stripe elements', stripe, elements)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    const {CLIENT_SECRET} = this.state
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

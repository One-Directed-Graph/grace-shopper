import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import Jumbotron from 'react-bootstrap/Jumbotron'

/**
 * COMPONENT
 */
const WelcomeUser = ({user}) => {
  const {email} = user
  const greetName = email.split('@')[0]

  return (
    <div className="col-lg-9 col-md-8">
      <div className="tab-content dashboard_content">
        <div
          className="tab-pane fade active show"
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <div className="card">
            <div className="card-header">
              <h3>Dashboard</h3>
            </div>
            <div className="card-body">
              <p>Welcome, {greetName}</p>
              <p>
                From your account dashboard. you can easily check &amp; view
                your{' '}
                <a
                  href="javascript:void(0);"
                  // onClick="$('#orders-tab').trigger('click')"
                >
                  recent orders
                </a>
                , manage your{' '}
                <a
                  href="javascript:void(0);"
                  // onClick="$('#address-tab').trigger('click')"
                >
                  shipping and billing addresses
                </a>{' '}
                and{' '}
                <a
                  href="javascript:void(0);"
                  // onClick="$('#account-detail-tab').trigger('click')"
                >
                  edit your password and account details.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = ({user}) => ({user})

export default connect(mapState)(WelcomeUser)

/**
 * PROP TYPES
 */

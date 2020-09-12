import React, {Component} from 'react'
import {auth} from '../store'
import {getOrder, getSessionCart} from '../store/order.js'
import {connect} from 'react-redux'
import {Form, Modal, Button, ListGroup} from 'react-bootstrap'
import {destroyItem, getItems, editItem} from '../store/orderItems'
import InjectedCheckoutForm from './Checkout'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {me} from '../store'

class OrderSummary extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      password: '',
    }
    this.total = this.total.bind(this)
  }

  total() {
    const {order, handleSubmit} = this.props

    let total = 0
    if (order.orderitems) {
      let arrayOfPrice = order.orderitems.map((order) => {
        total += order.price * 1 * order.quantity * 1

        return total
      })
    }
    let totalObj = {
      tax: (total * 0.0825).toFixed(2),
      total: total.toFixed(2),
      totalTax: (
        (total * 0.0825).toFixed(2) * 1 +
        total.toFixed(2) * 1
      ).toFixed(2),
    }
    return totalObj
  }
  render() {
    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

    const {order, handleSubmit} = this.props
    let subtotalWithoutTax = 0
    let subTotal = order.subTotal

    console.log('Inside OrderSummary subtotal', this.props.order)
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="toggle_info">
                <span>
                  <i className="fas fa-user"></i>Returning customer?{' '}
                  <a
                    href="#loginform"
                    data-toggle="collapse"
                    className="collapsed"
                    aria-expanded="false"
                  >
                    Click here to login
                  </a>
                </span>
              </div>
              <div
                className="panel-collapse collapse login_form"
                id="loginform"
              >
                <div className="panel-body">
                  <p>
                    If you have shopped with us before, please enter your
                    details below. If you are a new customer, please proceed to
                    the Billing &amp; Shipping section.
                  </p>
                  <form
                    method="post"
                    onSubmit={(e) => {
                      handleSubmit(e, this.state.name, this.state.password)
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        required=""
                        className="form-control"
                        name="email"
                        placeholder="Username Or Email"
                        value={this.state.name}
                        onChange={(e) => {
                          this.setState({name: e.target.value})
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        required=""
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => {
                          this.setState({password: e.target.value})
                        }}
                      />
                    </div>
                    <div className="login_footer form-group">
                      <div className="chek-form">
                        <div className="custome-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="remember"
                            value=""
                          />
                          <label className="form-check-label" htmlFor="remember">
                            <span>Remember me</span>
                          </label>
                        </div>
                      </div>
                      <a href="#">Forgot password?</a>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-fill-out btn-block"
                        name="login"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="toggle_info">
                <span>
                  <i className="fas fa-tag"></i>Have a coupon?{' '}
                  <a
                    href="#coupon"
                    data-toggle="collapse"
                    className="collapsed"
                    aria-expanded="false"
                  >
                    Click here to enter your code
                  </a>
                </span>
              </div>
              <div className="panel-collapse collapse coupon_form" id="coupon">
                <div className="panel-body">
                  <p>If you have a coupon code, please apply it below.</p>
                  <div className="coupon field_form input-group">
                    <input
                      type="text"
                      value=""
                      className="form-control"
                      placeholder="Enter Coupon Code.."
                    />
                    <div className="input-group-append">
                      <button className="btn btn-fill-out btn-sm" type="submit">
                        Apply Coupon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="medium_divider"></div>
              <div className="divider center_icon">
                <i className="linearicons-credit-card"></i>
              </div>
              <div className="medium_divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="heading_s1">
                <h4>Billing Details</h4>
              </div>
              <form method="post">
                <div className="form-group">
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="fname"
                    placeholder="First name *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="lname"
                    placeholder="Last name *"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    required
                    type="text"
                    name="cname"
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-group">
                  <div className="custom_select">
                    <select className="form-control">
                      <option value="">Select an option...</option>
                      <option value="AX">Aland Islands</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua and Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="PW">Belau</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia</option>
                      <option value="BQ">
                        Bonaire, Saint Eustatius and Saba
                      </option>
                      <option value="BA">Bosnia and Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BV">Bouvet Island</option>
                      <option value="BR">Brazil</option>
                      <option value="IO">British Indian Ocean Territory</option>
                      <option value="VG">British Virgin Islands</option>
                      <option value="BN">Brunei</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="CV">Cape Verde</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CX">Christmas Island</option>
                      <option value="CC">Cocos (Keeling) Islands</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comoros</option>
                      <option value="CG">Congo (Brazzaville)</option>
                      <option value="CD">Congo (Kinshasa)</option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="HR">Croatia</option>
                      <option value="CU">Cuba</option>
                      <option value="CW">CuraÇao</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FK">Falkland Islands</option>
                      <option value="FO">Faroe Islands</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="GF">French Guiana</option>
                      <option value="PF">French Polynesia</option>
                      <option value="TF">French Southern Territories</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GR">Greece</option>
                      <option value="GL">Greenland</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GT">Guatemala</option>
                      <option value="GG">Guernsey</option>
                      <option value="GN">Guinea</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HM">
                        Heard Island and McDonald Islands
                      </option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">Iran</option>
                      <option value="IQ">Iraq</option>
                      <option value="IM">Isle of Man</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="CI">Ivory Coast</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JE">Jersey</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">Laos</option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MO">Macao S.A.R., China</option>
                      <option value="MK">Macedonia</option>
                      <option value="MG">Madagascar</option>
                      <option value="MW">Malawi</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">Mexico</option>
                      <option value="FM">Micronesia</option>
                      <option value="MD">Moldova</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NL">Netherlands</option>
                      <option value="AN">Netherlands Antilles</option>
                      <option value="NC">New Caledonia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="KP">North Korea</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PS">Palestinian Territory</option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="QA">Qatar</option>
                      <option value="IE">Republic of Ireland</option>
                      <option value="RE">Reunion</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russia</option>
                      <option value="RW">Rwanda</option>
                      <option value="ST">São Tomé and Príncipe</option>
                      <option value="BL">Saint Barthélemy</option>
                      <option value="SH">Saint Helena</option>
                      <option value="KN">Saint Kitts and Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="SX">Saint Martin (Dutch part)</option>
                      <option value="MF">Saint Martin (French part)</option>
                      <option value="PM">Saint Pierre and Miquelon</option>
                      <option value="VC">
                        Saint Vincent and the Grenadines
                      </option>
                      <option value="SM">San Marino</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="GS">South Georgia/Sandwich Islands</option>
                      <option value="KR">South Korea</option>
                      <option value="SS">South Sudan</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SJ">Svalbard and Jan Mayen</option>
                      <option value="SZ">Swaziland</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syria</option>
                      <option value="TW">Taiwan</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania</option>
                      <option value="TH">Thailand</option>
                      <option value="TL">Timor-Leste</option>
                      <option value="TG">Togo</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad and Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="TC">Turks and Caicos Islands</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom (UK)</option>
                      <option value="US">USA (US)</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VA">Vatican</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Vietnam</option>
                      <option value="WF">Wallis and Futuna</option>
                      <option value="EH">Western Sahara</option>
                      <option value="WS">Western Samoa</option>
                      <option value="YE">Yemen</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="billing_address"
                    required=""
                    placeholder="Address *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="billing_address2"
                    required=""
                    placeholder="Address line2"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    required
                    type="text"
                    name="city"
                    placeholder="City / Town *"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    required
                    type="text"
                    name="state"
                    placeholder="State / County *"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    required
                    type="text"
                    name="zipcode"
                    placeholder="Postcode / ZIP *"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone *"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    required
                    type="text"
                    name="email"
                    placeholder="Email address *"
                  />
                </div>
                <div className="form-group">
                  <div className="chek-form">
                    <div className="custome-checkbox">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="createaccount"
                      />
                      <label
                        className="form-check-label label_info"
                        htmlFor="createaccount"
                      >
                        <span>Create an account?</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group create-account">
                  <input
                    className="form-control"
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <div className="ship_detail">
                  <div className="form-group">
                    <div className="chek-form">
                      <div className="custome-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkbox"
                          id="differentaddress"
                        />
                        <label
                          className="form-check-label label_info"
                          htmlFor="differentaddress"
                        >
                          <span>Ship to a different address?</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="different_address">
                    <div className="form-group">
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="fname"
                        placeholder="First name *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="lname"
                        placeholder="Last name *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        required
                        type="text"
                        name="cname"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom_select">
                        <select className="form-control">
                          <option value="">Select an option...</option>
                          <option value="AX">Aland Islands</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="PW">Belau</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BQ">
                            Bonaire, Saint Eustatius and Saba
                          </option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">
                            British Indian Ocean Territory
                          </option>
                          <option value="VG">British Virgin Islands</option>
                          <option value="BN">Brunei</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo (Brazzaville)</option>
                          <option value="CD">Congo (Kinshasa)</option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CW">CuraÇao</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">Falkland Islands</option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">
                            French Southern Territories
                          </option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">
                            Heard Island and McDonald Islands
                          </option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran</option>
                          <option value="IQ">Iraq</option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="CI">Ivory Coast</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">Laos</option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao S.A.R., China</option>
                          <option value="MK">Macedonia</option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">Micronesia</option>
                          <option value="MD">Moldova</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="AN">Netherlands Antilles</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="KP">North Korea</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PS">Palestinian Territory</option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="QA">Qatar</option>
                          <option value="IE">Republic of Ireland</option>
                          <option value="RE">Reunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russia</option>
                          <option value="RW">Rwanda</option>
                          <option value="ST">São Tomé and Príncipe</option>
                          <option value="BL">Saint Barthélemy</option>
                          <option value="SH">Saint Helena</option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="SX">Saint Martin (Dutch part)</option>
                          <option value="MF">Saint Martin (French part)</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">
                            Saint Vincent and the Grenadines
                          </option>
                          <option value="SM">San Marino</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">
                            South Georgia/Sandwich Islands
                          </option>
                          <option value="KR">South Korea</option>
                          <option value="SS">South Sudan</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syria</option>
                          <option value="TW">Taiwan</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">Tanzania</option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom (UK)</option>
                          <option value="US">USA (US)</option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VA">Vatican</option>
                          <option value="VE">Venezuela</option>
                          <option value="VN">Vietnam</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="WS">Western Samoa</option>

                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="billing_address"
                        required=""
                        placeholder="Address *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="billing_address2"
                        required=""
                        placeholder="Address line2"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        required
                        type="text"
                        name="city"
                        placeholder="City / Town *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        required
                        type="text"
                        name="state"
                        placeholder="State / County *"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        required
                        type="text"
                        name="zipcode"
                        placeholder="Postcode / ZIP *"
                      />
                    </div>
                  </div>
                </div>
                <div className="heading_s1">
                  <h4>Additional information</h4>
                </div>
                <div className="form-group mb-0">
                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Order notes"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="order_review">
                <div className="heading_s1">
                  <h4>Your Orders</h4>
                </div>
                <div className="table-responsive order_table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderitems
                        ? order.orderitems.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>
                                  {item.product.title}{' '}
                                  <span className="product-qty">
                                    x {item.quantity}
                                  </span>
                                </td>
                                <td>
                                  ${(item.price * 1 * item.quantity).toFixed(2)}
                                </td>
                              </tr>
                            )
                          })
                        : ''}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>SubTotal</th>
                        <td className="product-subtotal">
                          {this.total().total}
                        </td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>Free Shipping</td>
                      </tr>
                      <tr>
                        <th>Tax (8.25%)</th>
                        <td>{this.total().tax}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td className="product-subtotal">
                          {this.total().totalTax}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="payment_method">
                  <div className="heading_s1">
                    <h4>Payment</h4>
                  </div>
                  <div className="payment_option">
                    <div className="custome-radio">
                      <input
                        className="form-check-input"
                        required=""
                        type="radio"
                        name="payment_option"
                        id="exampleRadios3"
                        value="option3"
                        checked=""
                      />
                      <label className="form-check-label" htmlFor="exampleRadios3">
                        Direct Bank Transfer
                      </label>
                      <p data-method="option3" className="payment-text">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration.{' '}
                      </p>
                    </div>
                    <div className="custome-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_option"
                        id="exampleRadios4"
                        value="option4"
                      />
                      <label className="form-check-label" htmlFor="exampleRadios4">
                        Check Payment
                      </label>
                      <p data-method="option4" className="payment-text">
                        Please send your cheque to Store Name, Store Street,
                        Store Town, Store State / County, Store Postcode.
                      </p>
                    </div>
                    <div className="custome-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment_option"
                        id="exampleRadios5"
                        value="option5"
                      />
                      <label className="form-check-label" htmlFor="exampleRadios5">
                        Paypal
                      </label>
                      <p data-method="option5" className="payment-text">
                        Pay via PayPal; you can pay with your credit card if you
                        don't have a PayPal account.
                      </p>
                    </div>
                  </div>
                </div>
                <a href="#" className="btn btn-fill-out btn-block">
                  Place Order
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Elements stripe={stripePromise}>
            {InjectedCheckoutForm(order, this.props.user)}
          </Elements>
        </div>
      </div>

      ///////////////////////////////////////////////
      //////////////////////////////////
      // <div>
      //   <h1> Order Summary </h1>
      //   <h2>
      //     {' '}
      //     Total Items ({order.orderitems ? order.orderitems.length : 0} )
      //   </h2>
      //   <ul>
      //     {order.orderitems
      //       ? order.orderitems.map((item) => {
      //           subtotalWithoutTax += item.price * item.quantity
      //           return (
      //             <ListGroup horizontal="md" key={item.id}>
      //               <ListGroup.Item>
      //                 <h6>Description</h6>
      //                 <p>{item.product.title}</p>
      //               </ListGroup.Item>
      //               <ListGroup.Item>
      //                 <h6>Quantity</h6>
      //                 <p>{item.quantity}</p>
      //               </ListGroup.Item>
      //               <ListGroup.Item>
      //                 <h6>Price</h6>
      //                 <p>{item.price}</p>
      //               </ListGroup.Item>
      //               <ListGroup.Item>
      //                 <h6>Amount</h6>
      //                 <p>{(item.price * 1 * item.quantity * 1).toFixed(2)}</p>
      //               </ListGroup.Item>
      //             </ListGroup>
      //           )
      //         })
      //       : []}
      //   </ul>
      //   <ListGroup variant="flush">
      //     <ListGroup.Item>Subtotal: ${subtotalWithoutTax}</ListGroup.Item>
      //     <ListGroup.Item>
      //       Taxes: ${(subTotal - subtotalWithoutTax).toFixed(2)}
      //     </ListGroup.Item>
      //     <ListGroup.Item>Total Amount to Pay: ${subTotal}</ListGroup.Item>
      //   </ListGroup>

      //   <div>
      //     <Elements stripe={stripePromise}>
      //       {InjectedCheckoutForm(order, this.props.user)}
      //     </Elements>
      //   </div>
      // </div>
    )
  }
}

const mapState = (state) => {
  let {order, user} = state
  return {
    order,
    user,
    isLoggedIn: !!state.user.id,
  }
}
// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error,
//   }
// }
const mapDispatch = (dispatch) => {
  return {
    handleSubmit(e, name, passwordd) {
      e.preventDefault()
      //console.log(evt)
      const formName = 'login'
      const email = name
      const password = passwordd
      dispatch(auth(email, password, formName))
    },
  }
}
//export const Login = connect(mapLogin, mapDispatch)(OrderSummary)
export default connect(mapState, mapDispatch)(OrderSummary)

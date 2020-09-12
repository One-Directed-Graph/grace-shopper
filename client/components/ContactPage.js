import React from 'react'

export class ContactPage extends React.Component {
  render() {
    return (
      <div>
        <div className="section pb_70">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-md-6">
                <div className="contact_wrap contact_style3">
                  <div className="contact_icon">
                    <i className="linearicons-map2"></i>
                  </div>
                  <div className="contact_text">
                    <span>Address</span>
                    <p>N95 Street, Maskcity, Staysafe, US</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="contact_wrap contact_style3">
                  <div className="contact_icon">
                    <i className="linearicons-envelope-open"></i>
                  </div>
                  <div className="contact_text">
                    <span>Email Address</span>
                    <a href="mailto:info@sitename.com">info@maskerade.com </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="contact_wrap contact_style3">
                  <div className="contact_icon">
                    <i className="linearicons-tablet2"></i>
                  </div>
                  <div className="contact_text">
                    <span>Phone</span>
                    <p>+ 123-456-7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="heading_s1">
                  <h2>Get In touch</h2>
                </div>
                <p className="leads">
                  Fill out a form below to get in touch with us!
                </p>
                <div className="field_form">
                  <form method="post" name="enq">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <input
                          required
                          placeholder="Enter Name *"
                          id="first-name"
                          className="form-control"
                          name="name"
                          type="text"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          required
                          placeholder="Enter Email *"
                          id="email"
                          className="form-control"
                          name="email"
                          type="email"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          required
                          placeholder="Enter Phone No. *"
                          id="phone"
                          className="form-control"
                          name="phone"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          placeholder="Enter Subject"
                          id="subject"
                          className="form-control"
                          name="subject"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <textarea
                          required
                          placeholder="Message *"
                          id="description"
                          className="form-control"
                          name="message"
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="col-md-12">
                        <button
                          type="submit"
                          title="Submit Your Message!"
                          className="btn btn-fill-out"
                          id="submitButton"
                          name="submit"
                          value="Submit"
                        >
                          Send Message
                        </button>
                      </div>
                      <div className="col-md-12">
                        <div
                          id="alert-msg"
                          className="alert-msg text-center"
                        ></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 pt-2 pt-lg-0 mt-4 mt-lg-0">
                {/* <div
                  id="map"
                  className="contact_map2"
                  data-zoom="12"
                  data-latitude="40.680"
                  data-longitude="-73.945"
                  data-icon="assets/images/marker.png"
                ></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import React from 'react'

export const ShopInfo = () => {
  return (
    <div className="section pb_70">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-lg-4">
            <div className="icon_box icon_box_style1">
              <div className="icon">
                <i className="flaticon-shipped"></i>
              </div>
              <div className="icon_box_content">
                <h5>Free Delivery</h5>
                <p>Free Shipping On Orders Over $50</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="icon_box icon_box_style1">
              <div className="icon">
                <i className="flaticon-money-back"></i>
              </div>
              <div className="icon_box_content">
                <h5>30 Day Return</h5>
                <p>
                  {' '}
                  We will gladly accept returns and exchanges within 30 days{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="icon_box icon_box_style1">
              <div className="icon">
                <i className="flaticon-support"></i>
              </div>
              <div className="icon_box_content">
                <h5>Customer Service</h5>
                <p>
                  Our Customer Service are available during regular business
                  hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

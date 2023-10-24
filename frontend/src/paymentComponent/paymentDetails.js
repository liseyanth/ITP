import React, { useState } from 'react'
import Paypal from '../components/admin/PayPal';
import PopupForm from './PopUpCashOnDelivery';
import ConfirmOrder from '../components/cart/ConfirmOrder'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function PaymentDetails({ isEnabled }) {
  const [checkout, setCheckOut] = useState(false);


  const { shippingInfo, items:cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
  const itemsPrice = cartItems.reduce((acc, item)=> (acc + item.price * item.quantity),0);
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2)

  //pop up form
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }
  console.log("isPopupOpen:", isPopupOpen)


  // handle checkbox change in payment method(PayPal,cash on delivery)
  const [isDivEnabled, setIsDivEnabled] = useState(false);

  const handleCheckboxChange = () => {
    setIsDivEnabled(!isDivEnabled);
  };

//scroll bar 
 
  const containerStyle = {
    width: 'auto', // Set the width of the container
    height: '800px', // Set the height of the container
    overflow: 'scroll', // Add a scroll bar when content overflows
    
  };

  //order summary

  return (
    <div style={containerStyle}>
      {isEnabled ? (
        <div>





          <div className="card mb-4">
            <div className="card-body1">
              <div class="input-group">
             
              </div> 
            </div>
          </div>



          <div className="card mb-4">
            <div className="card-body1">
            <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">LKR{itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">LKR{shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">LKR{taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">LKR{totalPrice}</span></p>
            </div>
          </div>
          </div>





          <div className="form-check mb-3 form-switch">
            <input className="form-check-input" type="checkbox" role="switch" checked={isDivEnabled} onChange={handleCheckboxChange} />
            <h6 className="mb-0">Accepts Terms & Conditions</h6>
          </div>
          <div className={isDivEnabled ? 'enabled' : 'disabled-div'}  >

            <div class="card-body">
              <h5 class="card-title mb-3" style={{ color: '#035708' }}>cash on Delivery</h5>
              <p class="card-text">A type of transaction where the recipient pays for a good at the time of delivery rather than using credit.</p>
              <button className="btn btn-sm btn-primary" style={{ backgroundColor: '#00334e' }} onClick={togglePopup}>PlaceOrder</button>
              {isPopupOpen && <PopupForm closePopup={togglePopup} />}
            </div>
          </div>

          <div className={isDivEnabled ? 'enabled' : 'disabled-div'}>

            <div class="card-body">
              <h5 class="card-title mb-3" style={{ color: '#035708' }}>pay with PayPal</h5>
              <p class="card-text">You will be redirected to the PayPal website to process your card payment. PayPal secures your payment and protect your financial information with strong encryption tools.</p>
              {checkout ? (
                <Paypal />

              ) : (
                <button className="btn btn-sm btn-primary  " style={{ backgroundColor: '#00334e' }}
                  onClick={() => {
                    setCheckOut(true);
                  }} >
                  PlaceOrder</button>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div>



          <div className="card mb-4">
            <div className="card-body1">
              <div class="input-group">
                <input type="text" className="form-control" placeholder='Code/Coupon' />
                <button class="btn   btn-secondary" type="button" >Apply</button>
              </div> 
            </div>
          </div>

        </div>
      )}
    </div>

  )
}

export default PaymentDetails
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { orderDetail as orderDetailAction } from '../../actions/orderActions';
import jsPDF from 'jspdf';
import logoImage from './image/logo.jpg'; // Adjust the path to your logo image

export default function OrderDetail() {
  const { orderDetail, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = 'Processing',
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;
  const dispatch = useDispatch();
  const { id } = useParams();
  const total = orderItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id]);

  const generateReport = () => {
    const doc = new jsPDF();

    // Set bold font
    doc.setFont('helvetica', 'bold');

    // Add the logo image
    doc.addImage(logoImage, 'PNG', 10, 10, 50, 20); // Adjust the coordinates and dimensions as needed

    // Add company name and slogan
    doc.setFontSize(20);
    doc.text('Ester Aura', 105, 20, 'center');
    doc.setLineWidth(0.5);
    doc.setFontSize(14);
    doc.text('Radiate Your Inner Glow', 105, 30, 'center');

    // Reset font to normal
    doc.setFont('helvetica', 'normal');

    // Add order details
    doc.setFontSize(12);
    doc.text(`Name: ${user.name}`, 10, 60);
    doc.text(`Phone: ${shippingInfo.phoneNo}`, 10, 70);
    doc.text(
      `Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`,
      10,
      80
    );
    doc.text(`Amount: LKR${totalPrice}`, 10, 90);
    doc.text(`Payment: Payment of ${user.name} is done by Stripe`, 10, 100);
    doc.text(`Order Status: ${orderStatus}`, 10, 110);

    // Add current date
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 160, 20);

    // Add order items
    doc.setFontSize(16);
    doc.text('Order Items:', 10, 130);
    doc.setFontSize(12);
    let y = 140;
    orderItems.forEach((item) => {
      doc.text(`Product: ${item.name}`, 10, y);
      doc.text(`Price: LKR${item.price}`, 10, y + 10);
      doc.text(`Quantity: ${item.quantity} Piece(s)`, 10, y + 20);
      y += 40; // Adjust spacing between items
    });

    // Display the total price
    doc.text(`Total Price: LKR${total}`, 10, y);

    // Save the PDF
    doc.save('PaymentInvoice.pdf');
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="col-md-6 text-md-end">
            <button className="btn btn-secondary" onClick={generateReport}>
              <FontAwesomeIcon icon={faFilePdf} /> Generate PDF
            </button>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
            <h4 className="mb-4"><strong>Payment Invoice</strong></h4>

              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state},{' '}
                {shippingInfo.country}
              </p>
              <p>
                <b>Amount:</b> LKR{totalPrice}
              </p>
              <hr />
              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? 'greenColor' : 'redColor'}>
                <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
              </p>
              <h4 className="my-4">Order Status:</h4>
              <p className={orderStatus && orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'}>
                <b>{orderStatus}</b>
              </p>
              <h4 className="my-4"><b>Purchased Items:</b></h4>
              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div className="row my-5" key={item.product}>
                      <div className="col-4 col-lg-2">
                        <img src={item.image} alt={item.name} height="45" width="65" />
                      </div>
                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>LKR{item.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
              {/* Display the total price */}
              <div className="text-end">
                <p className="fw-bold">Total Price Of The Purchase: LKR{total}</p>
              </div>
              <div className="text-end">
                <p className="fw-bold">Total Price After shipping Fee and Tax Charges: LKR{totalPrice}</p>
              </div>
              
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';
import '../cart/Cart.css'; // Import your CSS file for additional styling

export default function Cart() {
    const { items } = useSelector((state) => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if (item.stock === 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product));
    };

    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count === 1) return;
        dispatch(decreaseCartItemQty(item.product));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <Fragment>
            {items.length === 0 ? (
                <h2 className="mt-5">Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {items.map((item) => (
                                <Fragment key={item.product}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} className="cart-image" />
                                            </div>
                                            <div className="col-8 col-lg-9">
                                                <div className="cart-details">
                                                    <Link to={`/product/${item.product}`} className="cart-product-name">
                                                        {item.name}
                                                    </Link>
                                                    <div className="cart-price-quantity">
                                                        <p className="cart-item-price">LKR {item.price}</p>
                                                        <div className="stockCounter d-inline">
                                                            <span
                                                                className="btn btn-danger minus"
                                                                onClick={() => decreaseQty(item)}
                                                            >
                                                                -
                                                            </span>
                                                            <input
                                                                type="number"
                                                                className="form-control count d-inline"
                                                                value={item.quantity}
                                                                readOnly
                                                            />
                                                            <span
                                                                className="btn btn-primary plus"
                                                                onClick={() => increaseQty(item)}
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                        <i
                                                            id="delete_cart_item"
                                                            onClick={() => dispatch(removeItemFromCart(item.product))}
                                                            className="fa fa-trash btn btn-danger"
                                                        ></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                            <hr />
                        </div>

                        <div className="col-12 col-lg-4 my-4">
                            <div id="order_summary" className="cart-summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>
                                    Subtotal: <span className="order-summary-values">{items.reduce((acc, item) => acc + item.quantity, 0)} (Units)</span>
                                </p>
                                <p>
                                    Est. total: <span className="order-summary-values">LKR{items.reduce((acc, item) => acc + item.quantity * item.price, 0)}</span>
                                </p>
                                <hr />
                                <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">
                                    Check out
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
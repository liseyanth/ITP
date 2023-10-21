import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../actions/cartActions';
import { toast } from "react-toastify";
import  { useState } from 'react'; 

import { useParams } from "react-router-dom";

export default function Product({ product, col }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        {product.images.length > 0 && (
          <img
            className="card-img-top mx-auto"
            src={product.images[0].image}
            alt={product.name}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">LKR{product.price}</p>
          <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
          <button
                type="button"
                disabled={product.stock === 0}
                onClick={() => {
                  dispatch(addCartItem(product._id, quantity));
                  toast('Cart Item Added!', {
                    type: 'success',
                    position: toast.POSITION.BOTTOM_CENTER
                  });
                }}
                className="btn btn-primary d-inline ml-4 add-to-cart-btn"
              >
                 <Link to="/cart"><span id="cart" className="ml-3">*</span></Link>
                Add to Cart
              </button>
        </div>
      </div>
    </div>
  );
}

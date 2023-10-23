import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../actions/cartActions';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons';

export default function Product({ product, col }) {
  const dispatch = useDispatch();
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
            <Link to={`/product/${product._id}`}>
              {product.name}
             
            </Link>
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
            <FontAwesomeIcon icon={faEye} className="mr-2" /> View Details {/* Add an eye icon to the "View Details" button */}
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
            <Link to="/cart">
              <span id="cart" role="img" aria-label="cart-icon" style={{ fontSize: '24px' }}>
                🛒
              </span> {/* Make the cart icon bigger */}
            </Link>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    
  );
}
// <FontAwesomeIcon icon={faEye} className="ml-2" /> {/* Add an eye icon */ line 28
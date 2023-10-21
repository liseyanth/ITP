import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import { Carousel } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { Modal, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

import './ProductDetail.css'; // Import your custom CSS for styling

export default function ProductDetail() {
  const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
  const { user } = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const increaseQty = () => {
    const count = document.querySelector('.count');
    if (product.stock === 0 || count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count');
    if (count.valueAsNumber === 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('productId', id);
    dispatch(createReview(formData));
  }

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();
      toast('Review Submitted successfully', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewSubmitted())
      });
    }
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => dispatch(clearError())
      });
      return;
    }
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }

    return () => {
      dispatch(clearProduct());
    }
  }, [dispatch, id, isReviewSubmitted, error]);

  return (
    <Fragment>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <Carousel pause="hover">
                {product.images && product.images.length > 0 && product.images.map(image => (
                  <Carousel.Item key={image._id}>
                    <img
                      className="d-block w-100 product-image"
                      src={image.image}
                      alt={product.name}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="col-lg-6 product-details">
              <h3 className="product-name">{product.name}</h3>
              
              <div className="rating-outer">
                <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
              </div>
              <p className="product-reviews">({product.numOfReviews} Reviews)</p>
              <p className="product-price">Price: LKR{product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
              </div>
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
                Add to Cart
              </button>
              <p className="product-status">Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
              <h4 className="product-description">Description:</h4>
              <p>{product.description}</p>
              <p className="product-seller">Sold by: <strong>{product.seller}</strong></p>
              {user ? (
                <button onClick={handleShow} type="button" className="btn btn-primary mt-4 submit-review-btn">
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5">Login to Post Review</div>
              )}
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 ? (
            <ProductReview reviews={product.reviews} />
          ) : null}
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul className="stars" >
                                        {
                                            [1,2,3,4,5].map(star => (
                                                <li 
                                                value={star}
                                                onClick={()=>setRating(star)}
                                                className={`star ${star<=rating?'orange':''}`}
                                                onMouseOver={(e) => e.target.classList.add('yellow')}
                                                onMouseOut={(e) => e.target.classList.remove('yellow')}

                                                ><i className="fa fa-star"></i></li>
                                            ))
                                        }
                                       
                                       
                                    </ul>
          <textarea onChange={e => setComment(e.target.value)} name="review" id="review" className="form-control mt-3"></textarea>
          <Button disabled={loading} onClick={reviewHandler} aria-label="Close" className="btn my-3 float-right review-btn px-4 text-white">
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
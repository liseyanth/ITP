import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ReviewList() {
  const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(
    (state) => state.productState
  );
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        user: review.user.name,
        comment: review.comment,
        actions: (
          <Fragment>
            <Button
              onClick={(e) => deleteHandler(e, review._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

  const generatePDF = () => {
    const input = document.getElementById("reviews-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("reviews.pdf");
    });
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isReviewDeleted) {
      toast("Review Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));
      return;
    }
  }, [dispatch, error, productId, isReviewDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Review List</h1>
        <div className="row justify-content-center mt-5">
          <div className="col-5">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="text"
                  onChange={(e) => setProductId(e.target.value)}
                  value={productId}
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block py-2"
              >
                Search
              </button>
              <button
                onClick={generatePDF}
                className="btn btn-secondary btn-block py-2"
                disabled={loading}
              >
                Generate PDF
              </button>
            </form>
          </div>
        </div>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setReviews()}
              bordered
              striped
              hover
              className="px-3"
              noBottomColumns={true} // Hide bottom columns
              id="reviews-table" // Add this ID to your reviews table
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}

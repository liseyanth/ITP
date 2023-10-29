import React, { Fragment, useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin

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
    let increment = 1;
  
    reviews.forEach((review) => {
      // Add logic here to filter reviews by topic "ESTER AURA" and add the date
      data.rows.push({
        id: `REV0${increment++}`,
        rating: review.rating,
        user: review.user?.name || 'Unknown User', // Use optional chaining and provide a default value
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
  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold"); // Set font and style

  // Centered Title and Logo
  pdf.addImage("/images/products/logo.jpg", "JPEG", 20, 10 , 30, 30);
  pdf.text("ESTER AURA Reviews", 105,20, { align: "center" });

  // Add some space after the title and logo
  let yOffset = 50;

  // Add Product ID and Date
  const date = new Date().toLocaleDateString();
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal"); // Set font and style
  pdf.text(`Product Referrance ID: ${productId}`, 15, yOffset);
  pdf.text(`Date: ${date}`, 15, yOffset + 10);

  const tableData = setReviews().rows.map((row) => [
    row.id,
    row.rating,
    row.user,
    row.comment,
  ]);

  // Customize table styling
  pdf.autoTable({
    head: [["ID", "Rating", "User", "Comment"]],
    body: tableData,
    startY: yOffset + 30,
    styles: {
      cellPadding: 4,
      fontSize: 12,
      textColor: [0, 0, 0], // Black text color
    },
  });

  // Calculate the height of the table
  const tableHeight = pdf.previousAutoTable.finalY + 10;

  // Add some space after the table
  yOffset += tableHeight;

  pdf.save("Ester Aura reviews.pdf");
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
    <Row>
      <Col md={2}>
        <Sidebar />
      </Col>
      <Col md={10}>
        <h1 className="my-4" style={{ fontSize: "24px", fontWeight: "bold" }}>
          Review List
        </h1>
        <Row className="justify-content-center mt-5">
          <Col md={5}>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label>Enter the Reference Id of the Product</label>
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
            </form>
            <Button
              onClick={generatePDF}
              className="btn btn-primary btn-block py-2 mt-3"
            >
              Generate PDF
            </Button>
          </Col>
        </Row>
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
  noBottomColumns={true}
  entries={5}  // Default number of entries per page
  entriesOptions={[5, 10, 15, 20]}  // Customize the entries options
  id="reviews-table"
/>

 
          )}
        </Fragment>
      </Col>
    </Row>
  );
}

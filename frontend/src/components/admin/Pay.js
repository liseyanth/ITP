import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable";

function Pay() {
  //read data from database
  const [paymentDetails, setPaymentDetails] = useState([]);
  //search
  const [searchQuery, setSearchQuery] = useState("");
  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/read").then((response) => {
      setPaymentDetails(response.data);
    });
  }, []);

  //delete
  const deletePayment = (id) => {
    Axios.delete(`http://localhost:8000/delete/${id}`);
    window.location.reload();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128);
    doc.text("Ester Aura", 105, 15, "center");
    doc.text("Payment Summary", 105, 25, "center");
    const tableStartY = 30;
    doc.autoTable({
      startY: tableStartY,
      head: [
        [
          "First Name",
          "Last Name",
          "Email",
          "Telephone",
          "Address",
          "Date & Time",
          "Status",
        ],
      ],
      body: filteredPaymentDetails.map((val) => [
        val.FirstName,
        val.LastName,
        val.Mail,
        val.Telephone,
        val.Address,
        val.Time,
        val.Status,
      ]),
    });

    doc.save("payment_details.pdf");
  };

  const handleApprove = async (id) => {
    try {
      await Axios.put(`http://localhost:8000/update/${id}`, {
        newStatus: "approved",
      });
      // No need to set the status state here, as it's not used in this context
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await Axios.put(`http://localhost:8000/update/${id}`, {
        newStatus: "rejected",
      });
      // No need to set the status state here, as it's not used in this context
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Filter payment details based on the search query
  const filteredPaymentDetails = paymentDetails.filter((val) => {
    const fieldsToSearch = [
      val.FirstName,
      val.LastName,
      val.Mail,
      val.Telephone,
      val.Country,
      val.City,
      val.Address,
      val.PostalCode,
      val.Province,
      val.Time, // You can include any additional fields you want to search
      val.Status,
    ];

    // Check if the search query exists in any of the fields
    return fieldsToSearch.some(
      (field) =>
        typeof field === "string" &&
        field.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // update form
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("Pending");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  //     const [status, setInputValue] = useState('pending'); // Set the initial value here

  //   const handleInputChange = (event) => {
  //     setInputValue(event.target.value);
  //   };

  const updatePayment = (id) => {
    Axios.put("http://localhost:8000/update", {
      newStatus: status,
      id: id,
    });
  };

  return (
    <div>
      <div className="table-responsive">
        <div className="form-group pull-right ">
          <input
            type="text"
            className="search form-control"
            placeholder="What you looking for?"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <FaSearch className="search-icon" />
        </div>
        <button className="btn btn-primary" onClick={generatePDF}>
          Generate PDF
        </button>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email </th>
              <th>Telephone</th>
              {/* <th>Country</th> */}
              {/* <th>City</th> */}
              <th>Address</th>
              {/* <th>Postal code</th> */}
              {/* <th>State/Province</th> */}
              <th>Date&Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {filteredPaymentDetails.length === 0 ? (
            <tr>
              <td colSpan="11" className="warning no-result">
                No Match Found
              </td>
            </tr>
          ) : (
            <tbody>
              {filteredPaymentDetails.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.FirstName}</td>
                    <td> {val.LastName}</td>
                    <td>{val.Mail}</td>
                    <td>{val.Telephone}</td>
                    {/* <td>{val.Country}</td> */}
                    {/* <td>{val.City}</td> */}
                    <td>{val.Address}</td>
                    {/* <td>{val.PostalCode}</td> */}
                    {/* <td>{val.Province}</td> */}
                    <td>{val.Time}</td>
                    <td>{val.Status}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleApprove(val._id)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleReject(val._id)}
                      >
                        Reject
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deletePayment(val._id)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {/* <!-- Modal --> */}

      {paymentDetails.map((val, key) => {
        return (
          <div
            className="modal fade"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            id={`exampleModal-${val._id}`}
            key={key}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit details
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    {/* <!-- Left side --> */}
                    <div className="col-lg-12">
                      <h3 className="h6 mb-4">Payment information</h3>

                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Payment Method</label>
                          <select
                            name="paymentMethod"
                            id="paymentMethod"
                            className="form-select"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                          >
                            <option selected>Choose..</option>
                            <option value="Cash on delivery">
                              Cash on delivery
                            </option>
                            <option value="Paypal">Paypal</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select
                            name="status"
                            id="status"
                            className="form-select"
                            value={status}
                            onChange={handleStatusChange}
                          >
                            <option selected>Choose..</option>
                            <option value="Successful">Successful</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => updatePayment()}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Pay;

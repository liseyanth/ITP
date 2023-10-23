import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTicket() {
  const { id } = useParams(); // Get the ticket ID from the URL
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerId: 1, // Set the initial value to 1
    subject: '',
    message: '',
    issueFoundAt: '',
    details: '',
  });

  useEffect(() => {
    // Fetch ticket data based on the ID
    fetch(`http://127.0.0.1:8000/ticket/get/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }
        return response.json();
      })
      .then((data) => {
        // Populate the form fields with fetched data
        setFormData({
          customerId: data.customerId,
          subject: data.subject,
          message: data.message,
          issueFoundAt: data.issueFoundAt,
          details: data.details,
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated ticket data to the backend
    fetch(`http://localhost:8000/ticket/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update the ticket');
        }
        alert('Ticket Updated Successfully');
        navigate('/viewticket');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="container-fluid pt-5 mb-5" style={{ background: '#f7e0c1'}}>
        <div className="container p-5 mt-5 bg-body-secondary" style={{ borderRadius: 20 }}>
          <h1 className="mt-3 text-center">Edit Ticket</h1>
          <div className="container">
            <form onSubmit={handleSubmit} className="text-start">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="customerId">Customer ID</label>
                    <input
                      type="number"
                      name="customerId"
                      value={formData.customerId}
                      readOnly
                      className="form-control"
                      id="customerId"
                      placeholder="Enter Customer ID"
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-control"
                      id="subject"
                      placeholder="Enter Subject"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="issueFoundAt">Issue Found At</label>
                    <input
                      type="text"
                      name="issueFoundAt"
                      value={formData.issueFoundAt}
                      onChange={handleInputChange}
                      className="form-control"
                      id="issueFoundAt"
                      placeholder="Enter Issue Found At"
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <input
                      type="text"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      className="form-control"
                      id="details"
                      placeholder="Enter Details"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-control"
                      id="message"
                      placeholder="Enter message"
                      required
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn col-3 mt-3 mb-5 btn-dark">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='' style={{ height: '200px' }}></div>
      </div>
    </div>
  );
}

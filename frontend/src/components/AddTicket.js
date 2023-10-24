import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddTicket() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: Math.floor(Math.random() * 1000), // Generate a random number between 0 and 999
    subject: '',
    message: '',
    issueFoundAt: '',
    details: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the ticket data to the backend
    fetch('http://127.0.0.1:8000/ticket/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add a new ticket');
        }
        alert('Ticket Added Successfully');
        navigate('/viewTicket');
        setFormData({
          customerId: Math.floor(Math.random() * 1000), // Generate a new random ID
          subject: '',
          message: '',
          issueFoundAt: '',
          details: '',
        });
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
          <h1 className="mt-3 text-center">Add Ticket</h1>
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
                      readOnly // Make it read-only, as it's not an input
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className='' style={{height:'200px'}}></div>
      </div>
    </div>
  );
}

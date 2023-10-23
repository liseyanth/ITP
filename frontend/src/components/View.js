import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';
import './admin/VT.css';

export default function View() {
    const [ticketList, setTicketList] = useState([]);
    const [filteredTicketList, setFilteredTicketList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/ticket/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ticket data');
                }
                return response.json();
            })
            .then((data) => {
                setTicketList(data);
                setFilteredTicketList(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === '') {
            setFilteredTicketList([...ticketList]);
        } else {
            const filtered = ticketList.filter((item) =>
                item.subject.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTicketList(filtered);
        }
    };

    const generateReport = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 1000]);

        page.drawText('Support Tickets Report', {
            x: 50,
            y: 950,
            size: 18,
            color: rgb(0, 0, 0),
        });

        let y = 900;
        filteredTicketList.forEach((item) => {
            const text = `Customer ID: ${item.customerId}\nSubject: ${item.subject}\nMessage: ${item.message}\nIssue Found At: ${item.issueFoundAt}\nDetails: ${item.details}`;
            page.drawText(text, {
                x: 50,
                y: y,
                size: 9,
                color: rgb(0, 0, 0),
            });
            y -= 200; // Adjust the line spacing
        });

        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    return (
        <div className="container mt-5">
            <h3 className="text-light">All Tickets</h3>
            <div className="row my-3">
                <div className="col-md-6 text-md-end">
                    <button className="btn btn-secondary" onClick={generateReport}>
                        <FontAwesomeIcon icon={faFilePdf} /> Generate PDF
                    </button>
                </div>
            </div>
            <form>
                <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Search Support Ticket"
                            aria-describedby="button-addon1"
                            className="form-control border-0 bg-light"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className="input-group-append">
                            <button
                                id="button-addon1"
                                type="submit"
                                className="btn btn-link text-primary"
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                        <th scope="col">Issue Found At</th>
                        <th scope="col">Details</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTicketList.map((item, index) => (
                        <tr key={item._id}>
                            <td>{item.customerId}</td>
                            <td>{item.subject}</td>
                            <td>{item.message}</td>
                            <td>{item.issueFoundAt}</td>
                            <td>{item.details}</td>
                            <td className="text-danger pt-3">
                                <Link to={`/editticket/${item._id}`}>
                                    <button className="btn btn-dark">
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <div className="alert alert-danger">{error}</div>}
            <div style={{ height: '200px' }}></div>
        </div>
    );
}

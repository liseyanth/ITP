import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../components/admin/Sidebar';
import { Link, Navigate } from 'react-router-dom';

function Discount() {
  const [suppliers, setSuppliers] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/dis');
        setSuppliers(res.data);
        console.log('suppliers:', res.data); // Fixed the console log
      } catch (error) {
        console.error('Error fetching data:', error); // Added error handling
      }
    };
    getAllData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'ARE YOU SURE?',
      text: 'DO YOU WANT TO DELETE THIS!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32dd32',
      cancelButtonColor: '#da2424',
      confirmButtonText: 'YES',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/dis/${id}`);
        const newSupplier = suppliers.filter((item) => item._id !== id);
        setSuppliers(newSupplier);
      } catch (error) {
        console.error('Error deleting supplier:', error); // Added error handling
      }
    } else {
      // You can navigate with a Link component or use window.location.href
      // Example using Link (ensure you have proper routing set up):
      // return <Link to="/edit">Go to edit page</Link>;
      // Or using window.location.href:
      window.location.href = '/edit';
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/dis/search?F_name=${value}`);
      setSuppliers(res.data);
      setValue('');
    } catch (error) {
      console.error('Error searching:', error); // Added error handling
    }
  };

  return (
    <div>
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="mt-5">
        <div className="container">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="dis Name"
              aria-label="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              SEARCH
            </button>
          </form>
          <h2 className="text-center">
            <b>ALL SUPPLIER DETAILS</b>
          </h2>
          <table className="table">
            <thead>
              <tr style={{ backgroundColor: '#0d0d0d', color: 'white' }}>
                <th scope="col">NO</th>
                <th scope="col">name</th>
                <th scope="col">description</th>
                <th scope="col">amount</th>
                <th scope="col">expirationDate</th>
                <th scope="col">status</th>
                <th scope="col">EDIT</th>
                <th scope="col">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={supplier._id}>
                  <td>{index + 1}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.description}</td>
                  <td>{supplier.amount}</td>
                  <td>{supplier.expirationDate}</td>
                  <td>{supplier.status}</td>
                  <td>
                    <Link to={`/edit_sup_form/${supplier._id}`}>
                      <button className="btn btn-primary">EDIT</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(supplier._id)} className="btn btn-danger">
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
  );
}

export default Discount;


import React,{useEffect, useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import Axios from 'axios'
function pay() {

     //read data from database 
       const[paymentDetails,setPaymentDetails]=useState([])
//search 
       const [searchQuery, setSearchQuery] = useState('');
  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

//use effect  v1
  useEffect(()=>{
    Axios.get("http://localhost:8000/read").then((response)=>
    {
      setPaymentDetails(response.data)
    })
      
  },[])


  //delete 
      const deletePayment=(id)=>{
        Axios.delete(`http://localhost:8000/delete/${id}`)
      }

 
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
    ];

    // Check if the search query exists in any of the fields
    return fieldsToSearch.some((field) =>
      typeof field === 'string' && field.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });


  return (
 <div>
    <div className="table-responsive">
    <div className="form-group pull-right " >
    <input type="text" className="search form-control" placeholder="What you looking for?"
    value={searchQuery}
    onChange={handleSearchInputChange}/>
    <FaSearch className="search-icon" />
     </div>
     
  
        <table className="table table-striped table-hover">
          
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email </th>
                    <th>Telephone</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Postal code</th>
                    <th>State/Province</th>
                    <th>Date&Time</th>
                    <th>Action</th>
                   

                </tr>
            </thead>
            {filteredPaymentDetails.length === 0 ? (
           <tr>
           <td colSpan="11" className='warning no-result'>No Match Found</td>
         </tr>
        ) : (
            <tbody>
            {filteredPaymentDetails.map((val, key) => {
            return(
                <tr key={key}>
                    <td>{val.FirstName}</td>
                    <td> {val.LastName}</td>
                    <td>{val.Mail}</td>
                    <td>{val.Telephone}</td>
                    <td>{val.Country}</td>
                    <td>{val.City}</td>
                    <td>{val.Address}</td>
                    <td>{val.PostalCode}</td>
                    <td>{val.Province}</td>
                    <td>{val.Time}</td>
                   

                    <td> <button type="button" class="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Edit</button></td>
                    <td><button type="button" className="btn btn-outline-danger btn-sm" 
                      onClick={()=>deletePayment(val._id)}
                    > Delete </button></td>
                </tr>
                 )
                })}
            </tbody>
            )}
        </table>
        
        
       
      </div>
      {/* <!-- Modal --> */}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit details</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        {/* <!-- Left side --> */}
                        <div class="col-lg-12">
                            {/* <!-- Basic information --> */}

                            <h3 class="h6 mb-4">Basic information</h3>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">First name</label>
                                        <input type="text" name="" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">Last name</label>
                                        <input type="text" name="" class="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">Email</label>
                                        <input type="email" name="" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">Date/Time</label>
                                        <input type="datetime" name="" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">Payment Method</label>
                                        <select name="" id="" class="form-select">
                                            <option selected>Choose..</option>
                                            <option value="">Cash on delivery</option>
                                            <option value="">Paypal</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label class="form-label">Status</label>
                                        <select name="" id="" class="form-select">
                                            <option selected>Choose..</option>
                                            <option value="">Delivered</option>
                                            <option value="">Pending</option>
                                            <option value="">Rejected</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Update</button>
                </div>
            </div>

       </div>
   </div>

</div>
  )
}

export default payment

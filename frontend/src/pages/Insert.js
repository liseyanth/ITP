import React, { useState } from 'react';//useState add a functional components
import axios from "axios";//Communicate with backend, make request and return data from the API
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Insert() {
    const [ render,setRender] = useState(false);

    const [input, setInput] = useState({
        name:"",
        description:"",
        amount:"",
        expirationDate:"",
        status:"",
        isValidPhone: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.name || !input.description || !input.amount || !input.expirationDate || !input.status ) {
            Swal.fire({
              icon: 'error',
              title: 'PLEASE FILL ALL FIELDS',
              text: 'PLEASE FILL IN all required fields before submitting the form',
            });
            return;
          }
          
        Swal.fire({
            icon: "success",
            title: "Discount Added!",
            confirmButtonText: "OK",
            onConfirm: () => {

            },
        })
          
        await axios.post("http://localhost:7000/api/v1/dis", input);
        console.log("supplier:",input)
        setRender(true)
        setInput({
            name:"",
            description:"",
            amount:"",
            expirationDate:"",
            status:"",
        })
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        // let isValidNic = input.isValidNic;
        let isValidPhone = input.isValidPhone
        // if (name === 'nic') {
        //     // NIC validation logic
        //     isValidNic = false;
        //     if (value.length === 10 && value.match(/^\d{9}[vV]$/)) {
        //       isValidNic = true;
        //     } else if (value.length === 12 && value.match(/^\d{12}$/)) {
        //       isValidNic = true;
        //     }
        //   }
          if (name === 'phone') {
            // Check if the input field being updated is the contactNo field 
             isValidPhone = false;
             if (value.length === 10) {
                 isValidPhone = true;
             } 
           }

        setInput(prevFormData => ({
            ...prevFormData,
            [name]: value,
            // isValidNic: isValidNic,
            isValidPhone: isValidPhone,
        }));
        
    };
   
    return (
        <div className='container'>
            
            <form className='con' onSubmit={handleSubmit}>
                <div className='row'>
                    <h2><b>INSERT NEW DISCOUNT</b></h2><br></br>
                    <div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">DISCOUNT NAME</label>
                        <input
                            name="name"
                            value={input.name}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">DESCRIPTION</label>
                        <input
                            name="description"
                            value={input.description}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">AMOUNT</label>
                        <input
                            name="amount"
                            value={input.amount}
                            onChange={handleInputChange}
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">EXPIRATION DATE</label>
                        <input
                            name="expirationDate"
                            value={input.expirationDate}
                            onChange={handleInputChange}
                            type="date"
                            class="form-control"
                            id="exampleNic"
                        />
                       
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">STATUS</label>
                        <input
                            name="status"
                            value={input.status}
                            onChange={handleInputChange}
                            type="phone"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                        {/* {!input.isValidPhone && (
                        <span style={{ color: "red" }}>Invalid Phone Number</span>
                        )} */}
                    </div>
                    </div>
                    
                </div>
              
        <div class="my-3">
            <button type="submit" class="btn btn-success me-5">SUBMIT</button>
            <Link to={"/"}><button className='btn btn-danger'>CANCEL</button></Link>
        </div>
            
            </form>
            
        </div>
    )
}

export default Insert
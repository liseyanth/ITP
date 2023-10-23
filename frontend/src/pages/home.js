import React,{useState,useEffect}from 'react';
import axios from "axios";

function Home() {
    const[render]=useState(false);
    const [suppliers,setSuppliers]=useState([]);
    const [value, setValue] = useState("");


useEffect(()=>{
       const getAllData=async()=>{
             const res=await axios.get("http://localhost:7000/api/v1/dis");
             setSuppliers(res.data);
       };
       getAllData();
              },[render]);

          const handleSearch = async (e) => {
              e.preventDefault();
                try {
                  const res = await axios.get(`http://localhost:7000/api/v1/dis/search?F_name=${value}`);
                  setSuppliers(res.data);
                  setValue("");
                } catch (error) {
                  console.log(error);
                }
              };
    return (
       
            <div className='container' > 
      <form class="d-flex" role="search"   onSubmit={handleSearch}>
        <input class="form-control me-2"
         type="search"
          placeholder="dis Name" 
          aria-label="Search"
          value={value}
          onChange={(e)=>setValue(e.target.value)}/>
        <button class="btn btn-outline-success" type="submit">SEARCH</button>
      </form>
      
      <h2 class="text-center"><b> ALL DISCOUNT DETAILS</b></h2>
            
                <table class="table">
                    <thead>
                        <tr style={{ backgroundColor:'#0d0d0d' , color:'white'  }}>
                            <th scope="col">NO</th>
                            <th scope="col">name</th>
                            <th scope="col">description</th>
                            <th scope="col">amount</th>
                            <th scope="col">expirationDate</th>
                            <th scope="col">status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                       {suppliers&& suppliers.map((supplier,index)=>{
                        return (
                            <tr key={supplier._id}>
                                <td>{index + 1}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.description}</td>
                            <td>{supplier.amount}</td>
                            <td>{supplier.expirationDate}</td>
                            <td>{supplier.status}</td>          
                        </tr>

                        )
                       })}
                        
                    </tbody>
                    
                </table>
                
            </div> 
        
    )
}

export default Home
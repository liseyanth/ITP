import React,{useState} from 'react'
import ShippingForm from '../paymentComponent/shippingForm'
import PaymentDetails from '../paymentComponent/paymentDetails';
function FormSwitcher() {
   

  // disable left side component 
  const [isSecondComponentEnabled, setSecondComponentEnabled] = useState(false);

  const enableSecondComponent = (isEnabled) => {
    setSecondComponentEnabled(isEnabled); // Enable or disable the second component
  };

  return (
     
       <div className="container-fluid ">
      <div className="container">
          <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row mt-3">
            <h2 className="h5 mb-3 mb-lg-0"><a href="#" className="text-muted"></a>Payment Form for PayPal</h2>
           
          </div>
          <hr/>
      <div className="row">
      <div className="col-lg-8">
       <ShippingForm enableSecondComponent={enableSecondComponent}  />
      </div>
       <div className="col-lg-4">
       <PaymentDetails isEnabled={isSecondComponentEnabled}/> 
       </div>
      </div>
      </div>
      
      </div>
   
  )
}

export default FormSwitcher

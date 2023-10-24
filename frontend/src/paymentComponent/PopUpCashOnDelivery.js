import React,{useState} from 'react';
 
function PopupForm({ closePopup }) {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleCloseClick = () => {
       setIsFormSubmitted(true);
  };



  return (
    <div className="popup">
      <div className="popup-content">
      {isFormSubmitted ? (
          <div>
            <h2 style={{color:'#1b5c04'}}> purchased successfully!</h2>
            <p>Thank you for your purchase</p>
            <button type="button" className="btn btn-success" data-dismiss="modal">Ok</button>
          </div>
        ) : (
         <div> 
        <h2>Confirm order</h2>
        <p>You can pay in cash to our courier when you receive the Cosmetics at your doorstep.</p>
      
         
        <button type="button" className="btn btn-primary btn-lg" data-dismiss="modal" onClick={handleCloseClick}>Confirm</button>
        <button type="button" className="btn btn-secondary btn-lg" data-dismiss="modal" onClick={closePopup}> Cancel</button>
           </div>
        )}
      </div>   
    </div>     
 
  );
}

export default PopupForm;
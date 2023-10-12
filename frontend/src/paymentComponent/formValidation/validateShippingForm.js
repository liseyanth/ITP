export default function ValidateShippingForm(values){
           let errors={}
           if(!values.firstName.trim()){
               errors.firstName ="first-name required"
           }
           if(!values.lastName.trim()){
            errors.lastName ="last-name required"
           }
           if (!values.email.trim()) {
            errors.email = "Email is required";
          } else if (/^[A-Za-z][A-Za-z0-9@]+$/.test(values.email)) {
            errors.email = "Invalid email format (try with letters, numbers, @)";
          } else if (!/^[A-Za-z]/.test(values.email)) {
            errors.email = "First character must be a letter";
          }
          
           if(!values.telephone.trim()){
            errors.telephone="phone Number required"
           }
           else if(!/^\+?[0-9]{8,15}$/.test(values.telephone)){
                  errors.telephone="invalid number [range 8 to 15]"
           }
         
            
           if(values.country==""){
            errors.country="please choose your country"
           }
           if(!values.city.trim()){
            errors.city="city required"
           }
           if(!values.province.trim()){
            errors.province="province/state required"
           }
           if(!values.address.trim()){
            errors.address="address required"
           }
           if(!values.postalCode.trim()){
            errors.postalCode="postal-code required"
           }
        
           return errors
}
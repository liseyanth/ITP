export default function ValidateShippingForm(values) {
  let errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email)
  ) {
    errors.email = "Invalid email format";
  }

  if (!values.telephone.trim()) {
    errors.telephone = "Phone number is required";
} else if (!/^\d{8,15}$/.test(values.telephone)) {
    errors.telephone = "Invalid phone number (must be 8 to 15 digits)";
}

  if (values.country === "") {
    errors.country = "Please choose your country";
  }

  if (!values.city.trim()) {
    errors.city = "City is required";
  }

  if (!values.postalCode.trim()) {
    errors.postalCode = "Postal code is required";
} else if (!/^\d+$/.test(values.postalCode)) {
    errors.postalCode = "Postal code must contain only numbers";
}


  if (!values.address.trim()) {
    errors.address = "Address is required";
  }

  if (!values.postalCode.trim()) {
    errors.postalCode = "Postal code is required";
  } else if (!/^[0-9]+$/.test(values.postalCode)) {
    errors.postalCode = "Postal code must contain only numbers";
  }

  return errors;
}

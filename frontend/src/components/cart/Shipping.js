import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { countries } from 'countries-list';
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";
import './Shipping.css';

export const validateShipping = (shippingInfo, navigate) => {
    if (
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode
    ) {
        toast.error('Please fill in the shipping information', { position: toast.POSITION.BOTTOM_CENTER });
        navigate('/shipping');
    }
}

export default function Shipping() {
    const { shippingInfo = {} } = useSelector(state => state.cartState);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const countryList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        // Validate the phone number to ensure it contains exactly 10 digits
        if (phoneNo.length !== 10) {
            toast.error('Phone number must be 10 digits', { position: toast.POSITION.BOTTOM_CENTER });
            return; // Don't proceed if validation fails
        }

        if (postalCode.length !== 6) {
            toast.error('Postal code must be exactly 6 digits', { position: toast.POSITION.BOTTOM_CENTER });
            return; // Don't proceed if validation fails
        }

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
        navigate('/order/confirm');
    }

    return (
        <Fragment>
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-12 col-md-6 offset-md-3">
                    <form onSubmit={submitHandler} className="shadow-lg p-4">
                        <h1 className="form-label">Shipping Information</h1>
                        <div className="mb-3">
                            <label htmlFor="address_field" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your address"
                                style={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.5)' }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city_field" className="form-label">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter your city"
                                style={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.5)' }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone_field" className="form-label">Phone No</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => {
                                    // Use a regular expression to remove non-numeric characters
                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                    setPhoneNo(numericValue);
                                }}
                                placeholder="Enter your phone number"
                                style={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.5)' }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="postal_code_field" className="form-label">Postal Code (6 digits)</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => {
                                    // Limit the input to 6 characters
                                    const value = e.target.value.substring(0, 6);
                                    setPostalCode(value);
                                }}
                                placeholder="Enter your postal code"
                                style={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.5)' }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country_field" className="form-label">Country</label>
                            <select
                                id="country_field"
                                className="form-select"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                style={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.5)' }}
                                required
                            >
                                {countryList.map((country, i) => (
                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="state_field" className="form-label">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="Enter your state"
                                style={{ boxShadow: '0 4px 6px rgba(255, 165, 0, 0.5)' }}
                                required
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-primary btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

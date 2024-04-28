import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CheckoutForm() {
    const cart = useSelector(state => state.cart);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CASH");

    const baseURL = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("token");
    const isLoggedIn = () => {
        const token = sessionStorage.getItem('token');
        return token != null;
    }
    let data = JSON.stringify({
        "address": {
            "firstLine": street,
            "city": city,
            "state": state,
            "pincode": pincode
        },
        "paymentMethod": paymentMethod,
        "orderItems": cart.items.map((item) => ({
            "bookId": item.bookId,
            "quantity": item.qty,
            "amount": (item.sellingPrice * item.qty)
        }))
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseURL + 'user/place_order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: data
    };

    async function placeOrder() {
        try {
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
            toast.success("Placed order successfully");
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const handlePlaceOrder = () => {
        placeOrder();
    }

    return (
        <form>
            <div className="form-floating mb-2">
                <input type="text" className="form-control" id="street" placeholder="Cosmos Complex" onChange={(e) => setStreet(e.target.value)} />
                <label for="street">Street</label>
            </div>
            <div className="form-floating mb-2">
                <input type="text" className="form-control" id="city" placeholder="Pune" onChange={(e) => setCity(e.target.value)} />
                <label for="city">City</label>
            </div>
            <div className="form-floating mb-2">
                <input type="text" className="form-control" id="state" placeholder="Maharashtra" onChange={(e) => setState(e.target.value)} />
                <label for="state">State</label>
            </div>
            <div className="form-floating mb-2">
                <input type="text" className="form-control" id="pincode" placeholder="411001" onChange={(e) => setPincode(e.target.value)} />
                <label for="pincode">Pincode</label>
            </div>
            <select className="form-select mb-2" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => setPaymentMethod(e.target.value)}>
                <option selected value={paymentMethod}>CASH ON DELIVERY</option>
                <option value="CASH">CASH ON DELIVERY</option>
                <option value="UPI">UPI</option>
                <option value="CREDIT_CARD">CREDIT CARD</option>
                <option value="DEBIT_CARD">DEBIT CARD</option>
            </select>
            <div className="d-grid mb-3">
                {isLoggedIn() ? <button className="btn btn-secondary" type="button" onClick={handlePlaceOrder}>Place Order</button> : <button className="btn btn-secondary" type="button" disabled>Login to Place Order</button>}
            </div>
        </form>
    )
}

export default CheckoutForm
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

function Footer() {
    const [email, setEmail] = useState("");
    const handleSubmitNewsletter = async (e) => {
        //add code to verify the email is in correct format
        e.preventDefault();
        apiCall();
        setEmail("");
    }
    const apiCall = async () => {
        const baseURL = process.env.REACT_APP_API_URL;
        let data = JSON.stringify({
            "email": email
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'services/newsletter',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                toast.success("Subscribed to Newsletter");
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <nav className="navbar bg-body-tertiary fixed-bottom">
            <div className="container-fluid">
                <div className="d-flex ">
                    <a className="navbar-brand fw-bold text-end fs-6">
                        <i className="bi bi-twitter fs-4 me-3"></i>
                        <i className="bi bi-facebook fs-4 me-3"></i>
                        <i className="bi bi-instagram fs-4 me-3"></i>
                        <i className="bi bi-github fs-4 me-3"></i>
                        <i className="bi bi-linkedin fs-4 me-3"></i>
                        <i className="bi bi-whatsapp fs-4 me-3"></i>
                    </a>
                </div>
                <div className="d-flex ">
                    <a className="navbar-brand fw-bold text-end fs-6">Subscribe to our newsletter for more exciting offers</a>
                </div>
                <form className="d-flex ">
                    <input className="form-control me-2" type="email" placeholder="Enter you email" aria-label="email" onChange={(e) => setEmail(e.target.value)} required />
                    <button className="btn btn-outline-success" onClick={handleSubmitNewsletter}>Subscribe</button>
                </form>
            </div>
        </nav>
    )
}

export default Footer
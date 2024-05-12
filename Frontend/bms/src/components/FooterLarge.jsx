import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function FooterLarge() {
    const [email, setEmail] = useState("");
    const handleSubmitNewsletter = async (e) => {
        //add code to verify the email is in correct format
        e.preventDefault();
        apiCall();
        setEmail("");
    }
    const apiCall = async () => {
        const baseURL = window._env_.API_URL;
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
        <nav className="navbar bg-body-tertiary mt-1">
            <div className="container-fluid">
                <div className="d-flex ">
                    <p className="navbar-brand fw-bold text-end fs-6">
                        <a href='http://www.twitter.com' style={{ color: "black", textDecoration: 'none' }}><i className="bi bi-twitter fs-4 me-3"></i></a>
                        <a href='http://www.facebook.com' style={{ color: "black", textDecoration: 'none' }}><i className="bi bi-facebook fs-4 me-3"></i></a>
                        <a href='http://www.instagram.com' style={{ color: "black", textDecoration: 'none' }}><i className="bi bi-instagram fs-4 me-3"></i></a>
                        <a href='https://github.com/GoravG' style={{ color: "black", textDecoration: 'none' }}><i className="bi bi-github fs-4 me-3"></i></a>
                        <a href='http://www.linkedin.com' style={{ color: "black", textDecoration: 'none' }}><i className="bi bi-linkedin fs-4 me-3"></i></a>
                        <a href='https://api.whatsapp.com/send?phone=+919665105760' style={{ color: "black", textDecoration: 'none' }}><i className="bi bi-whatsapp fs-4 me-3"></i></a>
                        <Link to="/admin/login"><i className="bi bi-gear-fill fs-4 me-3"></i></Link>
                    </p>
                </div>
                <div className="d-flex mt-2 fw-bold">
                    <p>&copy; 2024 GoravG, Inc. All rights reserved.</p>
                </div>
                <div>
                    <a className="navbar-brand fw-bold text-end fs-6">Subscribe to our newsletter for more exciting offers</a>
                    <form className="d-flex ">
                        <input className="form-control me-2" type="email" placeholder="Enter you email" aria-label="email" onChange={(e) => setEmail(e.target.value)} required />
                        <button className="btn btn-outline-success me-2" onClick={handleSubmitNewsletter}>Subscribe</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default FooterLarge
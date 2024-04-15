import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from './Footer';


export default function UserLoginFrom() {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        loginCitizen();
        setEmail("");
        setPassword("");
    }
    var isPassword = true;
    const showPassword = () => {
        if (isPassword) {
            document.getElementById("pass").type = 'text';
            isPassword = false;
        } else {
            document.getElementById("pass").type = 'password';
            isPassword = true;
        }
    }
    const loginCitizen = async () => {
        let data = JSON.stringify({ "email": email, "password": password });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'user/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                sessionStorage.setItem("token", response.data);
                toast.success("Login Successful");
                navigate('/user/dashboard');
            })
            .catch((error) => {
                toast.warn("Login Failed");
            });
    };


    return (
        <>
            <div className="container container-fluid mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div className="container  p-3">
                                <form action="submit">
                                    <div className="mb-3">
                                        <div className="text-center mt-2 fw-bolder"><h1>Login</h1></div>
                                        <div className="form-floating mb-2">
                                            <input type="email" className="form-control" id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                            <label for="email">Email</label>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="password" className="form-control" id="pass" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                                        <label for="pass">Password</label>
                                    </div>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={showPassword} />
                                    <label className="form-check-label ms-2" for="flexCheckDefault">
                                        Show password
                                    </label>
                                    <div className="mb-3">
                                        <div className="d-grid gap-2 text-center">
                                            <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmit}>Submit</button>
                                            <h6 className='mt-2'>Don't have an account? <Link to="/user/register">Register Here</Link></h6>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div >
            </div >
            <Footer></Footer>
        </>
    )
}
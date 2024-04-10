import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function AdminLoginForm() {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginCitizen();
        setEmail("");
        setPassword("");
    }
    const loginCitizen = async () => {
        let data = JSON.stringify({ "email": email, "password": password });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                sessionStorage.setItem("token", response.data);
                toast.success("Login Successful");
                navigate('/admin/dashboard');
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
                                        <div className="text-center mt-2 fw-bolder"><h1>Admin Login</h1></div>
                                        <div class="form-floating mb-2">
                                            <input type="email" class="form-control" id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                            <label for="email">Email</label>
                                        </div>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <input type="password" class="form-control" id="pass" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                                        <label for="pass">Password</label>
                                    </div>
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={showPassword} />
                                    <label class="form-check-label ms-2" for="flexCheckDefault">
                                        Show password
                                    </label>
                                    <div className="mb-3">
                                        <div className="d-grid gap-2 text-center">
                                            <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmit}>Submit</button>
                                            <h6 className='mt-2'>Not Admin? Go to <Link to="/user/register">User Login</Link></h6>
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

export default AdminLoginForm
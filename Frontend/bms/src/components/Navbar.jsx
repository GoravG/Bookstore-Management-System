import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = () => {
        const token = sessionStorage.getItem("token");
        console.log(token);
        return token != null
    }
    const isLoggedOut = () => {
        const token = sessionStorage.getItem("token");
        console.log(token);
        return token == null
    }
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/")
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand fw-bolder"><i class="bi bi-book-half me-2"></i><Link to="/" style={{ color: "black", textDecoration: 'none' }}>Sunbeam Books</Link></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <button className="btn btn-light me-2" ><Link to="/" style={{ color: "black", textDecoration: 'none' }}>Home</Link></button>
                            </li>
                            <li class="nav-item dropdown">
                                <button className="btn btn-light me-2" ><Link to="/popular" style={{ color: "black", textDecoration: 'none' }}>Popular</Link></button>
                            </li>
                            <li class="nav-item dropdown">
                                <button className="btn btn-light me-2" ><Link to="/categories" style={{ color: "black", textDecoration: 'none' }}>Categories</Link></button>
                            </li>
                        </ul>
                        {isLoggedIn() && (<li class="d-flex">
                            <button className="btn btn-light me-2" style={{ color: "black", textDecoration: 'none' }} onClick={handleLogout}>Logout</button>
                        </li>)}
                        {isLoggedOut() && (<li class="d-flex">
                            <button className="btn btn-light me-2" ><Link to="/user/login" style={{ color: "black", textDecoration: 'none' }}>Login</Link></button>
                        </li>)}
                        {isLoggedOut() && (<li class="d-flex">
                            <button className="btn btn-light me-2" ><Link to="/user/register" style={{ color: "black", textDecoration: 'none' }}>Register</Link></button>
                        </li>)}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    //selector
    const cart = useSelector(state => state.cart);
    const isLoggedIn = () => {
        const token = sessionStorage.getItem("token");
        return token != null
    }
    const isLoggedOut = () => {
        const token = sessionStorage.getItem("token");
        return token == null
    }
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <i className="bi bi-book-half me-2"></i><Link className='navbar-brand fw-bolder' to="/" style={{ color: "black", textDecoration: 'none' }}>Sunbeam Books</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="btn btn-light me-2" ><Link to="/" style={{ color: "black", textDecoration: 'none' }}>Home</Link></button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn btn-light me-2" ><Link to="/discover/1" style={{ color: "black", textDecoration: 'none' }}>Discover</Link></button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn btn-light me-2" ><Link to="/categories" style={{ color: "black", textDecoration: 'none' }}>Categories</Link></button>
                            </li>
                        </ul>
                        {isLoggedIn() && (<li className="d-flex">
                            <button className="btn btn-light me-2" style={{ color: "black", textDecoration: 'none' }} onClick={handleLogout}>Logout</button>
                        </li>)}
                        {isLoggedOut() && (<li className="d-flex">
                            <button className="btn btn-light me-2" ><Link to="/user/login" style={{ color: "black", textDecoration: 'none' }}>Login</Link></button>
                        </li>)}

                        {isLoggedOut() && (<li className="d-flex">
                            <button className="btn btn-light me-2" ><Link to="/user/register" style={{ color: "black", textDecoration: 'none' }}>Register</Link></button>
                        </li>)}
                        <li className="nav-item">
                            <button className="btn btn-light me-2" ><Link to="/cart" style={{ color: "black", textDecoration: 'none' }}>Cart {cart.items.length > 0 && <span class="badge text-bg-danger">{cart.items.length}</span>} <i class="bi bi-cart3"></i></Link></button>
                        </li>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
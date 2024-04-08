import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

function AdminDashboardPage() {
    return (
        <>
            <Navbar></Navbar>
            <div className="container w-50">
                <h1 className="text-center pt-5 fw-bolder pb-2">Welcome Admin</h1>
                <div className="container text-center mt-2">
                    < a className="btn btn-light my-2">
                        <Link to="/admin/add_book" style={{ color: "black", textDecoration: 'none' }}>Add New Book</Link>
                    </a>
                    <br />
                    < a className="btn btn-light my-2">
                        <Link to="/admin/add_category" style={{ color: "black", textDecoration: 'none' }}>Add New Category</Link>
                    </a>
                    <br />
                </div>
            </div >
        </>
    )
}

export default AdminDashboardPage
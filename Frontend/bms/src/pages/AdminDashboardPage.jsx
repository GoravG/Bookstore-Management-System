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
                    < div className="btn btn-light my-2">
                        <Link to="/admin/add_book" style={{ color: "black", textDecoration: 'none' }}>Add New Book</Link>
                    </div>
                    <br />
                    < div className="btn btn-light my-2">
                        <Link to="/admin/add_category" style={{ color: "black", textDecoration: 'none' }}>Add New Category</Link>
                    </div>
                    <br />
                    < div className="btn btn-light my-2">
                        <Link to="/admin/add_inventory" style={{ color: "black", textDecoration: 'none' }}>Add / Update Existing Book From Inventory</Link>
                    </div>
                    <br />
                    < div className="btn btn-light my-2">
                        <Link to="/admin/inventory" style={{ color: "black", textDecoration: 'none' }}>Inventory</Link>
                    </div>
                    <br />
                    < div className="btn btn-light my-2">
                        <Link to="/admin/edit_book" style={{ color: "black", textDecoration: 'none' }}>Edit Book Details</Link>
                    </div>
                    <br />
                    < div className="btn btn-light my-2">
                        <Link to="/admin/orders/1" style={{ color: "black", textDecoration: 'none' }}>Orders</Link>
                    </div>
                    <br />
                    < div className="btn btn-light my-2">
                        <Link to="/admin/insights" style={{ color: "black", textDecoration: 'none' }}>Insights</Link>
                    </div>
                    <br />
                </div>
            </div >
        </>
    )
}

export default AdminDashboardPage
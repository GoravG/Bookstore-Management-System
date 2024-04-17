import React from 'react'
import Navbar from '../components/Navbar'
import CartItems from '../components/CartItems';
import Subtotal from '../components/Subtotal';
import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
    return (
        <>
            <Navbar></Navbar>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-8">
                        <CartItems />
                    </div>
                    <div className="col-4 shadow mb-2 border rounded">
                        <Subtotal />
                        <CheckoutForm />
                    </div>
                </div >
            </div >
        </>
    )
}

export default CheckoutPage
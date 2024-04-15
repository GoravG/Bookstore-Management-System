import React from 'react'
import Navbar from '../components/Navbar'
import CartItems from '../components/CartItems';
import Subtotal from '../components/Subtotal';
import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
    return (
        <>
            <Navbar></Navbar>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-8"><CartItems /></div>
                    <div class="col-4 mt-2 shadow mb-2 border rounded">
                        <Subtotal />
                        <CheckoutForm />
                    </div>
                </div >
            </div >
        </>
    )
}

export default CheckoutPage
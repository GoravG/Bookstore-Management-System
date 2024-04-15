import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import CartItemRow from '../components/CartItemRow';
import { Link } from 'react-router-dom';

function CartPage() {
    const cart = useSelector(state => state.cart);
    const [totalAmount, setTotalAmount] = useState();
    const [totalSaving, setTotalSaving] = useState();
    useEffect(() => {
        var totalAmt = 0;
        var totalMRP = 0;
        for (const item of cart.items) {
            totalAmt = totalAmt + item.sellingPrice * item.qty;
            totalMRP = totalMRP + item.mrp * item.qty;
        }
        setTotalAmount(totalAmt);
        setTotalSaving(totalMRP - totalAmt);
    }, [cart.items])
    const isLoggedIn = () => {
        const token = sessionStorage.getItem('token');
        return token != null;
    }
    return (
        <>
            <Navbar />
            <h1 className='text-center mt-2'>Cart</h1>
            {cart.items.length == 0 ?
                <>
                    <h5 className='text-center'>
                        "Oops! 🛒 Looks like your cart is empty!<br /> No worries though, it's a blank canvas ready for your exploration.<br /> Dive into our library 📚 and discover your next adventure!<br />Happy browsing! 😊"</h5>
                </>
                :
                <>
                    <div className="container">
                        {cart.items.map((item) => {
                            return <CartItemRow item={item} />
                        })}
                        <div className='text-center fw-bolder  fs-4 mt-4 mb-2'>Total Amount: ₹ {totalAmount}</div>
                        <div className='text-center text-success fw-bold  fs-5 mt-2 mb-2'>Total Savings: ₹ {totalSaving}</div>
                    </div>
                    {isLoggedIn() ?
                        <div className='container text-center'>
                            <Link to="/checkout" className='btn btn-primary' style={{ color: "white", textDecoration: 'none' }}>Proceed to Checkout <i class="bi bi-bag-check"></i> </Link>
                        </div> :
                        <div className='container text-center'>
                            <Link to="/user/login" className='btn btn-primary' style={{ color: "white", textDecoration: 'none' }}>Login to Checkout <i class="bi bi-bag-check"></i> </Link>
                        </div>
                    }
                </>}

        </>
    )
}

export default CartPage
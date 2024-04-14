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
                <><table class="table table-bordered container text-center">
                    <thead>
                        <tr>
                            <th scope="col">BookID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Cover Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Action</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>

                        {cart.items.map((item) => {
                            return <CartItemRow item={item} />
                        })}
                        <tr>
                            <td colSpan={6} className='text-end'>Total Savings:</td>
                            <td>{totalSaving}</td>
                        </tr>
                        <tr>
                            <td colSpan={6} className='text-end fw-bold'>Total Amount:</td>
                            <td className='fw-bold'>{totalAmount}</td>
                        </tr>
                    </tbody>

                </table>
                    {isLoggedIn() &&
                        <div className='container text-center'>
                            <Link to="/checkout" className='btn btn-primary' style={{ color: "white", textDecoration: 'none' }}>Checkout <i class="bi bi-bag-check"></i> </Link>
                        </div>
                    }
                </>}

        </>
    )
}

export default CartPage
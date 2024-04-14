import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

function CheckoutPage() {
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
    return (
        <>
            <Navbar></Navbar>
            <h3>Total amount:{totalAmount}</h3>
            <h3>Total saving:{totalSaving}</h3>
        </>
    )
}

export default CheckoutPage
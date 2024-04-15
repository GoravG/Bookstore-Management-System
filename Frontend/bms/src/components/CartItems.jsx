import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import CartItem from './CartItem';

function CartItems() {
    const cart = useSelector(state => state.cart);
    return (
        <>
            <h3 className='container mb-3 text-center fw-bold'>Your Cart</h3>

            {cart.items.map((item) =>
                <CartItem item={item} />)}
        </>
    )
}

export default CartItems
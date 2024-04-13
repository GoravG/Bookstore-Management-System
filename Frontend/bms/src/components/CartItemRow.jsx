import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '../features/cartSlice';
import { useState } from 'react';

function CartItemRow({ item }) {
    const dispatch = useDispatch();
    const addQty = () => {
        dispatch(updateQuantity({ bookId: item.bookId, qty: item.qty + 1 }));
    }
    const removeQty = () => {
        dispatch(updateQuantity({ bookId: item.bookId, qty: item.qty - 1 }));
    }
    const [imgURL, setImgURL] = useState("");
    const processImage = () => {
        const coverImg = item.coverImage;
        // Decode the base64 string
        const decodedImage = atob(coverImg);
        // Convert the decoded string to a Uint8Array
        const arrayBuffer = new Uint8Array(decodedImage.length);
        for (let i = 0; i < decodedImage.length; i++) {
            arrayBuffer[i] = decodedImage.charCodeAt(i);
        }
        // Create a blob from the Uint8Array
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Change the type accordingly
        // Create a URL for the blob
        const imageUrl = URL.createObjectURL(blob);
        setImgURL(imageUrl);
    }
    useEffect(() => {
        processImage();
    }, [])
    return (
        <tr>
            <td>{item.bookId}</td>
            <td>{item.title}</td>
            <td><img src={imgURL} alt="" height={100} /></td>
            <td>{item.sellingPrice}</td>
            <td>{item.qty}</td>
            <td>
                <button className="btn btn-success me-2" onClick={addQty}><i class="bi bi-plus-circle-fill"></i></button><button className="btn btn-danger" onClick={removeQty}><i class="bi bi-dash-circle-fill"></i></button>
            </td>
            <td>{item.sellingPrice * item.qty}</td>
        </tr>
    )
}

export default CartItemRow
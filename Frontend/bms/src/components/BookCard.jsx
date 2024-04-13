import React, { useEffect } from 'react'
import { useState } from 'react';

function BookCard({ bookId, title, author, description, noOfPages, coverImage, stock, sellingPrice, mrp }) {
    const [imgURL, setImageURL] = useState("");
    useEffect(() => {
        const coverImg = coverImage;
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
        setImageURL(imageUrl);
    }, [])
    const calcDiscount = () => {
        const disc = ((mrp - sellingPrice) / (mrp)) * 100
        return Math.round(disc, 2);
    }
    const handleAddToCart = () => {
        //Continue here
        console.log("Added to cart");
    }
    return (
        <div className="col">
            <div className="card h-100 shadow">
                <img src={imgURL} className="card-img-top" alt="..." height={450} width={100} />
                <div className="card-body mb-0">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{author}</p>
                    {stock == 0 ? <><h4 className='text-secondary'>Currently not available</h4></> : <><h4 className='fw-bold'>₹{sellingPrice} ({calcDiscount()}% discount)</h4>
                        <h5 className='text-decoration-line-through fw-light'>₹ {mrp}</h5></>}
                </div>
                <div class="card-footer">
                    {stock == 0 ?
                        <button type="button" class="btn btn-secondary" disabled>Not Available</button>
                        :
                        <>
                            <button type="button" class="btn btn-success" onClick={handleAddToCart} >Add to Cart</button>
                        </>}
                </div>
            </div >
        </div>
    )
}

export default BookCard
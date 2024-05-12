import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addItem } from '../features/cartSlice';
function BookDetails({ bookId }) {
    const baseURL = window._env_.API_URL;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'commons/book/' + bookId,
        headers: {
        }
    };

    const dispatch = useDispatch();

    async function getData() {
        try {
            const response = await axios.request(config);
            const data = response.data;
            setAuthor(data.author);
            setCategory(data.categoryName);
            setDesc(data.description);
            const coverImg = response.data.coverImage;
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
            setMrp(data.mrp);
            setNoOfPages(data.noOfPages);
            setSellingPrice(data.sellingPrice);
            setStock(data.stock);
            setTitle(data.title);
            setCoverImage(data.coverImage);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    const calcDiscount = () => {
        const disc = ((mrp - sellingPrice) / (mrp)) * 100
        return Math.round(disc, 2);
    }

    const handleAddToCart = () => {
        dispatch(addItem({ bookId, title, coverImage, sellingPrice, mrp, qty: 1 }));
        toast.success("Added " + title + " to cart")
    }

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [desc, setDesc] = useState("");
    const [noOfPages, setNoOfPages] = useState("");
    const [category, setCategory] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [stock, setStock] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [mrp, setMrp] = useState("");

    return (
        <>
            {title.length > 0 &&
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-3 text-center">
                            <img src={imageURL} alt={title} width={220} className='rounded m-2 shadow' />
                        </div>
                        <div className="col-6">
                            <p className="display-4 fw-bold mb-1">{title}</p>
                            <p className='text-secondary fw-normal fs-3 mb-2'>by {author}</p>
                            <p className='fs-6 mb-2'><strong>About the book: </strong>{desc}</p>
                            <p className='fs-6 mb-2'><strong>No of Pages: </strong>{noOfPages}</p>
                            <p className='fs-6 mb-2'><strong>Category: </strong>{category}</p>
                            {stock == 0 ? <div className='fw-bold text-danger'>Currently Not Available</div>
                                :
                                <div className='fw-bold text-danger'>Hurry only {stock} piece(s) left</div>}
                        </div>
                        <div className="col-3">
                            {stock > 0 &&
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className='fw-bold'>
                                            <td className='text-end text-danger'>Selling Price:</td>
                                            <td className='text-danger'>₹ {sellingPrice}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-end'>MRP:</td>
                                            <td className='text-decoration-line-through'>₹ {mrp}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-end'>Save:</td>
                                            <td>₹ {mrp - sellingPrice} ({calcDiscount()}%)</td>
                                        </tr>
                                    </tbody>
                                </table>}
                            {stock > 0 && <div className='d-grid'>
                                <button className='btn btn-success' onClick={handleAddToCart}>Add to Cart</button></div>}
                        </div>
                    </div>
                </div>}

        </>
    )
}

export default BookDetails
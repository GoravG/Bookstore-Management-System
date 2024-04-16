import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditBookForm() {
    const handleSearch = () => {
        getBookDetails();
    }
    const getBookDetails = () => {
        const baseURL = process.env.REACT_APP_API_URL;
        const token = sessionStorage.getItem("token");
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/book/' + bookId,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                const res = response.data;
                setISBN(res.isbn);
                setTitle(res.title);
                setAuthor(res.author);
                setDescription(res.description);
                setNoOfPages(res.noOfPages);
                setCoverImage(res.coverImage);
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
                setImgURL(imageUrl);
            })
            .catch((error) => {
                setId();
                setISBN("");
                setTitle("");
                setAuthor("");
                setDescription("");
                setNoOfPages("");
                setCoverImage("");

            });
    }
    const updateBookDetails = async () => {
        const baseURL = process.env.REACT_APP_API_URL;
        const token = sessionStorage.getItem("token");
        const data = new FormData();
        const headers = new Headers();
        data.append('id', bookId);
        data.append('isbn', isbn);
        data.append('title', title);
        data.append('author', author);
        data.append('description', description);
        data.append('noOfPages', noOfPages);
        data.append('coverImage', uploadedCoverImage);
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/book/edit',
            headers: {
                'Authorization': 'Bearer ' + token,
                headers
            },

            data: data
        };

        await axios.request(config)
            .then((response) => {
                toast.success(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleSubmitAction = (e) => {
        e.preventDefault();
        updateBookDetails();
    }
    const handleCoverImageUpload = (e) => {
        const imageAsFile = e.target.files[0];
        setUploadedCoverImage(e.target.files[0]);
    }
    const [imgURL, setImgURL] = useState("");
    const [isbn, setISBN] = useState("");
    const [bookId, setBookId] = useState("");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [uploadedCoverImage, setUploadedCoverImage] = useState(null);
    const [coverImage, setCoverImage] = useState("");
    const [noOfPages, setNoOfPages] = useState();

    return (
        <>
            <div className="container  w-50">
                <div className="container text-center mt-2  ">
                    <h2 className='mb-3 fw-bolder'>Update Book Details</h2>
                    <form className="d-flex">
                        <input className="form-control me-2 mb-2" type="text" placeholder="Enter Book ID:" required value={bookId} onChange={(e) => setBookId(e.target.value)} />
                        <button className="btn btn-outline-success mb-2" type="button" onClick={handleSearch}>Search</button>
                    </form>
                </div>
                {(title.length == 0) &&
                    <div className="container text-center mt-2  text-danger">
                        <h3>{id}</h3>
                        <h5>Looks this Book Does Not Exist Search 🔍 for Another Book</h5>
                    </div>}
                {(title.length != 0) &&
                    (
                        <>
                            <div className="container border rounded shadow">
                                <div className='row'>
                                    <div className="col-4">
                                        <img src={imgURL} className="card-img-top mt-3 rounded shadow" alt="..." width={150} />
                                        <div className="mb-3">
                                            <label for="coverImage" className="form-label">Choose Cover Image</label>
                                            <input className="form-control" type="file" id="coverImage" onChange={(e) => handleCoverImageUpload(e)} />
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control mt-3" id="bookId" placeholder="BookID" value={bookId} disabled />
                                            <label for="isbn">BookID</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control mt-2" id="isbn" placeholder="ISBN" value={isbn} onChange={(e) => setISBN(e.target.value)} />
                                            <label for="isbn">ISBN</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            <label for="title">Title</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="author" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                                            <label for="author">Author</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <textarea type="text" class="form-control" id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ height: 100 }} />
                                            <label for="description">Description</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="number" class="form-control" id="noOfPages" placeholder="NoOfPages" value={noOfPages} onChange={(e) => setNoOfPages(e.target.value)} />
                                            <label for="noOfPages">No Of Pages</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-grid gap-2 mb-3">
                                    <button class="btn btn-success" type="button" onClick={handleSubmitAction}>Update Book Details</button>
                                </div>
                            </div>

                        </>
                    )}
            </div >
        </>
    )
}

export default EditBookForm
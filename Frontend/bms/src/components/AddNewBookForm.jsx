import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';


function AddNewBookForm() {
    const [isbn, setIsbn] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [desc, setDesc] = useState("");
    const [noOfPages, setNoOfPages] = useState();
    const [coverImage, setCoverImage] = useState();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [catId, setCatId] = useState("");
    const baseURL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = async () => {
        setLoading(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'commons/categories',
            headers: {}
        };

        await axios.request(config)
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Unable to load categories");
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ISBN:" + isbn);
        console.log("TITLE:" + title);
        console.log("AUTHOR:" + author);
        console.log("DESC:" + desc);
        console.log("NOOFPAGES:" + noOfPages);
        console.log("COVER:" + coverImage);
        console.log("CATID:" + catId);
        await uploadFormData();
        clearInputs();

    }
    const clearInputs = () => {
    }
    const uploadFormData = async (e) => {
        const myHeaders = new Headers();
        const token = sessionStorage.getItem("token");
        const formdata = new FormData();
        formdata.append('isbn', isbn);
        formdata.append('title', title);
        formdata.append('author', author);
        formdata.append('description', desc);
        formdata.append('noOfPages', noOfPages);
        formdata.append('categoryId', catId);
        formdata.append('coverImage', coverImage);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/add_book',
            headers: {
                'Authorization': 'Bearer ' + token,
                myHeaders,
            },
            data: formdata
        };

        axios.request(config)
            .then((response) => {
                toast.success(response.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    }
    const handleCoverImageUpload = (e) => {
        const imageAsFile = e.target.files[0];
        setCoverImage(e.target.files[0]);
    }
    const handleTextBoxChange = (e) => {
        console.log(e.target.value);
        setCatId(e.target.value)
    }
    return (
        (loading ? <><div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div></> : <div className="container container-fluid mt-1">
            <div className="container">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col-8">
                        <div className="container  p-3">
                            <form action="submit" encType="multipart/form-data">
                                <div className="mb-3">
                                    <div className="text-center mt-2 fw-bolder">
                                        <h1>Add New Book</h1>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="isbn" placeholder="Enter isbn" onChange={(e) => setIsbn(e.target.value)} value={isbn} required />
                                                <label htmlFor="isbn">ISBN</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="title" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} value={title} required />
                                                <label htmlFor="title">Title</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="author" placeholder="Enter author" onChange={(e) => setAuthor(e.target.value)} value={author} required />
                                            <label htmlFor="author">Author</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-2">
                                            <input type="number" className="form-control" id="noOfPages" placeholder="Enter No Of Pages" onChange={(e) => setNoOfPages(e.target.value)} value={noOfPages} required min={0} />
                                            <label htmlFor="noOfPages">No of Pages</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mb-2">
                                    <textarea type="text" className="form-control" id="desc" placeholder="Enter desc" onChange={(e) => setDesc(e.target.value)} value={desc} required style={{ height: 150 }} />
                                    <label htmlFor="desc">Description</label>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="coverImage" className="form-label">Choose Cover Image</label>
                                    <input className="form-control" type="file" id="coverImage" onChange={(e) => handleCoverImageUpload(e)} />
                                </div>
                                <div className="form-floating">
                                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => handleTextBoxChange(e)}>
                                        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                    </select>
                                    <label htmlFor="floatingSelect">Select a Category</label>
                                </div>
                                <div className="mb-3">
                                    <div className="d-grid gap-2 text-center">
                                        <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div >
        </div >)
    )
}

export default AddNewBookForm
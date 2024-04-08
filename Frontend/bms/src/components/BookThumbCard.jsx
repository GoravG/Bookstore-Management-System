import React, { useState } from 'react'
import axios from 'axios'

function BookThumbCard({ isbn, ms, me }) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [author, setAuthor] = useState("");

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,
        headers: {}
    };


    axios.request(config)
        .then((response) => {
            setLoading(true);
            const data = response.data;
            setTitle(data.items[0].volumeInfo.title);
            setAuthor(data.items[0].volumeInfo.authors[0]);
            setImgURL(data.items[0].volumeInfo.imageLinks.thumbnail)
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
    return (
        (loading == true ? (<div className={"card ms-" + ms + " me-" + me + " h-100 shadow"}>
            <img src={imgURL} class="card-img-top" alt="..." width={150} />
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{author}</p>
            </div>
        </div >) : (<div className={"card ms-" + ms + " me-" + me + " h-100 shadow"}>
            <div class="card-body">
                <h5 class="card-title placeholder-glow"><span className={"placeholder col-12"}></span></h5>
                <p class="card-text placeholder-glow"><span class="placeholder col-4"></span></p>
            </div>
        </div >))
    )
}

export default BookThumbCard
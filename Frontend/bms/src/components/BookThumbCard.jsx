import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function BookThumbCard({ ttl, ms, me }) {
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [author, setAuthor] = useState("");
    const baseURL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();


    const getCardData = () => {
        setLoading(true);
        let data = JSON.stringify({
            "title": ttl
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'commons/get_by_title',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setLoading(false);
                setAuthor(response.data[0].author)
                setTitle(response.data[0].title)
                setId(response.data[0].bookId);
                const coverImg = response.data[0].coverImage;
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
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(true);
            });
    }
    useEffect(() => {
        getCardData();

    }, [])
    const handleClick = () => {
        console.log(id);
        navigate("/book/" + id);
    }
    return (
        (loading == false ? (
            <div className={"card ms-" + ms + " me-" + me + " h-100 shadow"} onClick={handleClick} >
                <img src={imgURL} className="card-img-top" alt="..." width={150} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{author}</p>
                </div>
            </div >) : (
            <div className={"card ms-" + ms + " me-" + me + " h-100 shadow"} >
                <div className="card-body">
                    <h5 className="card-title placeholder-glow"><span className={"placeholder col-12"}></span></h5>
                    <p className="card-text placeholder-glow"><span className="placeholder col-4"></span></p>
                </div>
            </div >
        ))
    )
}

export default BookThumbCard
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function BookThumbCard({ ttl, ms, me }) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [author, setAuthor] = useState("");
    const baseURL = process.env.REACT_APP_API_URL;


    const getCardData = async () => {
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

        await axios.request(config)
            .then((response) => {
                console.log("API Call")
                setLoading(false);
                setAuthor(response.data[0].author)
                setTitle(response.data[0].title)
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
    return (
        (loading == false ? (<div className={"card ms-" + ms + " me-" + me + " h-100 shadow"}>
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
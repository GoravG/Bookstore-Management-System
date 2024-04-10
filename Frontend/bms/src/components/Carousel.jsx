import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Carousel() {
    const [img, setImg] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const [loading, setLoading] = useState(false);

    const fetchImage = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://source.unsplash.com/random/1920x720/?book,bhagwadgita", { responseType: 'blob' });
            const imageBlob = response.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
            const response2 = await axios.get("https://source.unsplash.com/random/1920x720/?book,mahabharat", { responseType: 'blob' });
            const imageBlob2 = response2.data;
            const imageObjectURL2 = URL.createObjectURL(imageBlob2);
            setImg2(imageObjectURL2);
            const response3 = await axios.get("https://source.unsplash.com/random/1920x720/?book,ramayan", { responseType: 'blob' });
            const imageBlob3 = response3.data;
            const imageObjectURL3 = URL.createObjectURL(imageBlob3);
            setImg3(imageObjectURL3);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching image:", error);
        }
    };

    useEffect(() => {
        fetchImage();
    }, []);
    return (
        loading != true ? (<div className='container-fluid mt-2 rounded-5 mb-2'>
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img3} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>) :
            (<div className="d-flex justify-content-center mt-2">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>)
    )
}

export default Carousel
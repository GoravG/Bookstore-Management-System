import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

function InfoCard({ title, variable, url, unit }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const baseURL = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("token");

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + url + variable,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    async function getData() {
        setLoading(true);
        try {
            const response = await axios.request(config);
            setData(response.data);
            setLoading(false);
        }
        catch (error) {
            setLoading(true);
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        (loading == true ? <div className="card text-bg-light h-100">
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                </p>
            </div>
        </div> :
            <div className="card bg-light h-100">
                <div className="card-body">
                    < h5 className="card-title text-center" > {title}</h5 >
                    <p className="card-text text-center">{unit} {data}</p>
                </div >
            </div >)
    )
}

export default InfoCard
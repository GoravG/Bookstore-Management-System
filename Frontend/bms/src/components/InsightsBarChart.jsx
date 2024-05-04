import { BarChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function InsightsBarChart({ title, url }) {
    const [days, setDays] = useState("7");
    const [data, setData] = useState([]);
    const baseURL = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("token");

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + url + days,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    async function getData() {
        try {
            const response = await axios.request(config);
            console.log(response.data);
            setData(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [days])
    return (
        (
            <div class="card bg-light h-100">
                <div class="card-body">
                    <h5 className='cart-title'>Last {days} Days {title}</h5>
                    <BarChart xAxis={[
                        {
                            id: 'barCategories',
                            data: data.map((item) => new Date(item.date).toLocaleDateString('en-IN')),
                            scaleType: 'band',
                        },
                    ]}
                        series={[
                            {
                                data: data.map((item) => item.value),
                            },
                        ]}
                        height={300}
                    />
                    <div className='text-center'>
                        <button className='btn btn-info btn-sm m-1' onClick={() => setDays(3)}>Last 3 Day Data</button>
                        <button className='btn btn-info btn-sm m-1' onClick={() => setDays(5)}>Last 5 Day Data</button>
                        <button className='btn btn-info btn-sm m-1' onClick={() => setDays(7)}>Last 7 Day Data</button>
                    </div>
                </div >
            </div >)
    )
}

export default InsightsBarChart
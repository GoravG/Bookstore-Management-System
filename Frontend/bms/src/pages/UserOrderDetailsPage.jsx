import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderDetailsTable from '../components/OrderDetailsTable';

function UserOrderDetailsPage() {
    const { orderNumber } = useParams();
    const [orderDetails, setOrderDetails] = useState();
    const getOrderDetails = () => {
        const baseURL = window._env_.API_URL;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'user/order/' + orderNumber,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        };

        async function makeRequest() {
            try {
                const response = await axios.request(config);
                setOrderDetails(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }

        makeRequest();
    }
    useEffect(() => {
        getOrderDetails();
    }, [])
    return (
        <>
            <Navbar />
            {orderDetails ?
                <OrderDetailsTable o={orderDetails} /> : <LoadingSpinner />}
        </>
    )
}

export default UserOrderDetailsPage
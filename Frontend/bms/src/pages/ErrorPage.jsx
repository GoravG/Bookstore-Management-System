import { useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    const [countDown, setCountDown] = useState(30);
    const decrementCount = () => {
        setCountDown(countDown - 1);
    }
    setTimeout(decrementCount, 1000);
    return (
        <>
            <Navbar></Navbar>
            <div id="error-page" className="container">
                <h1 className="text-center mt-5 fw-bolder">Oops!</h1>
                <h3 className="text-center">Sorry, an unexpected error has occurred. 😭</h3>
                <h4 className="text-center fw-bold">
                    <h5 className="text-center m-2">Error: {error.statusText || error.message}</h5>
                    <h6 className="m-2"><Link to="/">Click Here To Go To Home</Link></h6>
                    <h5>You will be redirected to home in {countDown} seconds</h5>
                    {countDown == 0 ? <Navigate to="/" /> : <></>}
                </h4>
            </div>
        </>
    );
}
import { useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <Navbar></Navbar>
            <div id="error-page" className="container">
                <h1 className="text-center mt-5 fw-bolder">Oops!</h1>
                <p className="text-center">Sorry, an unexpected error has occurred. 😭</p>
                <p className="text-center fw-bold">
                    <i className="text-center">{error.statusText || error.message}</i>
                    <h6 className="mt-3"><Link to="/">Click Here To Go To Home</Link></h6>
                </p>
            </div>
        </>
    );
}
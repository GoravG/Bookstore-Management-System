import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function UserRegistrationForm() {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkPasswords() != true) {
            setFormErrors("Uh-oh! Passwords don't match. Let's sync them up for a smooth sail ahead. Thanks!");
            return;
        }
        else
            setFormErrors("");
        if (formErrors.length == 0 && inputHasValues()) {
            await registerUser();
            clearInputs("");
        }
        return
    }
    const inputHasValues = () => {
        if (firstName.length == 0)
            return false;
        else if (lastName.length == 0)
            return false;
        else if (dob.length == 0)
            return false;
        else if (phoneNo.length == 0)
            return false;
        else if (password.length == 0)
            return false;
        else if (confirmPassword.length == 0)
            return false;
        else
            return true;
    }
    const checkPasswords = () => {
        if (confirmPassword != password)
            return false;
        else
            return true;
    }
    const handleDobChange = (e) => {
        setFormErrors("");

        const birth = new Date(e.target.value);
        const now = new Date();
        if (birth > now)
            setFormErrors("Oops! Looks like you're trying to time travel. Enter your real birthdate to join. Thanks!");
        else {
            var ageInMiliseconds = Math.abs(birth.getTime() - now.getTime());
            const age = new Date();
            age.setTime(ageInMiliseconds);
            const ageYears = age.getFullYear() - 1970;
            if (ageYears < 18)
                setFormErrors("Hey! You've gotta be 18 or older to sign up. Thanks!");
        }
        setDob(e.target.value);
    }
    const clearInputs = () => {
        setFirstName("");
        setLastName("");
        setDob("");
        setPhoneNo("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setFormErrors("");
    }
    const registerUser = async () => {
        let data = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "phoneNo": phoneNo,
            "email": email,
            "date": dob,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'user/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                toast.success("User registration successsful");
                navigate("/user/login");
            })
            .catch((error) => {
                toast.error("Something went wrong");
            });
    };
    return (
        <>
            <div className="container container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div className="container  p-3">
                                <form action="submit">
                                    <div className="text-center mt- fw-bolder"><h1>Register</h1></div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name" autoFocus onChange={(e) => setFirstName(e.target.value)} value={firstName} required />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="lastName" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)} value={lastName} required />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="date" className="form-control" id="dob" placeholder="Enter date of birth" onChange={handleDobChange} value={dob} required />
                                        <label htmlFor="lastName">Date of Birth</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="phoneNo" placeholder="Enter Phone No" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} required />
                                        <label htmlFor="phoneNo">Phone No</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="email" className="form-control" id="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="password" className="form-control" id="pass" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                                        <label htmlFor="pass">Password</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                    </div>
                                    {formErrors.length >= 0 ? (<div className="text-danger fw-bold text-center">{formErrors}</div>) : <></>}
                                    <div className="mb-2">
                                        <div className="d-grid gap-2 text-center">
                                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                            <h6 className='mt-2'>Already Have An Account? <Link to="/user/login">Login Here</Link></h6>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div >
            </div >
            <Footer></Footer>
        </>
    )
}

export default UserRegistrationForm
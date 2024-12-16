import { useState, useContext, useEffect } from "react";
import "../../App.css";
import "./Profile.css";
import { MyContext, Popup } from "../../App";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { RiSortNumberAsc, RiSortNumberDesc } from "react-icons/ri";
import axios from "axios";

const Profile = () => {
    const { isAuth, setIsAuth } = useContext(MyContext);
    const navigate = new useNavigate();
    if (!isAuth) navigate("/"); // If not authenticated send back to home.

    // Function to redirect to location
    const redirect = (location) => {
        navigate(location);
    }

    // User Details State
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        apiKey: '',
        passwordPolicy: {
            minLength: '',
            maxLength: '',
            requireUpperCase: false,
            requireLowerCase: false,
            requireDigits: false,
            requireSpecialCharacters: false
        }
    });

    // To get user Details on initial load
    const getUserDetail = async () => {
        try {
            const response = await axios.get("http://localhost:8084/auth/user", {
                withCredentials: true
            })
            // Object is returned as response
            setUserDetails(response.data);
        } catch (e) { // Forbidden - Jwt token has expired
            document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";// Delete the cookie
            setIsAuth(false); // Make auth as false
            navigate("/"); // Redirect to home
            console.log(e)
        }
    }
    useEffect(() => { //  When the component is mounted get the details
        getUserDetail()
    }, [])

    useEffect(() => { // To ensure it is up-to-date
        console.log(userDetails);
    }, [userDetails])

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    // Function to handle field value changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.split('.')[0] === 'passwordPolicy') {
            if (name.indexOf('Length') === -1) { // upper-case, lower-case, digit, special-characters
                setUserDetails(prevState => ({ ...prevState, passwordPolicy: { ...prevState.passwordPolicy, [name.split('.')[1]]: checked } }));

            } else { // min-length, max-length
                setUserDetails(prevState => ({ ...prevState, passwordPolicy: { ...prevState.passwordPolicy, [name.split('.')[1]]: parseInt(value) } }));
            }
        }
        document.getElementById('updateButton').className = 'btn';
        document.getElementById('updateButton').disabled = false;
    };

    // Function to handle update details
    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        if (userDetails.passwordPolicy.minLength > userDetails.passwordPolicy.maxLength) {
            Popup("Min Length should be greater than Max Length..");
            setUserDetails({ ...userDetails, passwordPolicy: { ...userDetails.passwordPolicy, minLength: '', maxLength: '' } })
        } else {
            const response = await axios.put("http://localhost:8084/auth/user", JSON.stringify(userDetails.passwordPolicy), {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            Popup(response.data);
            document.getElementById('updateButton').className = 'disabled';
            document.getElementById('updateButton').disabled = true;
        }
    }

    // Function to handle logout
    const logout = async () => {
        // const token = document.cookie.substring(4, document.cookie.length);
        const response = await axios.post("http://localhost:8084/auth/logout", {}, {
            withCredentials: true
        })
        if (response.data === 'Logout Successful!!..') {
            document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";// Delete the cookie
            setIsAuth(false);
            Popup(response.data);
            navigate("/");
        } else {
            Popup(response.data);
        }
    }

    return (
        <div id="profile-container">
            <div id="profile-card-content">
                <div id="section-ApiKey">
                    <div className="copyBox" id="apiUrl">
                        <div className="copy">
                            URL
                            <button onClick={() => copyToClipboard('http://localhost:8084/userPasswordCheck/api')}>
                                Copy Url <FaCopy />
                            </button>
                        </div>
                        <p id="url">http://localhost:8084/passwordCheck/api</p>
                    </div>
                    <div className="copyBox" id="apiKey">
                        <div className="copy">
                            Apikey
                            <button onClick={() => copyToClipboard(userDetails.apiKey)}>
                                Copy key <FaCopy />
                            </button>
                        </div>
                        <p id="key">{userDetails.apiKey}</p>
                    </div>
                    <div id="apiButtons">
                        <button className="btn" onClick={() => redirect("/testApi")}>Test Api</button>
                        <button className="btn" id="logout-btn" onClick={logout}>Log out</button>
                    </div>
                </div>
                <div id="section-policy">
                    {/* <div id="profile-card"></div> */}
                    <form id="form" onSubmit={handleUpdateDetails} className="box">
                        <div id="companyName">
                            <input type="text" value={userDetails.name} id="name" placeholder="Name"
                                onClick={() => Popup('Not editable..')}
                                readOnly
                            />
                        </div>
                        <div id="companyMail">
                            <input type="text" value={userDetails.email} id="email" placeholder="Email"
                                onClick={() => Popup('Not editable..')}
                                readOnly
                            />
                        </div>
                        <div id="length">
                            <div id="minLength">
                                <RiSortNumberAsc style={{ fontSize: "larger", marginRight: ".5rem" }} />
                                <input
                                    id="minLength" name="passwordPolicy.minLength"
                                    type="number" value={userDetails.passwordPolicy.minLength}
                                    placeholder="Min Length"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div id="maxLength">
                                <RiSortNumberDesc style={{ fontSize: "larger", marginRight: ".5rem" }} />
                                <input
                                    id="maxLength" name="passwordPolicy.maxLength"
                                    type="number" value={userDetails.passwordPolicy.maxLength}
                                    placeholder="Max Length"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div id="case">
                            <div id="upperCase">
                                <label htmlFor="passwordPolicy.requireUpperCase">Upper Case</label>
                                <input type="checkbox" name="passwordPolicy.requireUpperCase" id="requireUpperCase"
                                    checked={userDetails.passwordPolicy.requireUpperCase}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div id="lowerCase">
                                <label htmlFor="passwordPolicy.requireLowerCase">Lower Case</label>
                                <input type="checkbox" name="passwordPolicy.requireLowerCase" id="requireLowerCase"
                                    checked={userDetails.passwordPolicy.requireLowerCase}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>

                            <div id="digits">
                                <label htmlFor="passwordPolicy.requireDigits">Digits</label>
                                <input type="checkbox" name="passwordPolicy.requireDigits" id="requireDigits"
                                    checked={userDetails.passwordPolicy.requireDigits}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div id="specialChars">
                                <label htmlFor="passwordPolicy.requireSpecialCharacters">Special Characters </label>
                                <input type="checkbox" name="passwordPolicy.requireSpecialCharacters" id="requireSpecialCharacters"
                                    checked={userDetails.passwordPolicy.requireSpecialCharacters}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div id="policyButtons">
                            <button className="btn" onClick={() => redirect("/resetPassword")}>Reset Password</button>
                            <button id="updateButton" className="disabled" type="submit" disabled>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Profile;
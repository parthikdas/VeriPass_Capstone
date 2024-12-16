import { useContext, useState, useEffect } from "react";
import "../../App.css";
import "../Profile/Profile.css";
import { MyContext, Popup } from "../../App";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import axios from "axios";

const ApiTest = () => {
    const { isAuth, setIsAuth } = useContext(MyContext);
    const navigate = useNavigate();
    if (!isAuth) navigate("/");
    const [password, setPassword] = useState("");
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
                // headers: {
                //     'Authorization': 'Bearer ' + document.cookie.substring(4, document.cookie.length)
                // },
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

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    //Function to handle api submit 
    const handleApiTest = async (e) => {
        e.preventDefault();
        console.log(typeof password)
        const response = await axios.post("http://localhost:8084/userPasswordCheck/api", JSON.stringify({
            apiKey: userDetails.apiKey,
            password: password
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        Popup(response.data ? "Passed.." : "Not Passed..");
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
                        <p id="url">http://localhost:8084/userPasswordCheck/api</p>
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
                </div>
                <div id="section-policy">
                    <form onSubmit={handleApiTest} className="box">
                        <ul> {/* List containing the cirteria for password */}
                            <li className={password.length >= userDetails.passwordPolicy.minLength ? "true" : "false"}>
                                Minimum Characters : {userDetails.passwordPolicy.minLength}
                            </li>
                            <li className={password.length <= userDetails.passwordPolicy.maxLength ? "true" : "false"}>
                                Maximum Characters : {userDetails.passwordPolicy.maxLength}
                            </li>
                            {
                                userDetails.passwordPolicy.requireLowerCase ?
                                    (<li className={/[a-z]/.test(password) ? "true" : "false"}>Lower Case Required</li>) : ""
                            }
                            {
                                userDetails.passwordPolicy.requireUpperCase ?
                                    (<li className={/[A-Z]/.test(password) ? "true" : "false"}>Upper Case Required</li>) : ""
                            }
                            {
                                userDetails.passwordPolicy.requireDigits ?
                                    (<li className={/\d/.test(password) ? "true" : "false"}>Digit Required</li>) : ""
                            }
                            {
                                userDetails.passwordPolicy.requireSpecialCharacters ?
                                    (<li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "true" : "false"}>Special Character Required</li>) : ""
                            }
                        </ul>
                        <div id="passwordText" className="">
                            <input type="text" id="password" value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    e.target.className = "";
                                }}
                                placeholder="Test Password" />
                        </div>
                        <button type="submit" className="btn">Check</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ApiTest;
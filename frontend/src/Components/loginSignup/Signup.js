import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { RiSortNumberAsc, RiSortNumberDesc } from "react-icons/ri";
import { Popup } from "../../App";
import axios from "axios";
import "./loginSignup.css";
import "../../App.css";
const Signup = () => {
    const navigate = new useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [registerReq, setRegisterReq] = useState({
        name: "",
        email: "",
        password: "",
        passwordPolicy: {
            minLength: 0,
            maxLength: 2,
            requireUpperCase: true,
            requireLowerCase: false,
            requireDigits: false,
            requireSpecialCharacters: false
        }
    })
    const alreadyUser = () => {
        // navigate to login
        navigate("/login")
    }

    // Function to handle password strength
    const passwordStrength = (password) => {
        if (!(/a-z/.test(password))) return false; // Checking for lower case
        if (!(/A-Z/).test(password)) return false; // Checking for upper case
        if (!(/0-9/).test(password)) return false; // Checking for digits
    }

    // Function to handle new registration
    const handleRegister = async (e) => {
        e.preventDefault();
        if (passwordStrength(registerReq.password)) {
            // Edge case to check if min password is more than max password or vice versa
            if (registerReq.passwordPolicy.minLength > registerReq.passwordPolicy.maxLength) {
                Popup("Min Length should be greater than Max Length..");
                setRegisterReq({ ...registerReq, passwordPolicy: { ...registerReq.passwordPolicy, minLength: '', maxLength: '' } })
            } else {
                const response = await axios.post("http://localhost:8084/auth/register", JSON.stringify(registerReq), {
                    headers: {
                        "Content-Type": "application/json", // Specify JSON request body
                    }
                })
                if (response.data === "Company already registered!!") {
                    Popup(response.data);
                    setRegisterReq({ ...registerReq, email: "" });
                } else {
                    // check if success login then show login or else give response accordingly
                    Popup("Register Successful!!\nLogin to access..");
                    navigate("/login");
                }
            }
        } else {
            Popup("Lower Case is Required<br>Upper Case is Required<br>Digits are Required");
        }
    }
    return (
        <div id="container">
            <div id="card-content">
                <form onSubmit={handleRegister} className="box signup">
                    <div id="name">
                        <FaUserTie />
                        <input id="nameField"
                            type="text" placeholder="Name"
                            value={registerReq.name}
                            onChange={(e) => setRegisterReq({ ...registerReq, name: e.target.value })}
                        />
                    </div>
                    <div id="email">
                        <MdEmail />
                        <input
                            id="emailField"
                            type="email" placeholder="Email"
                            value={registerReq.email}
                            onChange={(e) => setRegisterReq({ ...registerReq, email: e.target.value })}
                        />
                    </div>
                    <div id="password">
                        {showPassword ? <FaLockOpen /> : <FaLock />}
                        <input
                            id="passwordField"
                            type={showPassword ? "text" : "password"} placeholder="Password"
                            onFocus={() => Popup("Lower Case is Required<br>Upper Case is Required<br>Digits are Required")}
                            value={registerReq.password}
                            onChange={(e) => setRegisterReq({ ...registerReq, password: e.target.value })}
                        />
                        {showPassword ? <FaEye onClick={() => { setShowPassword(false) }} /> : <FaEyeSlash onClick={() => { setShowPassword(true) }} />}
                    </div>
                    <div id="length">
                        <div id="minLength">
                            <RiSortNumberAsc style={{ fontSize: "larger" }} />
                            <input
                                id="minLengthField" name="minLengthField"
                                type="number"
                                placeholder="Min Length"
                                value={registerReq.passwordPolicy.minLength}
                                onChange={(e) => setRegisterReq({ ...registerReq, passwordPolicy: { ...registerReq.passwordPolicy, minLength: parseInt(e.target.value) } })}
                            />
                        </div>
                        <div id="maxLength">
                            <RiSortNumberDesc style={{ fontSize: "larger" }} />
                            <input
                                id="maxLengthField" name="maxLengthField"
                                type="number"
                                placeholder="Max Length"
                                value={registerReq.passwordPolicy.maxLength}
                                onChange={(e) => setRegisterReq({ ...registerReq, passwordPolicy: { ...registerReq.passwordPolicy, maxLength: parseInt(e.target.value) } })}
                            />
                        </div>
                    </div>
                    <div id="case">
                        <div id="upperCase">
                            <label htmlFor="upperCaseField">Upper Case</label>
                            <input type="checkbox" name="upperCaseField" id="upperCaseField"
                                onChange={(e) => setRegisterReq({ ...registerReq, passwordPolicy: { ...registerReq.passwordPolicy, requireUpperCase: e.target.checked } })}
                            />
                        </div>
                        <div id="lowerCase">
                            <label htmlFor="lowerCaseField">Lower Case</label>
                            <input type="checkbox" name="lowerCaseField" id="lowerCaseField"
                                onChange={(e) => setRegisterReq({ ...registerReq, passwordPolicy: { ...registerReq.passwordPolicy, requireLowerCase: e.target.checked } })}
                            />
                        </div>

                        <div id="digits">
                            <label htmlFor="digitsField">Digits</label>
                            <input type="checkbox" name="digitsField" id="digitsField"
                                onChange={(e) => setRegisterReq({ ...registerReq, passwordPolicy: { ...registerReq.passwordPolicy, requireDigits: e.target.checked } })}
                            />
                        </div>
                        <div id="specialChars">
                            <label htmlFor="specialCharsField">Special Characters </label>
                            <input type="checkbox" name="specialCharsField" id="specialCharsField"
                                onChange={(e) => setRegisterReq({ ...registerReq, passwordPolicy: { ...registerReq.passwordPolicy, requireSpecialCharacters: e.target.checked } })}
                            />
                        </div>
                    </div>
                    <div onClick={alreadyUser} className="redirect">Already a user?</div>
                    <button id="submit" type="submit" className="btn">Register</button>
                </form>
            </div>
        </div>
    );
};
export default Signup;
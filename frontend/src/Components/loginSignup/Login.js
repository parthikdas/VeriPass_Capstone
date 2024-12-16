import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "../../App.css";
import "./loginSignup.css";
import axios from "axios";
import { MyContext, Popup } from "../../App";
const Login = () => {
    const { setIsAuth } = useContext(MyContext);
    const navigate = new useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    // Function to redirect users
    const redirect = (location) => {
        navigate("/" + location);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.get("http://localhost:8084/auth/login", {
            params: {
                email: email,
                password: password,
            },
            withCredentials: true
        });
        if (response.data === "Invalid username or password") {
            Popup(response.data);
            setEmail("");
            setPassword("");
        } else {
            setIsAuth(true);
            // const currentDate = new Date();
            // const expirationDate = new Date(currentDate.getTime + 60 * 60 * 1000); // 60 min
            // const expires = expirationDate.toUTCString();
            // document.cookie = `jwt=${response.data}; expires=${expires}; path=/;`;
            Popup(response.data);
            navigate("/");
            console.log(document.cookie)
        }
    };

    // Function to check if the string is a email id or not
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to send otp
    const sendOTP = async () => {
        if (isValidEmail(email)) {
            // Send otp
            const response = await axios.post(`http://localhost:8084/otp/generate-otp?email=${email}`);
            console.log(response.request)
            if (response.status === 200) {
                Popup(response.data);
                setShowOtpField(true);
            }
        } else {
            Popup("Enter valid email");
        }
    }

    // OTP Verification 
    const [otp, setOtp] = useState(Array(6).fill(""))
    useEffect(() => {
        if (otp[5] !== "") {
            verifyOtp(otp.join(""));
        }
    }, [otp])
    const verifyOtp = async (otp) => {
        const response = await axios.post(`http://localhost:8084/otp/verify-otp?email=${email}&otp=${otp}`);
        if (response.data === "OTP verified") {
            document.getElementsByTagName('form')[0].removeChild(document.getElementById('otp-container'));
            document.getElementById("submit").className = 'btn'; // Make the Submit button visible
        }
        Popup(response.data);
    }
    const handleOtpChange = async (digit, index) => {
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);
        if (digit !== '' && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    }
    const handleBackspace = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            if (index > 0) document.getElementById(`otp-${index - 1}`).focus(); // Move focus to the previous box
        }
    };
    return (
        <div id="container">
            <div id="card-content">
                <form onSubmit={handleLogin} className="box">
                    <div id="email">
                        <MdEmail />
                        <input
                            id="emailField"
                            type="email" placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setShowOtpField(false);
                            }}
                        />
                    </div>
                    <div id="password">
                        <FaLock />
                        <input
                            id="passwordField"
                            type={showPassword ? "text" : "password"} placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? <FaEye onClick={() => { setShowPassword(false) }} /> : <FaEyeSlash onClick={() => { setShowPassword(true) }} />}
                    </div>
                    <div id="otp-container">
                        {
                            showOtpField ?
                                otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, index)}
                                        onKeyDown={(e) => handleBackspace(e, index)}
                                        className="otp-box"
                                    />
                                ))
                                : (<div className={email === "" ? "disabled" : "btn"} onClick={sendOTP}>Get OTP</div>)
                        }
                    </div>
                    <div id="options">
                        <div onClick={() => redirect("signup")} className="redirect">New user?</div>
                        <div onClick={() => redirect("forgotPassword")} className="redirect">Forgot Password?</div>
                    </div>
                    <button id="submit" type="submit" className="disabled">Login</button>
                </form>
            </div>
        </div>
    );
};
export default Login;
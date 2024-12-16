import { useContext, useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import "../../App.css";
import "./loginSignup.css";
import { MyContext, Popup } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgotPassword = () => {
    const { setIsAuth } = useContext(MyContext);
    const navigate = new useNavigate();
    const [email, setEmail] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));

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
            Popup("Enter a valid email");
        }
    }
    useEffect(() => {
        if (otp[5] !== "") {
            verifyOtp(otp.join(""));
        }
    }, [otp])
    const verifyOtp = async (otp) => {
        const response = await axios.post(`http://localhost:8084/otp/forgot-password?email=${email}&otp=${otp}`);
        if (response.data === "Email not found!!") {
            Popup(response.data);
            navigate("/signup");
        } else if (response.data === "Invalid or expired OTP") {
            Popup(response.data);
        } else { // Verified
            setIsAuth(true);
            const currentDate = new Date();
            const expirationDate = new Date(currentDate.getTime + 60 * 60 * 1000); // 60 min
            const expires = expirationDate.toUTCString();
            document.cookie = `jwt=${response.data}; expires=${expires}; path=/;`;
            Popup("Change your password");
            navigate("/resetPassword"); // Make it to update password page
        }
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
                <div id="forgotPasswordBox" className="box">
                    <div id="email">
                        <MdEmail />
                        <input
                            id="emailField"
                            type="email" placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                                :
                                (<div className={email === "" ? "disabled" : "btn"} onClick={sendOTP}>Get OTP</div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ForgotPassword;
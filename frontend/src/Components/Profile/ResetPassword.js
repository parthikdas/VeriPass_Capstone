import { useContext, useState } from "react";
import "../../App.css";
import "./Profile.css";
import { MyContext, Popup } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const { isAuth } = useContext(MyContext);
    const navigate = useNavigate();
    if (!isAuth) navigate("/");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Function to reset Password
    const resetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Popup("Passwords are not same");
            setConfirmPassword("");
        } else {
            const response = await axios.post("http://localhost:8084/auth/resetPassword", JSON.stringify({ password: password }), {
                headers: {
                    // 'Authorization': 'Bearer ' + document.cookie.substring(4, document.cookie.length),
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            Popup(response.data);
            navigate("/profile");
        }
    }
    return (
        <div id="profile-container">
            <div id="profile-card-content">
                <form onSubmit={resetPassword} className="box">
                    <div id="companyPassword">
                        <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} name="" id="" />
                        <input type="text" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} name="" id="" />
                    </div>
                    <button id="resetButton" className="btn" type="submit">Reset</button>
                </form>
            </div>
        </div>
    );
};
export default ResetPassword;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function verify() {
    const [userOtp, setUserOtp]= useState("");
    const [error, setError]= useState("");
    const location= useLocation();
    const navigate = useNavigate();
    const { otp }= location.state || {};

    const handleChange = (e)=>{
        setUserOtp(e.target.value);
        setError("")
    };

    const handleSubmit= (e) =>{
        e.preventDefault();
        if(userOtp === otp){
            navigate("/success");
        }else{
            setError("Invalid OTP. Please try again.");
        }
    };

  return (
    <div>
        <h3>verify OTP</h3>
        <from onSubmit={handleSubmit}>
            <div>
                <label>Enter OTP</label>
                <input type="text" value={userOtp} onChange={handleChange}/>
            </div>
            {error && <p style={{color:"red"}}>{error}</p>}
            <button type="submit">Verify</button>
        </from>
    </div>
  );
};

export default verify;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const login = () => {

    const [formData, setFormData] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const preSetEmail = "devrup3105@gmail.com"
    const preSetPassword= "abcd";

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };

      const sendOtp = async (email, otp) => {
        const serviceID = "service_bteh8u7";
        const templateID = "template_vkvle4o";
        const userID = "Vh4IPJtZJHWfQM4Tb";
    
        const templateParams = {
          to_email: email,
          from_name: "Arup",
          otp: `Your OTP is: ${otp}`,
        };

        try {
            emailjs.send(serviceID, templateID, templateParams,userID).then(
                (response) => {
                  console.log('SUCCESS!', response.status, response.text);
                },
                (error) => {
                  console.log('FAILED...', error);
                },
              );
          } catch (error) {
            console.error("Failed to send OTP", error);
          }
        };


    const handleChange = (e) =>{
        const {name, value}= e.target;
        setFormData({
            ...formData,
            [name]:value,
        });
        setError("")
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const {email,password}= formData;

        if(email !== preSetEmail){
            setError("Email Dose not Exist!!!");
        }else if(password !== preSetPassword){
            setError("Password is wrong!!!");
        }else{
            setError("")
            const generatedOtp = generateOtp();
            setOtp(generatedOtp);
            await sendOtp(email, generatedOtp);
            navigate("/verify", { state: { otp: generatedOtp } });
        }
    };

    return(
        <>
        <div>
            <h3>Login Page</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} autoComplete="email"/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="password"/>
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    )
};

export default login;
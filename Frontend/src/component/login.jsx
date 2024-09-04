import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiForLogin from "@/api/apiForLogin";

const login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email) {
      setError("Email Address cannot be empty");
    } else if (password.length < 8) {
      setError("Password must contain at least 8 characters");
    } else {
      setError("");
      try {
        const response= await ApiForLogin.login(email, password);

        if (response.ok) {
            navigate("/verify");
        } else {
            setError(response.message);
        }
      } catch (err) {
        setError("Failed to connect to the server. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h3>Login Page</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="password"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");

      navigate("/dashboard"); // ✅ redirect to first protected route
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Restaurant Owner Login</h2>
      <form className="mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>


<div className="text-center mt-3">
  Don't have an account? <Link to="/register">Register here</Link>
</div>

      </form>
    </div>
  );
};

export default Login;

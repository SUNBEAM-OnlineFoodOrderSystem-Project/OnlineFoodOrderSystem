import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Change URL based on your Spring Boot endpoint
      const res = await axios.post("http://localhost:8081/api/auth/register", {
        ...formData,
        roleId: 3, //  restaurant owner
      });

      toast.success("Registration successful. Please login.");
      navigate("/"); // redirect to login
    } catch (err) {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Restaurant Owner Registration</h2>
      <form className="mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
        <div className="text-center mt-3">
          Already have an account? <a href="/">Login here</a>
        </div>
      </form>
    </div>
  );
};

export default Register;

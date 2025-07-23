import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, loading, error } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(form);
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  return (
    <div className="container is-flex is-justify-content-center is-align-items-center" style={{ minHeight: "80vh" }}>
      <div className="box" style={{ minWidth: 350 }}>
        <h2 className="title is-4 has-text-centered">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
            </div>
          </div>
          {error && <p className="has-text-danger has-text-centered">{error}</p>}
          {success && <p className="has-text-success has-text-centered">Registration successful! Redirecting...</p>}
          <div className="field">
            <button className={`button is-primary is-fullwidth${loading ? " is-loading" : ""}`} type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 
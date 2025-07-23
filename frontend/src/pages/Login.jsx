import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading, error } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form);
    if (success) navigate("/");
  };

  return (
    <div className="container is-flex is-justify-content-center is-align-items-center" style={{ minHeight: "80vh" }}>
      <div className="box" style={{ minWidth: 350 }}>
        <h2 className="title is-4 has-text-centered">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="field">
            <button className={`button is-primary is-fullwidth${loading ? " is-loading" : ""}`} type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 
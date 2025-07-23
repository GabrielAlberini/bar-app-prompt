import React, { useEffect, useState, useContext } from "react";
import QRCode from "react-qr-code";
import { getMyRestaurant, createRestaurant, updateMyRestaurant } from "../api/restaurant";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    business_name: "",
    slug: "",
    logo_url: "",
    location: "",
    contact: "",
    qr_url: "",
    status: "active"
  });
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await getMyRestaurant(token);
        setRestaurant(data);
        setForm({
          business_name: data.business_name || "",
          slug: data.slug || "",
          logo_url: data.logo_url || "",
          location: data.location || "",
          contact: data.contact || "",
          qr_url: data.qr_url || "",
          status: data.status || "active"
        });
      } catch (err) {
        setRestaurant(null);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchRestaurant();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      let data;
      if (restaurant) {
        data = await updateMyRestaurant(form, token);
        setSuccess("Restaurant updated successfully!");
      } else {
        data = await createRestaurant(form, token);
        setSuccess("Restaurant created successfully!");
      }
      setRestaurant(data);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.error || "Error saving restaurant");
    }
  };

  if (loading) return <p>Loading...</p>;

  // Construir la URL pública del restaurante
  const publicUrl = restaurant ? `${window.location.origin}/r/${restaurant.slug}` : "";

  return (
    <div>
      <h2 className="title is-4">Dashboard</h2>
      {error && <p className="has-text-danger">{error}</p>}
      {success && <p className="has-text-success">{success}</p>}
      {restaurant && !editMode ? (
        <div className="box">
          <h3 className="title is-5">{restaurant.business_name}</h3>
          <p><strong>Slug:</strong> {restaurant.slug}</p>
          <p><strong>Location:</strong> {restaurant.location}</p>
          <p><strong>Contact:</strong> {restaurant.contact}</p>
          {restaurant.logo_url && <img src={restaurant.logo_url} alt="Logo" style={{ maxWidth: 120 }} />}
          {/* Mostrar QR generado dinámicamente */}
          {restaurant.slug && (
            <div className="mt-3">
              <strong>QR para vista pública:</strong>
              <br />
              <QRCode value={publicUrl} size={120} />
              <div>
                <Link to={publicUrl} className="is-size-7 mt-2">{publicUrl}</Link>
              </div>
              <p style={{ color: "green" }}>{restaurant.status}</p>
            </div>
          )}
          <button className="button is-link mt-3" onClick={() => setEditMode(true)}>Edit</button>
        </div>
      ) : (
        <form className="box" onSubmit={handleSubmit}>
          <h3 className="title is-5">{restaurant ? "Edit Restaurant" : "Create Restaurant"}</h3>
          <div className="field">
            <label className="label">Business Name</label>
            <div className="control">
              <input className="input" type="text" name="business_name" value={form.business_name} onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <label className="label">Slug</label>
            <div className="control">
              <input className="input" type="text" name="slug" value={form.slug} onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <label className="label">Logo URL</label>
            <div className="control">
              <input className="input" type="text" name="logo_url" value={form.logo_url} onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input className="input" type="text" name="location" value={form.location} onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label className="label">Contact</label>
            <div className="control">
              <input className="input" type="text" name="contact" value={form.contact} onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label className="label">QR URL</label>
            <div className="control">
              <input className="input" type="text" name="qr_url" value={form.qr_url} onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <div className="select">
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field is-grouped is-grouped-right">
            {restaurant && <button type="button" className="button" onClick={() => setEditMode(false)}>Cancel</button>}
            <button className="button is-primary" type="submit">{restaurant ? "Save" : "Create"}</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard; 
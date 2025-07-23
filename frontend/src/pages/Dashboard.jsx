import React, { useEffect, useState, useContext } from "react";
import QRCode from "react-qr-code";
import { getMyRestaurant, createRestaurant, updateMyRestaurant } from "../api/restaurant";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { token, user } = useContext(AuthContext);
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
        setSuccess("¡Restaurante actualizado exitosamente!");
      } else {
        data = await createRestaurant(form, token);
        setSuccess("¡Restaurante creado exitosamente!");
      }
      setRestaurant(data);
      setEditMode(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar el restaurante");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <span className="text-gray-600">Cargando...</span>
        </div>
      </div>
    );
  }

  const publicUrl = restaurant ? `${window.location.origin}/r/${restaurant.slug}` : "";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              ¡Hola, {user?.name}! 👋
            </h1>
            <p className="text-primary-100 text-lg">
              {restaurant ? 'Gestiona tu restaurante' : 'Configura tu primer restaurante'}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-bounce-subtle">
              <span className="text-3xl">🍽️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-slide-up">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-red-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-slide-up">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-green-400 text-xl">✅</span>
            </div>
            <div className="ml-3">
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Display */}
      {restaurant && !editMode ? (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Restaurant Info */}
          <div className="card space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Mi Restaurante</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                restaurant.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {restaurant.status === 'active' ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {restaurant.logo_url && (
                  <img 
                    src={restaurant.logo_url} 
                    alt="Logo" 
                    className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {restaurant.business_name}
                  </h3>
                  <p className="text-gray-500">@{restaurant.slug}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📍</span>
                  <span className="text-gray-700">{restaurant.location || 'No especificado'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📞</span>
                  <span className="text-gray-700">{restaurant.contact || 'No especificado'}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setEditMode(true)}
              className="btn-primary w-full"
            >
              ✏️ Editar Información
            </button>
          </div>

          {/* QR Code */}
          <div className="card text-center space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Código QR</h3>
            <p className="text-gray-600">
              Comparte este código para que tus clientes accedan a tu menú
            </p>
            
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-xl shadow-sm border-2 border-gray-100">
                <QRCode value={publicUrl} size={160} />
              </div>
            </div>
            
            <div className="space-y-3">
              <Link 
                to={publicUrl} 
                target="_blank"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <span>🔗</span>
                <span>Ver página pública</span>
              </Link>
              <p className="text-xs text-gray-500 break-all">
                {publicUrl}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Restaurant Form */
        <div className="card max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {restaurant ? 'Editar Restaurante' : 'Crear Restaurante'}
            </h2>
            <p className="text-gray-600">
              {restaurant ? 'Actualiza la información de tu restaurante' : 'Configura tu restaurante para comenzar'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Negocio *
                </label>
                <input
                  type="text"
                  name="business_name"
                  value={form.business_name}
                  onChange={handleChange}
                  placeholder="Ej: Restaurante El Buen Sabor"
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL única) *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="ej: mi-restaurante"
                  className="input-field"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del Logo
              </label>
              <input
                type="url"
                name="logo_url"
                value={form.logo_url}
                onChange={handleChange}
                placeholder="https://ejemplo.com/logo.png"
                className="input-field"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Ej: Av. Principal 123, Ciudad"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contacto
                </label>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Ej: +54 11 1234-5678"
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL del QR (opcional)
                </label>
                <input
                  type="url"
                  name="qr_url"
                  value={form.qr_url}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/qr.png"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              {restaurant && (
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                {restaurant ? '💾 Guardar Cambios' : '🚀 Crear Restaurante'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
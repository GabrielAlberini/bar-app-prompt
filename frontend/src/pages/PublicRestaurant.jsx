import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicRestaurant } from "../api/restaurant";

const PublicRestaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { slug } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await getPublicRestaurant(slug);
        setRestaurant(res);
      } catch (err) {
        setError("Restaurante no encontrado");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchRestaurant();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando restaurante...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            {restaurant.logo_url && (
              <img 
                src={restaurant.logo_url} 
                alt="Logo" 
                className="w-16 h-16 rounded-xl object-cover shadow-md"
              />
            )}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {restaurant.business_name}
              </h1>
              <p className="text-gray-500">@{restaurant.slug}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Restaurant Info */}
          <div className="card space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Información del Restaurante
              </h2>
              <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🍽️</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {restaurant.location && (
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600">📍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Ubicación</h3>
                    <p className="text-gray-600">{restaurant.location}</p>
                  </div>
                </div>
              )}
              
              {restaurant.contact && (
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600">📞</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Contacto</h3>
                    <p className="text-gray-600">{restaurant.contact}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">✅</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Estado</h3>
                  <p className="text-green-600 font-medium">
                    {restaurant.status === 'active' ? 'Abierto' : 'Cerrado'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nuestro Menú
              </h2>
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📋</span>
              </div>
            </div>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚧</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Menú en construcción
              </h3>
              <p className="text-gray-500">
                Pronto podrás ver nuestras deliciosas opciones aquí
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="card max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Bienvenido a {restaurant.business_name}!
              </h3>
              <p className="text-gray-600 mb-6">
                Estamos emocionados de tenerte aquí. Pronto tendremos más funcionalidades disponibles.
              </p>
              {restaurant.contact && (
                <a 
                  href={`tel:${restaurant.contact}`}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>Llamar ahora</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicRestaurant;
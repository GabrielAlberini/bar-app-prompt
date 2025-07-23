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
        setError("Restaurant not found");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchRestaurant();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="has-text-danger">{error}</p>;

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <div className="box mt-6">
        <h2 className="title is-3 has-text-centered">{restaurant.business_name}</h2>
        {restaurant.logo_url && <div className="has-text-centered mb-4"><img src={restaurant.logo_url} alt="Logo" style={{ maxWidth: 120 }} /></div>}
        <p><strong>Location:</strong> {restaurant.location}</p>
        <p><strong>Contact:</strong> {restaurant.contact}</p>
        {/* Aquí podrías mostrar el menú, categorías y productos si lo deseas */}
      </div>
    </div>
  );
};

export default PublicRestaurant; 
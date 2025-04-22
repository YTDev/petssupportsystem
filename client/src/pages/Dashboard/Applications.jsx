import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AdoptionContext } from "../../context/AdoptionContext";
import AdoptionCard from "../../components/common/AdoptionCard";

const AdoptionSummary = () => {
  const { user } = useAuth();
  const { adoptions, userAdoptions } = useContext(AdoptionContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdoptions = async () => {
    setLoading(true);
    setError(null);
    try {
      await userAdoptions(); // fetch and update context state
    } catch (err) {
      setError("Failed to load adoption data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdoptions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      {adoptions.length === 0 ? (
        <p>No adoptions found.</p>
      ) : (
        adoptions.map((adopt, index) => (
          <AdoptionCard key={index} adoption={adopt} />
        ))
      )}
    </div>
  );
};

export default AdoptionSummary;

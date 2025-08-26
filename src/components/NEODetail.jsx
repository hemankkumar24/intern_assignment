import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NEODetail = () => {
  const { id } = useParams();
  const [neoData, setNeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNEODetails = async () => {
        const API_KEY = import.meta.env.VITE_NASA_API_KEY;
      try {
        const res = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setNeoData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNEODetails();
  }, [id]);

  if (loading) return <p className="text-center text-white mt-8">Loading NEO details...</p>;
  if (!neoData) return <p className="text-center text-red-500 mt-8">Error loading data</p>;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-start py-10 px-4 md:px-8 bg-[url('/images/bg_image_blur.png')] ">
    <div className='pt-20'>
      <div className="bg-white/10 text-white shadow-xl rounded-xl max-w-3xl w-full p-6">
        <h1 className="font-bold mb-4 text-3xl" id="heading">DETAILS FOR {neoData.name}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>ID:</strong> {neoData.id}</p>
          <p><strong>Designation:</strong> {neoData.designation}</p>
          <p><strong>Hazardous:</strong> {neoData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
          <p>
            <strong>NASA JPL URL:</strong>{' '}
            <a href={neoData.nasa_jpl_url} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              View on JPL
            </a>
          </p>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Close Approach Data:</h2>
        <ul className="list-disc list-inside text-sm text-white">
          {neoData.close_approach_data?.map((approach, index) => (
            <li key={index}>
              <strong>Date:</strong> {approach.close_approach_date} — <strong>Speed:</strong>{' '}
              {parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(2)} km/h —{' '}
              <strong>Orbiting:</strong> {approach.orbiting_body}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Orbital Data:</h2>
        <ul className="list-disc list-inside text-sm text-white">
          <li><strong>Orbit ID:</strong> {neoData.orbital_data?.orbit_id}</li>
          <li><strong>Determination Date:</strong> {neoData.orbital_data?.orbit_determination_date}</li>
          <li><strong>First Observation:</strong> {neoData.orbital_data?.first_observation_date}</li>
          <li><strong>Inclination:</strong> {neoData.orbital_data?.inclination}°</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default NEODetail;

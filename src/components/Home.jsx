import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";


const Home = () => {
  const [neoData, setNeoData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedNeos, setSelectedNeos] = useState([]);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [showOnlyHazardous, setShowOnlyHazardous] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  
  const navigate = useNavigate();

  const handleCompare = () => {
    navigate('/compare', { state: { selectedNeos } });
  };

  // use state for start and end date so as to add load more functionality
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const end = new Date();
    end.setDate(end.getDate() + 7); // Initial +7 days
    return end.toISOString().split("T")[0];
  });

    // make function to fetch NEO Data 
    const fetchNEOData = async (start, end) => {
    // loading api key
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    const url = "https://api.nasa.gov/neo/rest/v1/feed";
    // calling api
    try {
      const response = await axios.get(url, {
        params: {
          start_date: start,
          end_date: end,
          api_key: API_KEY,
        },
      });
      // data returned
    const data = response.data;
    const objects = data.near_earth_objects;
    setNeoData(prev => ({
        ...prev,
        ...objects
      }));
    setLoading(false);
    setLoadMoreLoading(false);

    } catch (error) {
      console.error("Error fetching NEO data:", error);
      throw error;
    }
  };

  // calling the function
  useEffect(() => {
  fetchNEOData(startDate, endDate);
  }, [])

  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    const newStart = new Date(endDate);
    newStart.setDate(newStart.getDate() + 1);
    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 2);

    const formattedStart = newStart.toISOString().split("T")[0];
    const formattedEnd = newEnd.toISOString().split("T")[0];
    setEndDate(formattedEnd);
    fetchNEOData(formattedStart, formattedEnd);
  };

  const handleSelectNeo = (neo) => {
    setSelectedNeos((prev) => {
      const isSelected = prev.find((item) => item.id === neo.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== neo.id);
      } else {
        return [...prev, neo];
      }
    });
  };


  return (
    <div className="min-h-screen w-full bg-[url('/images/bg_image_blur.png')] bg-cover bg-center text-white">
      <div className='pt-20'>
      <div className='mx-5 lg:mx-30 px-5 pt-5 bg-white/5 h-full'>
      <div className='flex flex-col lg:flex-row flex-start lg:justify-between items-center'>
      <div className='text-5xl text-white' id="heading">Cosmic Event Tracker</div>
      <div className='text-3xl text-black bg-white px-3 py-2 rounded-md hover:bg-black hover:text-white transition-all cursor-pointer' id="heading" 
      onClick={handleCompare}>COMPARE</div>
      </div>
      <div className="bg-white/10 border border-white rounded-xl shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-6">

      <button
      onClick={() => setShowOnlyHazardous(!showOnlyHazardous)}
      className={`px-4 py-2 rounded font-medium transition-colors duration-300 cursor-pointer ${
        showOnlyHazardous ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
      }`}
    >
      Only Hazardous
    </button>



      <div className="flex items-center gap-3">
        <span className="text-gray-200 font-medium">Sort by:</span>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-zinc-700 text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Approach Date: Ascending</option>
          <option value="desc">Approach Date: Descending</option>
        </select>
        </div>
      </div>


      {loading ? (
         <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      ) : (Object.entries(neoData).map(([date, neos]) => (
      <div key={date}>
        <h2 className='text-2xl font-bold mt-5 mb-2 text-white'>{date}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
          [...neos]
          .filter(neo => !showOnlyHazardous || neo.is_potentially_hazardous_asteroid)
          .sort((a, b) => {
            const dateA = new Date(a.close_approach_data[0]?.close_approach_date_full || "");
            const dateB = new Date(b.close_approach_data[0]?.close_approach_date_full || "");
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          })
          .map((neo) => {
            const diameter = ( (neo.estimated_diameter.kilometers.estimated_diameter_min + neo.estimated_diameter.kilometers.estimated_diameter_max) / 2 ).toFixed(3);
            const hazard = neo.is_potentially_hazardous_asteroid;

            return (
              <div key={neo.id} className="border rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                <div className='flex justify-between items-center'>
                <div className="text-xl font-semibold">
                  <Link to={`/neo/${neo.id}`}>
                    <div className="cursor-pointer hover:underline">
                      {neo.name}
                    </div>
                  </Link>
                </div>
                <input type="checkbox" className="mr-2" 
                checked={selectedNeos.some(item => item.id === neo.id)} 
                onChange={() => handleSelectNeo(neo)}/>
                </div>
                <div className="mt-2"> Hazardous:{" "} 
                  <span className={hazard ? "text-red-500" : "text-green-400"}> {hazard ? "Yes 🔴" : "No ✅"} </span> 
                  <div>Avg. Diameter: {diameter} km</div>
                  <div> Closest Approach:{" "} {neo.close_approach_data[0]?.close_approach_date_full || "N/A"} </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      ))
        
      )}

      <div className='flex justify-center'>
        {loadMoreLoading ? (
          <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
        )
        :(
        <div className='px-4 py-2 text-white bg-green-500 hover:bg-green-400 cursor-pointer w-35 my-5 rounded-md text-center' onClick={handleLoadMore}>Load More</div>
      )}
      </div>
      
      </div>
      </div>
    </div>
  ) 
}

export default Home
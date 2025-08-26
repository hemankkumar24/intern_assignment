import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const Compare = () => {
  const location = useLocation();
  const { selectedNeos } = location.state;

  const chartData = selectedNeos.map((neo) => ({
    name: neo.name,
    diameter: (
      (neo.estimated_diameter.kilometers.estimated_diameter_min +
        neo.estimated_diameter.kilometers.estimated_diameter_max) / 2
    ).toFixed(3),
    distance: parseFloat(neo.close_approach_data[0]?.miss_distance?.kilometers || 0),
    velocity: parseFloat(neo.close_approach_data[0]?.relative_velocity?.kilometers_per_hour || 0)
  }));

  return (
    <div className="p-4 md:p-6 text-white min-h-screen bg-[url('/images/bg_image_blur.png')] bg-cover bg-center">
      <div className='pt-20'>
      <div className='rounded pt-5 bg-white/5 h-full'>
        <h1 className="text-2xl md:text-4xl font-bold mb-6 px-4" id="heading">Asteroid Comparison</h1>

        <div className="flex flex-col lg:flex-row gap-10 mb-12 px-4">
          <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Diameter & Miss Distance</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="diameter" stroke="#82ca9d" name="Diameter (km)" />
                <Line type="monotone" dataKey="distance" stroke="#8884d8" name="Distance (km)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Velocity Comparison</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="velocity" stroke="#ff7300" name="Velocity (km/h)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto px-4">
          <table className="min-w-full table-auto border-collapse border border-zinc-700 text-sm md:text-base">
            <thead>
              <tr className="bg-zinc-900">
                <th className="border border-zinc-700 px-2 md:px-4 py-2">Name</th>
                <th className="border border-zinc-700 px-2 md:px-4 py-2">Diameter (km)</th>
                <th className="border border-zinc-700 px-2 md:px-4 py-2">Miss Distance (km)</th>
                <th className="border border-zinc-700 px-2 md:px-4 py-2">Velocity (km/h)</th>
                <th className="border border-zinc-700 px-2 md:px-4 py-2">Hazardous</th>
              </tr>
            </thead>
            <tbody>
              {selectedNeos.map((neo, index) => {
                const diameter = (
                  (neo.estimated_diameter.kilometers.estimated_diameter_min +
                    neo.estimated_diameter.kilometers.estimated_diameter_max) / 2
                ).toFixed(3);
                const distance = parseFloat(neo.close_approach_data[0]?.miss_distance?.kilometers || 0).toFixed(2);
                const velocity = parseFloat(neo.close_approach_data[0]?.relative_velocity?.kilometers_per_hour || 0).toFixed(2);
                const isHazardous = neo.is_potentially_hazardous_asteroid;

                return (
                  <tr key={index} className="text-center hover:bg-zinc-800 transition">
                    <td className="border border-zinc-700 px-2 md:px-4 py-2">{neo.name}</td>
                    <td className="border border-zinc-700 px-2 md:px-4 py-2">{diameter}</td>
                    <td className="border border-zinc-700 px-2 md:px-4 py-2">{distance}</td>
                    <td className="border border-zinc-700 px-2 md:px-4 py-2">{velocity}</td>
                    <td className={`border border-zinc-700 px-2 md:px-4 py-2 font-semibold ${isHazardous ? "text-red-500" : "text-green-400"}`}>
                      {isHazardous ? "Yes 🔴" : "No ✅"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Compare;

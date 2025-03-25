import React, { useState, useEffect } from 'react';
import { getConfig } from '../services/api';
import { Config } from '../types'; // Assuming this is your type definition file
import Container from '../components/Container';

// Assuming Config type is defined in types.ts
// If not, you can define it here:
// interface Config {
//   drone_id: number;
//   drone_name: string;
//   light: string;
//   country: string;
//   weight: number;
// }

const ViewConfig: React.FC = () => {
  const [config, setConfig] = useState<Config>({
    drone_id: 0,
    drone_name: '',
    light: '',
    country: '',
    weight: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        const data = await getConfig();
        setConfig(data);
        console.log("fetch data", data);
      } catch (error) {
        console.error("Error fetching config:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  return (
    <Container>
      <div className="py-8 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Drone Configuration
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
          <span className="ml-4 text-gray-600">Loading configs...</span>
        </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-gray-600 font-medium">Drone ID:</span>
                <span className="text-gray-800 font-semibold">{config.drone_id}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-gray-600 font-medium">Drone Name:</span>
                <span className="text-gray-800 font-semibold">{config.drone_name}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-gray-600 font-medium">Light Status:</span>
                <span className={`font-semibold ${
                  config.light.toLowerCase() === 'on' 
                    ? 'text-green-600' 
                    : config.light.toLowerCase() === 'off' 
                    ? 'text-red-600' 
                    : 'text-gray-800'
                }`}>
                  {config.light}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-gray-600 font-medium">Country:</span>
                <span className="text-gray-800 font-semibold">{config.country}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Weight:</span>
                <span className="text-gray-800 font-semibold">{config.weight} kg</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ViewConfig;
import { useState, useEffect, FormEvent } from "react";
import { getConfig, postLog } from "../services/api";
import { Config, LogPayload, LogResponse} from "../types";
import Container from "../components/Container";

// Assuming this is the updated type based on the API response


const TempForm: React.FC = () => {
  const [celsius, setCelsius] = useState<string>("");
  const [config, setConfig] = useState<Config>({
    drone_id: 0,
    drone_name: "",
    light: "",
    country: "",
    weight: 0,
  });
  const [isConfigLoading, setIsConfigLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setIsConfigLoading(true);
        const data = await getConfig();
        setConfig(data);
        console.log("Config loaded:", data);
      } catch (error) {
        console.error("Error fetching config:", error);
        alert("Failed to load configuration. Please try again.");
      } finally {
        setIsConfigLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!celsius || isNaN(parseFloat(celsius))) {
      alert("Please enter a valid temperature in Celsius");
      return;
    }
  
    const logData: LogPayload = {
      drone_id: config.drone_id,
      drone_name: config.drone_name,
      country: config.country,
      celsius: parseFloat(celsius),
    };
  
    try {
      setIsSubmitting(true);
      const response: LogResponse = await postLog(logData); // Ensure response is of type LogResponse
      console.log("Log submitted successfully:", response);
      setCelsius("");
      alert(`Log submitted successfully! Created at: ${response.created}`);
    } catch (error) {
      console.error("Error submitting log:", error);
      alert("Failed to submit log. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <Container>
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Temperature Log Form
        </h1>
        {isConfigLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
            <span className="ml-4 text-gray-600">Loading configuration...</span>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="celsius"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Temperature (Celsius)
                </label>
                <input
                  type="number"
                  id="celsius"
                  value={celsius}
                  onChange={(e) => setCelsius(e.target.value)}
                  placeholder="Enter temperature in °C"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Data"
                  )}
                </button>
              </div>
            </form>
            <div className="mt-6 text-gray-600 text-sm">
              <p>Drone ID: {config.drone_id || "N/A"}</p>
              <p>Drone Name: {config.drone_name || "N/A"}</p>
              <p>Country: {config.country || "N/A"}</p>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default TempForm;
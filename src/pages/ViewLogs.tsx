import { useState, useEffect } from 'react';
import { Log } from '../types';
import Container from '../components/Container';
import {getLogs } from '../services/api';
const ViewLogs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const logsPerPage = 25; // 25 logs per page

  // Mock data: 100 logs
  // const mockLogs: Log[] = Array.from({ length: 100 }, (_, index) => ({
  //   created: new Date(Date.now() - index * 3600000).toISOString(), // 1 hour apart
  //   country: ["Pakistan", "Thailand", "Japan", "USA", "Germany"][index % 5],
  //   drone_id: droneId,
  //   drone_name: `Drone ${Math.floor(Math.random() * 100)}`,
  //   celsius: Math.floor(Math.random() * 20) + 30, // Random temp between 30-49°C
  // }));

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const response: Log[] = await getLogs(); // Await the API call
        console.log("response",response)
        const sortedLogs = response.sort((a: Log, b: Log) => 
          new Date(b.created).getTime() - new Date(a.created).getTime()
        );
        setLogs(sortedLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);
  

  // Calculate pagination
  const totalPages = Math.ceil(logs.length / logsPerPage);
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  // Pagination handlers
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <Container>
      <div className="w-full">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">View Logs</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
            <span className="ml-4 text-gray-600">Loading logs...</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Created</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Country</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Drone ID</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Drone Name</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Celsius</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLogs.map((log, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{log.created}</td>
                      <td className="py-3 px-4 text-gray-700">{log.country}</td>
                      <td className="py-3 px-4 text-gray-700">{log.drone_id}</td>
                      <td className="py-3 px-4 text-gray-700">{log.drone_name}</td>
                      <td className="py-3 px-4 text-gray-700">{log.celsius}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
              >
                Previous
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
            <div className="text-center mt-2 text-gray-600">
              Page {currentPage} of {totalPages} (Showing {currentLogs.length} of {logs.length} logs)
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default ViewLogs;
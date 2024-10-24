"use client";  // Ensures this component is client-side rendered

import { useState, useEffect } from "react";

export default function HomePage() {
  const [data, setData] = useState(null);  // State to hold the fetched data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://data.brreg.no/enhetsregisteret/api/enheter");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();  // Parse the response to JSON
        setData(result);  // Save the data into state
      } catch (err) {
        setError(err.message);  // Store error message
      } finally {
        setLoading(false);  // Stop loading once the data is fetched
      }
    };

    fetchData();  // Call the fetch function
  }, []);  // Empty dependency array means this effect runs once when component mounts

  return (
    <main>
      <h1 className="text-2xl font-bold">Company Data</h1>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error handling */}
      {error && <p>Error: {error}</p>}

      {/* Render the fetched data */}
      {data && (
        <div>
          <h2 className="text-xl">Fetched Data:</h2>
          <pre>{data.navn}</pre>  {/* Displaying the raw data */}
        </div>
      )}
    </main>
  );
}

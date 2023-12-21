import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSession } from './IsLoggedIn';

const PieChartPage = ({ user }) => {
  const { userData } = useSession();
  const [moodData, setMoodData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/mood-statistics/${user}`);
      const data = await response.json();
      setMoodData(data);
    } catch (error) {
      console.error('Error fetching mood data:', error);
    }
  };

  const handleButtonClick = () => {
    if (userData) {
      fetchData();
    } else {
      console.log("No user data");
    }
  };

  // Chart options
  const chartOptions = {
    labels: Object.keys(moodData?.moodCounts || {}),
  };

  // Check if moodData is available and has totalMoods
  const canCreateChart = moodData && moodData.totalMoods;

  return (
    <div className="container mx-auto w-3/4 p-4 flex flex-col items-center mt-10 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Total mood data of {user}</h2>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fetch Data
      </button>
      {canCreateChart && (
        <div className="mt-4 mx-auto">
          <ReactApexChart
            options={chartOptions}
            series={Object.values(moodData.moodCounts).map((mood) => mood.percentage)}
            type="pie"
            width="380"
          />
        </div>
      )}
    </div>
  );
  
};

export default PieChartPage;

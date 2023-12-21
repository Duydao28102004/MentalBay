import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSession } from '../components/IsLoggedIn';

const PieChartPage = () => {
  const { userData } = useSession();
  const [moodData, setMoodData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/mood-statistics/${userData.userId}`);
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
    <div>
      <h2>Pie Chart Example</h2>
      <button onClick={handleButtonClick}>Fetch Data</button>
      {canCreateChart && (
        <ReactApexChart
          options={chartOptions}
          series={Object.values(moodData.moodCounts).map((mood) => mood.percentage)}
          type="pie"
          width="380"
        />
      )}
    </div>
  );
};

export default PieChartPage;

import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import {
  Pie,
  Line,
  Bar
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const Stats = () => {
  const [genreData, setGenreData] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [runtimeData, setRuntimeData] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [genreRes, ratingRes, runtimeRes] = await Promise.all([
        axios.get('/movies/stats/genre-distribution'),
        axios.get('/movies/stats/average-rating'),
        axios.get('/movies/stats/runtime-by-year')
      ]);

      setGenreData(genreRes.data);
      setAvgRating(ratingRes.data.avgRating);
      setRuntimeData(runtimeRes.data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const pieData = {
    labels: genreData?.map((g) => g._id),
    datasets: [
      {
        data: genreData?.map((g) => g.count),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#E7E9ED', '#00A36C', '#B22222', '#FF69B4'
        ]
      }
    ]
  };

  const lineData = {
    labels: runtimeData?.map((r) => r._id),
    datasets: [
      {
        label: 'Avg Runtime (mins)',
        data: runtimeData?.map((r) => r.avgRuntime),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: true
      }
    ]
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Movie Analytics Dashboard</h2>

      {console.log("genreData is: ", genreData)}
      
      {genreData && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">🎬 Genre Distribution</h3>
          <Pie data={pieData} />
        </div>
      )}

      {avgRating && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">⭐ Average IMDb Rating</h3>
          <Bar
            data={{
              labels: ['Average Rating'],
              datasets: [
                {
                  label: 'Rating',
                  data: [avgRating],
                  backgroundColor: ['#FF6384']
                }
              ]
            }}
            options={{ scales: { y: { beginAtZero: true, max: 10 } } }}
          />
        </div>
      )}

      {runtimeData && (
        <div>
          <h3 className="text-xl font-semibold mb-4">⏱️ Avg Runtime by Year</h3>
          <Line data={lineData} />
        </div>
      )}
    </div>
  );
};

export default Stats;

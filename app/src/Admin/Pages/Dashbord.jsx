
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Dummy data
  const dummyGraphData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    data: [500, 700, 1200, 800, 1500, 900],
  };

  // Prepare chart data
  const chartData = {
    labels: dummyGraphData.labels,
    datasets: [
      {
        label: "Monthly Sales",
        data: dummyGraphData.data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales Trends (Dummy Data)" },
    },
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4 h-full">
        {/* Total Sales */}
        <div className="bg-gray-200 p-10 rounded shadow flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">Total Sales</h2>
          <p className="text-2xl font-semibold">500 units</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-gray-200 p-10 rounded shadow flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">Total Revenue</h2>
          <p className="text-2xl font-semibold">$10,000</p>
        </div>

        {/* Total Orders */}
        <div className="bg-gray-200 p-10 rounded shadow flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">Total Orders</h2>
          <p className="text-2xl font-semibold">150 orders</p>
        </div>
      </div>

      {/* Graph Area */}
      <div className="flex-grow bg-gray-300 p-24 rounded shadow flex items-center justify-center">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import axiosInstance from "../../../utilities/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBills, faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueResponse = await axiosInstance.get("/admin/stats/revenue");
        setTotalRevenue(revenueResponse.data.totalRevenue);

        const purchaseResponse = await axiosInstance.get("/admin/stats/purchase");
        setTotalOrders(purchaseResponse.data.totalPurchase);

        const userResponse = await axiosInstance.get("/admin/users");
        const users = userResponse.data?.users || [];
        setUsersCount(users.length);
        const newUsers = users.slice(-4);
        setRecentUsers(newUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Bar chart data to represent the total values for Revenue, Orders, and Users
  const chartData = {
    labels: ['Total'], // Using a single label "Total"
    datasets: [
      {
        label: "Total Revenue",
        data: [totalRevenue], // Use the total revenue value
        backgroundColor: "rgba(234, 88, 12, 0.7)", // bg-amber-700 color
        borderColor: "rgba(234, 88, 12, 1)", // bg-amber-700 border color
        borderWidth: 1,
      },
      {
        label: "Total Orders",
        data: [totalOrders], // Use the total orders value
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Example color for orders
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Users",
        data: [usersCount], // Use the total users value
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Example color for users
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Total Revenue, Orders, and Users" },
    },
    scales: {
      x: {
        // Adjust bar width here
        barPercentage: 0.6, // Reduce bar width by setting it to less than 1
        categoryPercentage: 0.8, // Optionally adjust category space
      },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        <div className="p-10 rounded shadow flex flex-col items-center justify-center border border-black">
          <p><FontAwesomeIcon icon={faMoneyBills} /></p>
          <h2 className="text-lg font-bold">Total Revenue</h2>
          <p className="text-2xl font-semibold">${totalRevenue}</p>
        </div>

        <div className="p-10 rounded shadow flex flex-col items-center justify-center border border-black">
          <p><FontAwesomeIcon icon={faShoppingBag} /></p>
          <h2 className="text-lg font-bold">Total Purchase</h2>
          <p className="text-2xl font-semibold">{totalOrders} products</p>
        </div>

        <div className="p-10 rounded shadow flex flex-col items-center justify-center border border-black">
          <p><FontAwesomeIcon icon={faUser} /></p>
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-2xl font-semibold">{usersCount} Users</p>
        </div>
      </div>

      <div className="flex-grow p-6 rounded shadow flex items-center justify-center lg:h-[530px] h-72 border border-black">
        <Bar data={chartData} options={options} />
      </div>

      <div>
        <h1 className="flex justify-center text-3xl font-serif mb-6 mt-8">New Customers</h1>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">Profile</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-medium text-gray-900">{user._id}</td>
                <td className="py-4 px-6">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </td>
                <td className="py-4 px-6">{user.name || "Unnamed User"}</td>
                <td className="py-4 px-6">{user.email || "No Email"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;






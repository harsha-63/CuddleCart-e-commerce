import { useState, useEffect } from "react";

import axiosInstance from "../../../utilities/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  {faUser}  from "@fortawesome/free-solid-svg-icons";
// import { NavLink } from "react-router-dom";
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
  const [usersCount, setUsersCount] = useState(0)
  const [recentUsers, setRecentUsers] = useState([]);


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const dummyGraphData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    data: [500, 700, 1200, 800, 1500, 900],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/admin/stats/revenue", );
        console.log(response.data);
        
        setTotalRevenue(response.data.totalRevenue);

        const purchaseResponse = await axiosInstance.get("/admin/stats/purchase", );
        setTotalOrders(purchaseResponse.data.totalPurchase);

        const UserResponse = await axiosInstance.get("/admin/users",);
        const users = UserResponse.data?.users || [];
      setUsersCount(users.length);
      const newUsers = users.slice(-4)
      setRecentUsers(newUsers)
         
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="bg-gray-200 p-10 rounded shadow flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">Total Revenue</h2>
          <p className="text-2xl font-semibold">${totalRevenue}</p>
        </div>

        {/* <NavLink to={'/orders'}> */}
          <div className="bg-gray-200 p-10 rounded shadow flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">Total Purchase</h2>
          <p className="text-2xl font-semibold">{totalOrders} orders</p>
        </div>
        <div className="bg-gray-200 p-10 rounded shadow flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-2xl font-semibold">{usersCount} Users</p>
        </div>
  
      {/* </NavLink> */}
      </div>

      <div className="flex-grow bg-gray-300 p-24 rounded shadow flex items-center justify-center h-[530px]">
        <Bar data={chartData} options={options} />
      </div>
      <div>
  <h1 className="text-3xl font-serif mb-4">New Customers</h1>
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



import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { NavLink } from "react-router-dom";
// import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // const dummyGraphData = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   data: [500, 700, 1200, 800, 1500, 900],
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          console.error("No token found in cookies.");
          return;
        }

        const response = await axios.get("http://localhost:3002/admin/stats/revenue", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        
        setTotalRevenue(response.data.totalRevenue);

        const purchaseResponse = await axios.get("http://localhost:3002/admin/stats/purchase", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalOrders(purchaseResponse.data.totalPurchase);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const chartData = {
  //   labels: dummyGraphData.labels,
  //   datasets: [
  //     {
  //       label: "Monthly Sales",
  //       data: dummyGraphData.data,
  //       backgroundColor: "rgba(75, 192, 192, 0.6)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: { position: "top" },
  //     title: { display: true, text: "Sales Trends (Dummy Data)" },
  //   },
  // };

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
  
      {/* </NavLink> */}
      </div>

      {/* <div className="flex-grow bg-gray-300 p-24 rounded shadow flex items-center justify-center">
        <Bar data={chartData} options={options} />
      </div> */}
    </div>
  );
};

export default Dashboard;



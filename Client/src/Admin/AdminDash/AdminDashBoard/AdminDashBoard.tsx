import  { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaShoppingCart, FaClipboardList, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { Server } from "../../../Server";

const AdminDashBoard = () => {
  const [ProductOrders, setProductOrders] = useState([]);
  const [ServiceOrders, setServiceOrders] = useState([]);
  const [charData, setCharData] = useState<FormateData[]>([]);

  type FormateData = {
    name: string;
    productOrders: number;
    serviceOrders: number;
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [productRes, serviceRes] = await Promise.all([
          axios.get(`${Server}/get-product-order`),
          axios.get(`${Server}/get-service-order`),
        ]);
        setProductOrders(productRes.data.orderget);
        setServiceOrders(serviceRes.data.orderget);
        const FormateData = FormateChartData(
          productRes.data.orderget,
          serviceRes.data.orderget
        );
        setCharData(FormateData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const totalOrders = ProductOrders.length + ServiceOrders.length;

  // Sample Data for Graph
  interface Order {
    id: string;
    customer: string;
    status: string;
    amount: number;
    date: Date;
  }



  const FormateChartData = (ProductOrders: Order[], ServiceOrders: Order[]) => {
    const Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const OrderCounts = Months.map((month, index) => {
      const productOrders = ProductOrders.filter(
        (order) => new Date(order.date).getMonth() === index
      ).length;
      const serviceOrders = ServiceOrders.filter(
        (orders) => new Date(orders.date).getMonth() === index
      ).length;
      return { name: month, productOrders, serviceOrders };
    });
    return OrderCounts;
  };

  useEffect(() => {
    if (ProductOrders.length > 0 || ServiceOrders.length > 0) {
      const chartData = FormateChartData(ProductOrders, ServiceOrders);
      console.log(chartData);
    }
  }, [ProductOrders, ServiceOrders]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Dashboard Header */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaClipboardList className="text-teal-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Service Orders</h3>
            <p className="text-gray-600">{ServiceOrders.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaShoppingCart className="text-teal-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Product Orders</h3>
            <p className="text-gray-600">{ProductOrders.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaEnvelope className="text-teal-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Contacts</h3>
            <p className="text-gray-600">30 Messages</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaClipboardList className="text-teal-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Total Orders</h3>
            <p className="text-gray-600">{totalOrders}</p>
          </div>
        </div>
      </div>

      {/* Sales Graph with Two Lines */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={charData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="productOrders"
              stroke="#28906FFF"
              strokeWidth={2}
              name="Product Orders"
            />

            <Line
              type="monotone"
              dataKey="serviceOrders"
              stroke="#101887FF"
              strokeWidth={2}
              name="Service Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">description</th>
     
            </tr>
          </thead>
          <tbody>
            {
              ServiceOrders.map((order:any) => (
                <tr className="border-t">
                 <td className="p-2">{order._id}</td>
                 <td className="p-2">{order.name}</td>
                 <td className="p-2">{order.servicename}</td>
                    </tr>
              ))  
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashBoard;

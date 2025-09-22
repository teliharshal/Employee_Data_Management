import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

const AnalyticsDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // 📊 Employees per Position
  const positionData = Object.values(
    employees.reduce((acc, emp) => {
      acc[emp.position] = acc[emp.position] || { position: emp.position, count: 0 };
      acc[emp.position].count += 1;
      return acc;
    }, {})
  );

  // 🏢 Employees per Department
  const departmentData = Object.values(
    employees.reduce((acc, emp) => {
      acc[emp.department] = acc[emp.department] || { department: emp.department, count: 0 };
      acc[emp.department].count += 1;
      return acc;
    }, {})
  );

  // 💰 Average Salary per Department
  const avgSalaryData = Object.values(
    employees.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { department: emp.department, total: 0, count: 0 };
      }
      acc[emp.department].total += parseFloat(emp.salary);
      acc[emp.department].count += 1;
      return acc;
    }, {})
  ).map((dept) => ({
    department: dept.department,
    avgSalary: (dept.total / dept.count).toFixed(2),
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Analytical Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Employees per Position */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Employees per Position</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={positionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="position" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employees per Department */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Employees per Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                dataKey="count"
                nameKey="department"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {departmentData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Average Salary per Department */}
        <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Average Salary per Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgSalaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgSalary" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

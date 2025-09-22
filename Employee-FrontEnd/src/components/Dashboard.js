import React from "react";
import EmployeeList from "../components/EmployeeList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const role = localStorage.getItem("role"); // read stored role
  const isAdmin = role === "admin";
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h2>
        <ul className="space-y-2">
          {/* <li>Home</li> */}
          <li
          onClick={() => navigate("/dashboard")}
          className = "curser-pointer hover:underline"
          >Employees</li>
          {isAdmin && (
     <li
       onClick={() => navigate("/analytics")}
       className="cursor-pointer hover:underline"
     >
        Analytics
  </li>
)}
{isAdmin && (
          <button
            onClick={() => navigate("/employees/add")}
            className=" text-white cursor-pointer hover:underline"
          >
          Add Employee
          </button>
        )}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <EmployeeList isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default Dashboard;

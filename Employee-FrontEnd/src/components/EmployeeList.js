import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.position.toLowerCase().includes(search.toLowerCase()) ||
      (emp.department && emp.department.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination calculations on filtered data
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>

        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page when searching
          }}
          className="px-4 py-2 border rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

          <button
            onClick={() => navigate("/employees/add")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Add Employee
          </button>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Position</th>
              <th className="border px-4 py-2 text-right">Salary</th>
              <th className="border px-4 py-2 text-left">Department</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length === 0 ? (
              <tr>
                <td className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              currentEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2 text-blue-600 cursor-pointer hover:underline">
  {emp.name}
</td>
                  <td className="border px-4 py-2">{emp.email}</td>
                  <td className="border px-4 py-2">{emp.position}</td>
                  <td className="border px-4 py-2 text-right">${emp.salary}</td>
                  <td className="border px-4 py-2">{emp.department}</td>
                 
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => navigate(`/employees/${emp.id}/edit`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1 ? "bg-indigo-500 text-white" : ""
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

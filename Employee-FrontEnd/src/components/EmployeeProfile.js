import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      navigate("/dashboard"); // Redirect to Employee List after deletion
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  if (!employee) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="mt-8 px-6 max-w-4xl mx-auto">
      <Link
        to="/dashboard"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Employee List
      </Link>

      <div className="bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500">
            {employee.photo ? (
              <img
                src={`http://localhost:5000/uploads/${employee.photo}`}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-bold">
                {employee.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name & Position */}
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-1">
              {employee.name}
            </h2>
            <p className="text-gray-500 mb-1">{employee.position}</p>
            <p className="text-gray-400">
              {employee.department || "Department N/A"}
            </p>
          </div>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-gray-400 font-semibold">Email</h3>
            <p>{employee.email}</p>
          </div>
          <div>
            <h3 className="text-gray-400 font-semibold">Salary</h3>
            <p className="text-green-600 font-semibold">${employee.salary}</p>
          </div>
          {/* <div>
            <h3 className="text-gray-400 font-semibold">Joining Date</h3>
            <p>{employee.joiningDate || "N/A"}</p>
          </div> */}
          <div>
            <h3 className="text-gray-400 font-semibold">Position</h3>
            <p>{employee.position}</p>
          </div>
        </div>

        {/* Actions */}
      {isAdmin && (
            <div className="flex gap-4 mt-4">
              <Link
                to={`/employees/${employee.id}/edit`}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow transition"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
              >
                
                🗑️ Delete
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default EmployeeProfile;

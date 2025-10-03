import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
    department: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8080/api/employees/${id}`,
        employee, // send as JSON
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Updated:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-5 bg-white p-5 shadow-lg rounded">
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Employee</h2>
      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;

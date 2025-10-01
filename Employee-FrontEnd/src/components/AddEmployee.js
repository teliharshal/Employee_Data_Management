import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setEmployee({ ...employee, photo: files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("position", employee.position);
    formData.append("salary", employee.salary);
    formData.append("department", employee.department);
    // if (employee.photo) formData.append("photo", employee.photo);

    try {
      await axios.post("http://localhost:8080/api/employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/"); // go back to dashboard/employee list
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-center mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
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
          value={employee.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {/* <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        /> */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

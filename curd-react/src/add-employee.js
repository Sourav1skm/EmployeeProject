import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./AddEmployee.css";
import { Link } from "react-router-dom";

function AddEmployee() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    dept: "",
    age: "",
  });

  const [toast, setToast] = useState({ show: false, type: "", msg: "" });

  const showToast = (type, msg) => {
    setToast({ show: true, type, msg });
    setTimeout(() => setToast({ show: false, type: "", msg: "" }), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8083/addEmployee",
        formData
      );
      console.log("Success:", response.data);
      showToast("success", "Employee added successfully!");
      setFormData({ id: "", name: "", dept: "", age: "" });
    } catch (error) {
      console.error("Full Error:", error);
      console.error("Response:", error.response);
      showToast(
        "error",
        error.response?.data?.message || "Failed to add employee. Check console."
      );
    }
  };

  return (
    <>
      <div className="nav-buttons">
        <Link to="/">
          <button type="button" className="home-btn">Home</button>
        </Link>
        <Link to="/view-employees">
          <button type="button" className="view-btn">View Employees</button>
        </Link>
      </div>

      {/* Toast notification */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 20px",
            borderRadius: "8px",
            background: toast.type === "success" ? "#0f6e56" : "#993c1d",
            color: "#fff",
            fontWeight: 500,
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {toast.msg}
        </div>
      )}

      <div className="add-container">
        <h1>Add Employee</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ID"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Department"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default AddEmployee;
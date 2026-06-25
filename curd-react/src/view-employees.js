import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ViewEmployees.css";

const DEPT_COLORS = {
  Engineering: { bg: "#eeedfe", color: "#3c3489" },
  Product:     { bg: "#e1f5ee", color: "#0f6e56" },
  Design:      { bg: "#faeeda", color: "#854f0b" },
  Sales:       { bg: "#faece7", color: "#993c1d" },
  HR:          { bg: "#e6f1fb", color: "#185fa5" },
};

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// function getAvatarStyle(name) {
//   const dept = Object.keys(DEPT_COLORS).find((d) =>
//     name.toLowerCase().includes(d.toLowerCase())
//   );
//   const palette = DEPT_COLORS[dept] || { bg: "#eeedfe", color: "#3c3489" };
//   return { background: palette.bg, color: palette.color };
// }

function getDeptStyle(dept) {
  return DEPT_COLORS[dept] || { bg: "#eeedfe", color: "#3c3489" };
}

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: "",
    name: "",
    age: "",
    dept: "",
  });
  const [isFormOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "update", msg: "" });
  const formRef = useRef(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:8083/getEmployees");
      console.log("Fetched employees:", response.data);
      // Handle both array response and wrapped response e.g. { data: [...] }
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];
      setEmployees(data);
    } catch (error) {
      if (error.response) {
        // Server responded with non-2xx status
        console.error("Server error:", error.response.status, error.response.data);
        showToast("delete", `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request made but no response — likely CORS or server not running
        console.error(
          "No response from server. Is Spring Boot running on port 8083? CORS enabled?"
        );
        showToast("delete", "Cannot reach backend — check CORS & server (port 8083)");
      } else {
        console.error("Request setup error:", error.message);
      }
    }
  };

  const showToast = (type, msg) => {
    setToast({ show: true, type, msg });
    setTimeout(() => setToast({ show: false, type, msg: "" }), 2500);
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete("http://localhost:8083/deleteEmployee/" + id);
      showToast("delete", "Employee deleted successfully");
      fetchEmployee();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setFormOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({ ...selectedEmployee, [name]: value });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8083/updateEmployee", selectedEmployee);
      showToast("update", "Employee updated successfully");
      setFormOpen(false);
      fetchEmployee();
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.dept?.toLowerCase().includes(search.toLowerCase())
  );

  const avgAge = employees.length
    ? Math.round(employees.reduce((sum, e) => sum + Number(e.age || 0), 0) / employees.length)
    : 0;

  const deptCount = new Set(employees.map((e) => e.dept)).size;

  return (
    <div className="container">

      {/* Top bar */}
      <div className="topbar">
        <div className="page-heading">
          <h1>Employees</h1>
          <p>Manage and update employee records</p>
        </div>
        <div className="topbar-actions">
          <Link to="/add-employee">
            <button className="add-btn">+ Add employee</button>
          </Link>
          <Link to="/">
            <button className="home-btn">Home</button>
          </Link>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className={`toast show ${toast.type === "delete" ? "toast-delete" : ""}`}>
          {toast.msg}
        </div>
      )}

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="val">{filtered.length}</div>
          <div className="lbl">Total employees</div>
        </div>
        <div className="stat-card">
          <div className="val">{deptCount}</div>
          <div className="lbl">Departments</div>
        </div>
        <div className="stat-card">
          <div className="val">{avgAge}</div>
          <div className="lbl">Avg age</div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-panel">
        <table className="employee-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>ID</th>
              <th>Name</th>
              <th style={{ width: "70px" }}>Age</th>
              <th style={{ width: "130px" }}>Department</th>
              <th style={{ width: "140px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((employee) => {
              const deptStyle = getDeptStyle(employee.dept);
              return (
                <tr key={employee.id}>
                  <td style={{ color: "#9b9b98", fontSize: "12px" }}>
                    #{String(employee.id).padStart(3, "0")}
                  </td>
                  <td>
                    <div className="name-cell">
                      <div
                        className="avatar"
                        style={{ background: deptStyle.bg, color: deptStyle.color }}
                      >
                        {getInitials(employee.name)}
                      </div>
                      {employee.name}
                    </div>
                  </td>
                  <td>{employee.age}</td>
                  <td>
                    <span
                      className="dept-tag"
                      style={{ background: deptStyle.bg, color: deptStyle.color }}
                    >
                      {employee.dept}
                    </span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button
                        className="delete-btn"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="update-btn"
                        onClick={() => handleUpdate(employee)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Update form */}
      {isFormOpen && (
        <div className="update-form" ref={formRef}>
          <div className="form-header">
            <h2>Update employee</h2>
            <button
              className="close-btn"
              onClick={() => setFormOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <form onSubmit={updateEmployee}>
            <div className="form-grid">
              <div className="form-group">
                <label>Employee ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="id"
                  value={selectedEmployee.id}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  className="form-control"
                  type="text"
                  name="age"
                  value={selectedEmployee.age}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Full name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={selectedEmployee.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  className="form-control"
                  type="text"
                  name="dept"
                  value={selectedEmployee.dept}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default ViewEmployees;
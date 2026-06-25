import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">

        {/* Logo mark */}
        <div className="home-logo">
          <svg viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M9 21V7l6-4v18M9 11h6M9 15h6" />
          </svg>
        </div>

        <h1>Employee Management System</h1>

        <p>
          Manage employee records efficiently using React, Spring Boot,
          Hibernate, and MySQL.
        </p>

        <div className="button-group">
          <Link to="/add-employee">
            <button className="home-btn">Add employee</button>
          </Link>

          <Link to="/view-employees">
            <button className="view-btn">View employees</button>
          </Link>
        </div>

        <div className="stack-badges">
          {["React", "Spring Boot", "Hibernate", "MySQL"].map((s) => (
            <span className="badge" key={s}>{s}</span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;
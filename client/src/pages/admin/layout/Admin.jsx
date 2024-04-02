import React from "react";
import { Link } from "react-router-dom";
import "./Admin.scss";
export default function Admin() {
  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    window.location.href = "/login";
  };
  return (
    <>
      <header role="banner">
        <h1 className="text-3xl">Admin </h1>
        <ul className="utilities">
          <li className="logout warn">
            <>
              <Link to="">
                <button onClick={handleLogout}>Log Out</button>
              </Link>
            </>
          </li>
        </ul>
      </header>

      <nav role="navigation">
        <ul className="main">
          <li className="dashboard">
            <Link to="admin">User</Link>
          </li>
          <li className="write">
            <Link to="adminProduct">Product</Link>
          </li>
          <li className="edit">
            <Link to="adminBill">Bills</Link>
          </li>
          <li className="edit">
            <Link to="adminCategory">Category</Link>
          </li>
        </ul>
      </nav>

      <main role="main"></main>
    </>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Dashboard() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {token ? (
        <>
          <div id="wrapper">dashboard</div>
        </>
      ) : (
        <div>Please Login</div>
      )}
    </>
  );
}

export default Dashboard;

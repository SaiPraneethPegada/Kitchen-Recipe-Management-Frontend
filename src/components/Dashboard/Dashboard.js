import React from "react";
import Navbar from "../Navbar";

function Dashboard() {
  const token = sessionStorage.getItem("token");

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

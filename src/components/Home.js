import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { searchContext, url } from "../App";
import Navbar from "./Navbar";
import CardLayout from "./CardLayout";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  const userDetails = JSON.parse(user);
  const userId = userDetails.id;
  const location = useLocation();

  const { searchTerm } = useContext(searchContext);

  const getData = async () => {
    setLoading(true);
    if (location.pathname === "/home") {
      const res = await axios.get(`${url}/users/allRecipes`);
      // console.log(res.data.recipes);
      if (res.data.statusCode === 200) {
        setRecipes(res.data.recipes);
      } else {
        alert("Error in Fetching Data");
      }
    } else if (location.pathname === "/favorites") {
      const res = await axios.get(`${url}/users/favRecipes`, {
        headers: { Authorization: `${token}` },
      });
      // console.log(res);
      if (res.data.statusCode === 200) {
        setRecipes(res.data.fav);
      } else {
        alert("Error in Fetching Data");
      }
    }
    setLoading(false);
  };

  // console.log(recipes);

  const handleLike = async (id) => {
    const res = await axios.patch(
      `${url}/users/favRecipe`,
      { id: id },
      {
        headers: { Authorization: `${token}` },
      }
    );
    if (res.data.statusCode === 200) {
      getData();
    } else {
      alert("Error in Fetching Data");
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [location.pathname]);

  // console.log(recipes);
  if (!token) return <div> Please Login...</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <CardLayout
        recipes={recipes}
        searchTerm={searchTerm}
        userId={userId}
        handleLike={handleLike}
      />
    </>
  );
}

export default Home;

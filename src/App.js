import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AddRecipe from "./components/Dashboard/AddRecipe";
import Forgot from "./components/Auth/Forgot";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Profile from "./components/Dashboard/Profile";
import Recipe from "./components/Recipe";
import RecipeByUser from "./components/Dashboard/RecipeByUser";
import Reset from "./components/Auth/Reset";
import Signup from "./components/Auth/Signup";
import axios from "axios";
export const CLIENT_URL = "https://kitchen-recipe-management-fe.netlify.app";
export const url = "https://kitchen-recipe-management-be.herokuapp.com";
// export const url = "http://localhost:8000";
export const searchContext = createContext();
export const profileContext = createContext();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState([]);
  const token = sessionStorage.getItem("token");

  const getProfile = async () => {
    if (token) {
      const res = await axios.get(`${url}/profile`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.data.statusCode === 200) {
        setProfile(res.data.user);
        // console.log(res.data.user);
      } else {
        alert("Error while fetching profile");
      }
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <searchContext.Provider value={{ searchTerm, setSearchTerm }}>
        <profileContext.Provider value={{ profile, setProfile, getProfile }}>
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot_password" element={<Forgot />} />
            <Route path="/reset_password/:accessToken" element={<Reset />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Home />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/userRecipes" element={<RecipeByUser />} />
            <Route path="/updateRecipe/:id" element={<AddRecipe />} />
            <Route path="/addRecipe" element={<AddRecipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </profileContext.Provider>
      </searchContext.Provider>
    </div>
  );
}

export default App;

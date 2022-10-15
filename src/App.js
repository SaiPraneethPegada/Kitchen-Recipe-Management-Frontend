import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AddRecipe from "./components/Dashboard/AddRecipe";
import Dashboard from "./components/Dashboard/Dashboard";
import Forgot from "./components/Auth/Forgot";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Profile from "./components/Dashboard/Profile";
import Recipe from "./components/Recipe";
import RecipeByUser from "./components/Dashboard/RecipeByUser";
import Reset from "./components/Auth/Reset";
import Signup from "./components/Auth/Signup";
export const CLIENT_URL = "https://localhost:3000";
export const url = "https://kitchen-recipe-management-be.herokuapp.com";
export const searchContext = createContext();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="App">
      <searchContext.Provider value={{ searchTerm, setSearchTerm }}>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot_password" element={<Forgot />} />
          <Route path="/reset_password/:accessToken" element={<Reset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userRecipes" element={<RecipeByUser />} />
          <Route path="/updateRecipe/:id" element={<AddRecipe />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </searchContext.Provider>
    </div>
  );
}

export default App;

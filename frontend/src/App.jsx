import React from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authentication from "./components/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";
import AddExpenses from "./components/AddExpenses";
import Category from "./components/Category";
import UpdateCategory from "./components/UpdateCategory";
import Expenses from "./components/Expenses";
import Spendings from "./components/Spendings";

function App() {
  return (
    <>
      <Authentication>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              }
            />
            <Route path="/spendings" element={<Spendings />} />
            <Route path="/addexpenses" element={<AddExpenses />} />
            <Route path="/category" element={<Category />} />
            <Route path="/updatecategory/:id" element={<UpdateCategory />} />
          </Routes>
        </BrowserRouter>
      </Authentication>
    </>
  );
}

export default App;

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://expense-tracker-backend-ufdt.onrender.com";

    fetch(`${apiUrl}/your-endpoint`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div>
        <h1>Data from API:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
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

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import UsersList from "./pages/userlist";
import EditUser from "./pages/edituser";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      {/* Show Navbar only if the user is not on the login page */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar /> {/* Navbar appears on all pages except Login */}
              <Routes>
                <Route path="/users" element={<UsersList />} />
                <Route path="/edit/:id" element={<EditUser />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

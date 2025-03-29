import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(response => setUser(response.data.data))
      .catch(error => console.error("Error fetching user:", error));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://reqres.in/api/users/${id}`, user)
      .then(() => navigate("/users"))
      .catch(error => console.error("Error updating user:", error));
  };

  return (
    <div className="container">
      <h2 className="my-4">Edit User</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditUser;

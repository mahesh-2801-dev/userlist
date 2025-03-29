import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios.get(`https://reqres.in/api/users?page=${page}`)
      .then(response => setUsers(response.data.data))
      .catch(error => console.error("Error fetching users:", error));
  }, [page]);

  const handleDelete = (id) => {
    axios.delete(`https://reqres.in/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error("Error deleting user:", error));
  };

  return (
    <div className="container">
      <h2 className="my-4">Users List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><img src={user.avatar} alt="avatar" width="50" /></td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button className="btn btn-secondary ms-2" onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default UserList;

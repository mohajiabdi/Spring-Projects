import React, { useEffect, useState } from "react";
import {
  getAllParents,
  createParent,
  updateParent,
  deleteParent,
} from "../../services/parentService.js";
import "../styles/parent.css";

const Parents = () => {
  const [parents, setParents] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadParents();
  }, []);

  const loadParents = async () => {
    const res = await getAllParents();
    setParents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateParent(editingId, form);
    } else {
      await createParent(form);
    }
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
    setEditingId(null);
    loadParents();
  };

  const handleEdit = (parent) => {
    setForm({
      firstName: parent.firstName,
      lastName: parent.lastName,
      email: parent.email,
      phoneNumber: parent.phoneNumber,
      address: parent.address,
    });
    setEditingId(parent.parentId);
  };

  const handleDelete = async (id) => {
    await deleteParent(id);
    loadParents();
  };

  return (
    <div className="parent-container">
      <h2 className="parent-title">Parent Management</h2>

      <form className="parent-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "Update Parent" : "Add Parent"}
        </button>
      </form>

      <div className="parent-table-wrapper">
        <table className="parent-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((p) => (
              <tr key={p.parentId}>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
                <td>{p.email}</td>
                <td>{p.phoneNumber}</td>
                <td>{p.address}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p.parentId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Parents;

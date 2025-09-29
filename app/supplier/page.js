// page for supplier
"use client";  // Required because it uses:
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";  // Client-side state
// Interactive forms, buttons, real-time updates

const API_BASE = process.env.NEXT_PUBLIC_API_URL;  // Using NEXT_PUBLIC_API_URL
console.debug("API_BASE", API_BASE);

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  async function fetchSuppliers() {
    const data = await fetch(`${API_BASE}/supplier`);
    // const data = await fetch(`http://localhost:3000/supplier`);
    const s = await data.json();
    setSuppliers(s);
  }

  const createSupplier = (data) => {
    fetch(`${API_BASE}/supplier`, {
      method:       "POST",
      headers:      {
        "Content-Type": "application/json",
      },
      body:         JSON.stringify(data),
    }).then(() => fetchSuppliers());
  };

  function startEditMode(supplier) {
    reset(supplier);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name:        '',
      contactInfo: '',
      address:     ''
    });
    setEditMode(false);
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="m-4">
      <h1>Supplier</h1>
      <form
        onSubmit={handleSubmit(createSupplier)}
        className="border p-4 mb-4"
      >
        <h2 className="text-lg font-bold mb-2">
          {editMode ? "Edit Supplier" : "Add New Supplier"}
        </h2>
        <div className="mb-2">
          <label className="block mb-1 font-bold">Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full border p-2"
            placeholder="Name"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-bold">Contact Info</label>
          <input
            {...register("contactInfo", { required: true })}
            className="w-full border p-2"
            placeholder="Contact Info"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-bold">Address</label>
          <input
            {...register("address", { required: true })}
            className="w-full border p-2"
            placeholder="Address"
          />
        </div>
        <div>
          {editMode ? (
            <>
              <button
                type="button"
                onClick={stopEditMode}
                className="bg-gray-500 text-white px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={stopEditMode}
                className="bg-blue-500 text-white px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2"
            >
              Add Supplier
            </button>
          )}
        </div>
      </form>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact Info</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">
                <Link href={`/supplier/${s._id}`} className="text-blue-600 hover:underline">
                  {s.name}
                </Link>
              </td>
              <td className="border p-2">{s.contactInfo}</td>
              <td className="border p-2">{s.address}</td>
              <td className="border p-2">
                <button
                  onClick={() => startEditMode(s)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                {/* Future: Add delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.debug("API_BASE", API_BASE);
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [editMode, setEditMode] = useState(false);

  async function fetchProducts() {
    const data = await fetch(`${API_BASE}/product`);
    // const data = await fetch(`http://localhost:3000/product`);
    const p = await data.json();
    setProducts(p);
  }

  async function fetchCategory() {
    const data = await fetch(`${API_BASE}/category`);
    const c = await data.json();
    setCategory(c);
  }

  const createProduct = (data) => {
    fetch(`${API_BASE}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchProducts());
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    
    await fetch(`${API_BASE}/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  function startEditMode(category) {
    reset(category);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      code: '',
      name: '',
      description: '',
      price: 0,
      category: category.length > 0 ? category[0]._id : ''
    });
    setEditMode(false);
  } 

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [fetchCategory, fetchProducts]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1 w-70 ">
        <form onSubmit={handleSubmit(createProduct)}>
          <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
            <div>Code:</div>
            <div>
              <input
                name="code"
                type="text"
                {...register("code", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Name:</div>
            <div>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Description:</div>
            <div>
              <textarea
                name="description"
                {...register("description", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Price:</div>
            <div>
              <input
                name="name"
                type="number"
                {...register("price", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Category:</div>
            <div>
              <select
                name="category"
                {...register("category", { required: true })}
                className="border border-black w-full"
              >
                {category.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 text-right">
            {editMode ?
              <>
                <input
                  type="submit"
                  className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  value="Update" />

                {' '}
                <button
                  onClick={() => stopEditMode()}
                  className=" italic bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >Cancel
                </button>
              </>
              :
              <input
                type="submit"
                value="Add"
                className="w-20 italic bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              />
            }
          </div>
          </div>
        </form>
      </div>
      <div className="border  m-4 flex-1 w-84 ">
        <h1 className="text-2xl">Products ({products.length})</h1>
        <table className="border-collapse border border-slate-400 min-w-full">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Code</th>
              <th className="border border-slate-300 p-2">Name</th>
              <th className="border border-slate-300 p-2">Category</th>
              <th className="border border-slate-300 p-2">Description</th>
              <th className="border border-slate-300 p-2">Price</th>
              <th className="border border-slate-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
            const cat = category.find(c => c._id === p.category);
      return (
      <tr key={p._id} className="hover:bg-slate-400">
        <td className="border border-slate-300 p-2">{p.code}</td>
        <td className="border border-slate-300 p-2">
          <Link href={`/product/${p._id}`} className="font-bold">
            {p.name}
          </Link>
        </td>
        <td className="border border-slate-300 p-2">{p.description}</td>
        <td className="border border-slate-300 p-2">{cat ? cat.name : "Unknown"}</td>
        <td className="border border-slate-300 p-2">{p.price}</td>
        <td className="border border-slate-300 p-2 text-center">
          <button className="border border-black p-1/2" onClick={() => startEditMode(p)}>📝</button>{' '}
          <button className="border border-black p-1/2" onClick={deleteById(p._id)}>❌</button>{' '}
        </td>
      </tr>
    );
  })}
          </tbody>
        </table>  
 {/* <ul className="list-disc ml-8">
          {
            products.map((p) => (
              // button for edit and delete
              <li key={p._id}>
                <button className="border border-black p-1/2" onClick={() => startEditMode(p)}>📝</button>{' '}
                <button className="border border-black p-1/2" onClick={deleteById(p._id)}>❌</button>{' '}
                <Link href={`/product/${p._id}`} className="font-bold">
                  {p.name}
                </Link>{" "}
                - {p.description}
              </li>
            ))}
        </ul> */}
      </div>
    </div>
  );
}

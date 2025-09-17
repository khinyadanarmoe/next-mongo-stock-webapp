"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.debug("API_BASE", API_BASE);
  const { register, handleSubmit ,reset} = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [editing, setEditing] = useState(null);


  //map category id to category name
  const categoryList = products.map((product) => {
    const cat = category.find(c => c._id === product.category);
    return {
      ...product,
      id: product._id,
      category: cat ? cat.name : "Uncategorized"
    };
  });

  console.log({categoryList})

  //data grid columns
   const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'Action', headerName: 'Action', width: 150,
      renderCell: (params) => {
        return (
          <div>
            <button onClick={() => startEditMode(params.row)}>📝</button>
            <button onClick={() => deleteById(params.row)}>🗑️</button>
          </div>
        )
      }
    },
  ]

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
    if (editing) {
      // Update existing product
      fetch(`${API_BASE}/product/${editing._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(() => {
        fetchProducts();
        cancelEditMode(); // Reset form after successful update
      });
    } else {
      // Create new product
      fetch(`${API_BASE}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => fetchProducts());
    }
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    
    await fetch(`${API_BASE}/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  //edit product
  const startEditMode = (product) => {
    setEditing(product);
    reset(product); // Populate the form with product data
  };

  const cancelEditMode = () => {
    setEditing(null);
    reset(
{
      code: "",
      name: "",
      description: "",
      price: 0,
      category: category.length > 0 ? category[0]._id : "", 
}
    ); // Clear the form
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="border m-4 bg-slate-300 w-80">
        <form onSubmit={handleSubmit(createProduct)}>
          <div className="grid grid-cols-2 gap-4 m-4 ">
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
                name="price"
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
            {editing ?
              <>
                <input
                  type="submit"
                  className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  value="Update" />

                {' '}
                <button
                  onClick={() => cancelEditMode()}
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
        </form>
      </div>
      <div className="border m-4 flex-1">
        <h1 className="text-2xl">Products ({products.length})</h1>

   <div className="mx-4">
        <DataGrid
          rows={categoryList}
          columns={columns}
        />
      </div>
       
      </div>
    </div>
  );
}

        {/* <ul className="list-disc ml-8">
          {
            products.map((p) => (
              <li key={p._id}>
                <button className="border border-black p-1/2" onClick={deleteById(p._id)}>❌</button>{' '}
                <Link href={`/product/${p._id}`} className="font-bold">
                  {p.name}
                </Link>{" "}
                - {p.description}
              </li>
            ))}
        </ul> */}


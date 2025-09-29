//id page
// read only
const API_BASE = process.env.NEXT_PUBLIC_API_URL;  // Using NEXT_PUBLIC_API_URL
export default async function Home({ params }) {  // Server component
  // Data fetched on server at build/request time
  const data = await fetch(`${API_BASE}/supplier/${params.id}`, { cache: "no-store" });
  const supplier = await data.json();
  // const id = params.id;
  return (
    <div className="m-4">
      <h1>Supplier</h1>
      <p className="font-bold text-xl text-blue-800">{supplier.name}</p>
      <p>Contact Info: {supplier.contactInfo}</p>
      <p>Address: {supplier.address}</p>
    </div>
  );
}   
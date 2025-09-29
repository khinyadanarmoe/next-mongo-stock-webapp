// crud for specific supplier by id

import Supplier from '@/models/Supplier';

export async function GET(request, { params }) {
  await dbConnect();
  const id = params.id;
  const supplier = await Supplier.findById(id);
  return new Response(JSON.stringify(supplier), { status: 200 });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const id = params.id;
  const supplier = await Supplier.findByIdAndDelete(id);
  return new Response(JSON.stringify(supplier), { status: 200 });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const id = params.id;
  const data = await request.json();
  const updatedSupplier = await Supplier.findByIdAndUpdate(id, data, { new: true });
  return new Response(JSON.stringify(updatedSupplier), { status: 200 });
}
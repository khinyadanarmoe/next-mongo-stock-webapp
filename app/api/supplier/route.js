// crud for supplier

import Supplier from '@/models/Supplier';

export async function GET(request) {
  const suppliers = await Supplier.find({});
  return Response.json(suppliers);
}

export async function POST(request) {
  const data = await request.json();
  const newSupplier = new Supplier(data);
  await newSupplier.save();
  return Response.json(newSupplier);
}       

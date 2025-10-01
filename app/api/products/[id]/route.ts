import { NextResponse } from "next/server";
import { updateProduct } from "@/services/productService";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  try {
    // Handle both cases (sync or promise)
    const resolvedParams = await Promise.resolve(params);
    const { id } = resolvedParams;

    const data = await req.json();
    const product = await updateProduct(id, data);

    return NextResponse.json(product);
  } catch (err) {
    console.error("❌ PUT /products/[id] error:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 400 });
  }
}

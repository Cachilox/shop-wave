import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    await connectToDB();

    const extractAllproducts = await Product.find({});

    if (extractAllproducts) {
      return NextResponse.json({
        success: true,
        data: extractAllproducts,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Products found",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

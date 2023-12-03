import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    const data = await req.json();

    if (isAuthUser?.role === "admin") {
      const {
        _id,
        shippingAddress,
        orderItems,
        paymentMethod,
        isPaid,
        paidAt,
        isProcessing,
      } = data;

      const updateOrder = await Order.findOneAndUpdate(
        { _id: _id },
        {
          shippingAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        }
      );

      if(updateOrder) {
        return NextResponse.json({
          success: true,
          message: "Order status update successfully!"
        })
      } else {
        return NextResponse.json({
          success: true,
          message: "failed to update the status of order"
        })
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again later",
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

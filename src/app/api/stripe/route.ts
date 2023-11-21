import AuthUser from "@/middleware/AuthUser";
import { NextResponse, NextRequest } from "next/server";

const stripe = require("stripe")(
  "sk_test_51OC64tBVQsLpIE719oHNqjSuMrgeITDrLx1Pso4hWItLd5rEgPkkcmf01xphO1RNDDrwu1MBiDHiZeM8g2SBeQzz00JsUxJvI4"
);

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}

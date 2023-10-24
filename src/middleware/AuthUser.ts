import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AuthUser = async (req: NextResponse) => {
  console.log(req.headers.get("Authorization"));
  
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(token, `${process.env.NEXT_PUBLIC_SECRET_KEY}`);
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default AuthUser;

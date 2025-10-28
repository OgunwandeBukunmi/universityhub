import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();
    console.log(name, password);

    if (!name || !password) {
      return NextResponse.json(
        { success: false, message: "Missing credentials" },
        { status: 400 }
      );
    }

    if (name === "emmanuel" && password === "mario123") {
      // ✅ Create a response object first
      const res = NextResponse.json(
        { success: true, message: "Authorized user" },
        { status: 200 }
      );

      // ✅ Then set the cookie on the response
      res.cookies.set({
        name: "auth",
        value: password, // In real-world use, replace this with a JWT instead of plain password
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });

      return res;
    } else {
      return NextResponse.json(
        { success: false, message: "Wrong Credentials" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("Error checking password:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

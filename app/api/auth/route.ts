import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { hashPassword, verifyPassword, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { action, email, password, username } = await req.json();
    await connectToDatabase();

    if (action === "signup") {
      const existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { username }],
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "User with this email or username already exists" },
          { status: 400 }
        );
      }

      const password_hash = await hashPassword(password);
      const user = await User.create({
        email: email.toLowerCase(),
        username,
        password_hash,
        role: "free",
      });

      const token = signToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      const response = NextResponse.json({
        user: { id: user._id, email: user.email, username: user.username, role: user.role },
      });

      response.cookies.set({
        name: "staqor_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    if (action === "login") {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      const isValid = await verifyPassword(password, user.password_hash);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      const token = signToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      const response = NextResponse.json({
        user: { id: user._id, email: user.email, username: user.username, role: user.role },
      });

      response.cookies.set({
        name: "staqor_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication request failed" },
      { status: 500 }
    );
  }
}

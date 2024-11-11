import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    console.log(email, password);

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: "User is not found" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = user.password === password;

    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid credentials error" }, { status: 401 });
  }
}

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, phone, password } = await request.json();

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or phone already in use" },
        { status: 400 }
      );
    }

    const newUser = new User({
      email,
      phone,
      password,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error registering user" },
      { status: 500 }
    );
  }
}

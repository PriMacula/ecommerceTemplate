import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (user) {
      console.log(user.id);
      return NextResponse.json(user.id);
    }
    return null
  } catch (error) {
    console.error("Error checking authentication:", error);
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

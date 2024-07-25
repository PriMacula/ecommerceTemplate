import User from "../../models/User";
import connectToDatabase from "../../mongodb";
import { lucia } from "../../../lib/auth";
import { cookies } from "next/headers";
import { verifyPassword } from "@/utils/utils";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log("Received request with email:", email);

    await connectToDatabase();
    console.log("Database connected");

    const user = await User.findOne({ email, accountType: "email" });
    if (!user) {
      console.error("User not found");
      return new Response(JSON.stringify({ error: "Invalid Credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("User found:", user);

    const isPasswordCorrect = await verifyPassword(email, password);
    if (!isPasswordCorrect) {
      console.error("Incorrect password");
      return new Response(JSON.stringify({ error: "Invalid Credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Password verified");

    const session = await lucia.createSession(user._id, {});
    console.log("Session created:", session);

    const sessionCookie = lucia.createSessionCookie(session.id);
    console.log("Session cookie created:", sessionCookie);

    const cookieStore = cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    console.log("Session cookie set");

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error during login process:", e);
    return new Response(
      JSON.stringify({ error: "An unknown error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

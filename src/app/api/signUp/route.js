import { lucia } from "@/lib/auth";
import User from "../../models/User";
import connectToDatabase from "../../mongodb";
import crypto from "crypto";
import { generateForgetPasswordCode, hashPassword } from "../../../utils/utils";

export async function POST(req) {
  const { email, password, name } = await req.json();

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email, accountType: "email" });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email is already registered" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const salt = crypto.randomBytes(128).toString("hex");
    const hashedPassword = await hashPassword(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      salt: salt,
      accountType: "email",
    });

    const session = await lucia.createSession(user._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": `${sessionCookie.name}=${sessionCookie.value}; Path=/; HttpOnly`,
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log("error", e);
    return new Response(
      JSON.stringify({ error: "An unknown error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

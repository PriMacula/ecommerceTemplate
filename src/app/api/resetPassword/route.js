import { hashPassword, verifyPassword } from "../../../utils/utils";
import User from "../../models/User";
import connectToDatabase from "../../mongodb";
import crypto from "crypto";

export async function POST(req) {
  const { email, newPassword, code } = await req.json();

  try {
    await connectToDatabase();

    const user = await User.findOne({ email, accountType: "email" });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { forgetPasswordCode } = user;
    if (
      !forgetPasswordCode ||
      !(await verifyPassword(code, forgetPasswordCode))
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired code" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const salt = crypto.randomBytes(128).toString("hex");
    const hashedPassword = await hashPassword(newPassword, salt);

    user.password = hashedPassword;
    user.salt = salt;
    user.forgetPasswordCode = null;
    await user.save();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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

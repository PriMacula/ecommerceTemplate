import { sendPasswordResetEmail } from "../../../utils/emails"; 
import User from "../../models/User";
import connectToDatabase from "../../mongodb";
import { generateForgetPasswordCode, hashPassword } from "../../../utils/utils";

export async function POST(req) {
  const { email } = await req.json();

  try {
    await connectToDatabase();

    const user = await User.findOne({ email, accountType: "email" });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Email not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const resetCode = await generateForgetPasswordCode();
    const hashedCode = await hashPassword(resetCode, user.salt);

    user.forgetPasswordCode = hashedCode;
    await user.save();

    await sendPasswordResetEmail(email, resetCode);

    return new Response(
      JSON.stringify({ success: "Reset code sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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

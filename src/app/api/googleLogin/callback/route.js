import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { googleAuth } from "../../../../lib/auth";
import { setSession } from "../../../../lib/session";
import connectToDatabase from "../../../mongodb";
import User from "../../../models/User";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    await connectToDatabase(); // Connect to the database
    const tokens = await googleAuth.validateAuthorizationCode(
      code,
      codeVerifier,
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser = await response.json();

    // Check if the user already exists in the database
    let existingAccount = await User.findOne({ email: googleUser.email });

    if (existingAccount) {
      // If the user exists, update their Google ID and account type if necessary
      existingAccount.googleId = googleUser.sub;
      existingAccount.accountType = "google";
      await existingAccount.save();
      await setSession(existingAccount._id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    // If the user does not exist, create a new user in the database
    const newUser = new User({
      email: googleUser.email,
      googleId: googleUser.sub,
      accountType: "google",
    });

    await newUser.save();

    await setSession(newUser._id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.error("OAuth Error:", e);
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

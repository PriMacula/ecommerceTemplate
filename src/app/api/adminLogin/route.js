import bcrypt from 'bcryptjs';
import connectToDatabase from '../../mongodb';
import { lucia } from "../../../lib/auth";
import { cookies } from "next/headers";
import  verifyAdminPass  from "@/utils/utils"; // Adjust the import path as necessary


export async function POST(req) {
    const { username, password } = await req.json();
    const { ADMIN_USERNAME } = process.env;
  
    if (username === ADMIN_USERNAME && verifyAdminPass(password)) {
      
      const isPasswordMatch = true;
  
      if (isPasswordMatch) {
        await connectToDatabase();
        const session = await lucia.createSession('0', {}); // Assuming '0' is the admin user ID
        const sessionCookie = lucia.createSessionCookie(session.id);
  
        const cookieStore = cookies();
        cookieStore.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
  
        return new Response(
          JSON.stringify({ message: "Login successful" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }
  
    return new Response(
      JSON.stringify({ error: "Invalid Credentials" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
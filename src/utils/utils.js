"use server";
import crypto from "crypto";
import User from "../app/models/User";
import connectToDatabase from "../app/mongodb";
import { validateRequest } from "@/lib/auth";
const ITERATIONS = 10000;

export async function hashPassword(plainTextPassword, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

export async function verifyPassword(email, password) {
  await connectToDatabase();
  const user = await User.findOne({ email, accountType: "email" });
  if (!user) return false;
  const salt = user.salt;
  const savedPassword = user.password;
  if (!salt || !savedPassword) return false;
  const hashedPassword = await hashPassword(password, salt);
  return user.password === hashedPassword;
}
export async function isLoggedIn() {
  const { session } = await validateRequest();
  return session;
}
export async function generateForgetPasswordCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}

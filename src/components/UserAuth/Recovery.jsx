"use client";
import { useState } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { toast } from "sonner";

const Signup = ({ setAuthState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/requestPasswordReset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast.success("Email sent successfully");
      } else {
        const { error } = await res.json();
        toast.error(error);
      }
    } catch (error) {
      console.error("Send email error:", error);
      toast.error("Email not found");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: password,
          code: code,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast.success("Password reset successfully");
      } else {
        const { error } = await res.json();
        toast.error(error);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("An error occurred while resetting password");
    }
  };
  return (
    <div className="flex h-full flex-col gap-14">
      <h2 className="text-3xl font-semibold relative pb-3 w-max mx-auto">
        <span className="absolute bottom-0 bg-black w-1/2 h-2"></span>
        Recover Account
      </h2>
      <p className="text-sm text-gray-700 w-3/4 mx-auto">
        We'll send you code by email so that you can reset your password
      </p>
      <FloatingLabelInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        labelText="Email Adress"
        type="email"
        id="email"
      />

      <button
        className="bg-black text-white font-bold uppercase px-8 py-4 w-full rounded-md hover:bg-[#111111e7]"
        onClick={handleEmailSubmit}
      >
        Send Email
      </button>
      <p className="text-sm -mt-10">
        Want to sign in instead?
        <span
          className="uppercase font-bold cursor-pointer hover:border-b-2 border-black"
          onClick={() => setAuthState("login")}
        >
          {" "}
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;

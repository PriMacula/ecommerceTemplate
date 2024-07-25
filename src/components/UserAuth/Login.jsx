"use client";
import { useState } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { toast } from "sonner";

const Login = ({ setAuthState }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      toast.success("Logged in successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      const { error } = await res.json();
      toast.error(error);
    }
  };

  return (
    <div className="flex h-full flex-col gap-14">
      <h2 className="text-3xl font-semibold relative pb-3 w-max mx-auto">
        <span className="absolute bottom-0 bg-black w-1/2 h-2"></span>
        Log in
      </h2>
      <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
        <FloatingLabelInput
          labelText="Email Address"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FloatingLabelInput
          labelText="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a
          className="text-xs tracking-wide font-extrabold ml-auto -mt-8 cursor-pointer hover:border-b-2 border-black"
          onClick={() => setAuthState("recovery")}
        >
          Forgotten your password?
        </a>
        <button
          className="bg-black text-white font-bold uppercase px-8 py-4 w-full rounded-md hover:bg-[#111111e7]"
          type="submit"
        >
          Log in
        </button>
        <p className="text-sm -mt-10">
          Don't have an account?
          <span
            className="uppercase font-bold cursor-pointer hover:border-b-2 border-black pb-1"
            onClick={() => setAuthState("signup")}
          >
            {" "}
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

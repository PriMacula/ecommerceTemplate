"use client";
import React, { useState } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { toast } from "sonner";

const Signup = ({ setAuthState }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter");
      setPasswordError(true);
      hasError = true;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) return;

    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      toast.success("Account created successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      const { error } = await res.json();
      toast.error(error || "An unknown error occurred");
    }
  };

  const handleInputChange = (setter, setError) => (e) => {
    setter(e.target.value);
    setError(false);
  };

  return (
    <div className="flex h-full flex-col gap-14">
      <h2 className="text-3xl font-semibold relative pb-3 w-max mx-auto">
        <span className="absolute bottom-0 bg-black w-1/2 h-2"></span>
        Signup
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <FloatingLabelInput
          labelText="Name"
          type="text"
          id="name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />
        
        <FloatingLabelInput
          labelText="Email Address"
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange(setEmail, setEmailError)}
          hasError={emailError}
        />
        <FloatingLabelInput
          labelText="Password"
          type="password"
          id="password"
          value={password}
          onChange={handleInputChange(setPassword, setPasswordError)}
          hasError={passwordError}
        />
        <FloatingLabelInput
          labelText="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange(setConfirmPassword, setPasswordError)}
          hasError={passwordError}
        />

        <button
          type="submit"
          className="bg-black text-white font-bold uppercase px-8 py-4 w-full rounded-md hover:bg-[#111111e7]"
        >
          Create Account
        </button>
        <p className="text-sm -mt-10">
          Already have an account?
          <span
            className="uppercase font-bold cursor-pointer hover:border-b-2 border-black pb-1"
            onClick={() => setAuthState("login")}
          >
            {" "}
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { toast } from 'sonner';

const Signup = ({ setAuthState }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => email.includes('@') && email.includes('.');

  const validatePassword = (password) => password.length >= 8 && /[A-Z]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!validateEmail(email)) {
      toast.error('Invalid email address');
      setEmailError('Invalid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters long and contain at least one uppercase letter');
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter');
      hasError = true;
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setPasswordError('Passwords do not match');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    try {
      const res = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, cart }),
      });

      if (res.ok) {
        toast.success('Account created successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const { error } = await res.json();
        toast.error(error || 'An unknown error occurred');
      }
    } catch (error) {
      console.error("Failed to submit signup form:", error);
      toast.error('An error occurred while processing your request');
    }
  };

  const handleInputChange = (setter, setError) => (e) => {
    setter(e.target.value);
    setError(''); // Clear the error when input changes
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
          onChange={handleInputChange(setName, () => {})}
        />
        <FloatingLabelInput
          labelText="Email Address"
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange(setEmail, setEmailError)}
          hasError={!!emailError}
          errorMessage={emailError}
        />
        <FloatingLabelInput
          labelText="Password"
          type="password"
          id="password"
          value={password}
          onChange={handleInputChange(setPassword, setPasswordError)}
          hasError={!!passwordError}
          errorMessage={passwordError}
        />
        <FloatingLabelInput
          labelText="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange(setConfirmPassword, setPasswordError)}
          hasError={!!passwordError}
          errorMessage={passwordError}
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
            onClick={() => setAuthState('login')}
          >
            {' '}Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

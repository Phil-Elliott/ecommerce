import axios from "axios";
import React, { useState } from "react";

type ForgotPasswordProps = {
  handleForgotPassword: () => void;
};

const ForgotPassword = ({ handleForgotPassword }: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");

  // Handling the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/forgotpassword",
        {
          email: email,
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  // Handling the email change
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Please enter your email address</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label
          className="text-sm font-semibold pb-1 text-gray-700"
          htmlFor="Email"
        >
          Email
        </label>
        <input
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          type="email"
          onChange={handleEmail}
          value={email}
        />
        <div className="">
          <button
            className="bg-black hover:opacity-90 text-white font-semibold mt-2 py-1 px-2 w-full rounded-md focus:outline-none focus:ring-offset-2"
            type="submit"
          >
            Continue
          </button>
          <button
            className="border-2 border-black hover:opacity-90 font-semibold mt-2 py-1 px-2 w-full rounded-md focus:outline-none focus:ring-offset-2"
            onClick={handleForgotPassword}
          >
            Cancel{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

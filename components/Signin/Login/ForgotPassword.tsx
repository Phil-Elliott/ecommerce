import axios from "axios";
import React, { useState } from "react";

type ForgotPasswordProps = {
  handleForgotPassword: () => void;
};

const ForgotPassword = ({ handleForgotPassword }: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [attempted, setAttempted] = useState<boolean>(false);
  const [error, setError] = useState("");

  // Handling the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") {
      setAttempted(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://ecommercebackend-production-40c6.up.railway.app/api/v1/auth/forgotpassword",
        {
          email: email,
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  // Handling the email change
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center pb-4 text-gray-800">
        Forgot Password
      </h1>
      <p className="pb-4 text-gray-800">Please enter your email address</p>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <label
          className="text-sm font-semibold pb-2 text-gray-700"
          htmlFor="Email"
        >
          Email
        </label>
        <input
          className="border border-gray-300 rounded-md px-2 py-1 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          type="email"
          onChange={handleEmail}
          value={email}
        />
        {error && (
          <p className="text-sm text-red-600 mb-2">
            👋 Please enter a valid email
          </p>
        )}
        <div className="">
          <button
            className="bg-black hover:opacity-90 text-white font-semibold mt-2 py-1 px-2 w-full rounded-sm focus:outline-none focus:ring-offset-2 hover:bg-gray-700 transition duration-3"
            type="submit"
          >
            Continue
          </button>
          <button
            className="border-2 border-black hover:opacity-90 font-semibold mt-2 py-1 px-2 w-full rounded-sm focus:outline-none focus:ring-offset-2
            hover:text-white hover:bg-red-500 transition duration-300 hover:shadow-md hover:border-transparent 
            "
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

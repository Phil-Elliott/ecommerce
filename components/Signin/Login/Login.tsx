import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "redux/slices/userSlice";

type LoginProps = {
  handleFormChange: () => void;
  handleForgotPassword: () => void;
  closeModal: () => void;
};

const Login = ({
  handleFormChange,
  handleForgotPassword,
  closeModal,
}: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handling the email change
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  // Handling the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ecommercebackend-production-40c6.up.railway.app/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(setUser(response.data.data.user));
      closeModal();
    } catch (error: any) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center pb-4 text-gray-800">
        Login to Your Account
      </h2>
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
        <label
          className="text-sm font-semibold pb-2 text-gray-700"
          htmlFor="Password"
        >
          Password
        </label>
        <input
          className="border border-gray-300 rounded-md px-2 py-1 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          type="password"
          onChange={handlePassword}
          value={password}
        />
        {error && (
          <p className="text-sm text-red-600 mb-2">
            👋 Invalid email or password
          </p>
        )}

        <p
          className="text-sm text-gray-700 cursor-pointer hover:underline mb-2"
          onClick={() => handleForgotPassword()}
        >
          Forgot Password
        </p>

        <div className="">
          <button
            className="bg-black hover:opacity-90 text-white font-semibold mt-2 py-1 px-2 w-full rounded-md focus:outline-none focus:ring-offset-2"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="mt-4 text-sm text-gray-700 text-center">
        Don't have an account?{" "}
        <span
          className="
          font-semibold cursor-pointer hover:underline
        "
          onClick={() => handleFormChange()}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;

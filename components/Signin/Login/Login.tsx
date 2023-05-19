import axios from "axios";
import React, { useState } from "react";

type LoginProps = {
  handleFormChange: () => void;
  closeModal: () => void;
};

const Login = ({ handleFormChange, closeModal }: LoginProps) => {
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

  // Handling the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: email,
          password: password,
        }
      );
      let jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);

      // Redirect to the dashboard
      if (jwt) {
        console.log(response.data.user);
        closeModal();
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("username", response.data.user.username);
        // dispatch(setJwt(jwt));
        // dispatch(setUser(response.data.user));
        // navigate("/dashboard/");
      }
    } catch (error: any) {
      console.log(error);
      setError("error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center pb-4 text-gray-800">
        Login to Your Account
      </h2>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
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
        <label
          className="text-sm font-semibold pb-1 text-gray-700"
          htmlFor="Password"
        >
          Password
        </label>
        <input
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          type="password"
          onChange={handlePassword}
          value={password}
        />
        {error && (
          <p className="text-sm text-red-600 mb-2">
            👋 Invalid email or password
          </p>
        )}
        {/* <p className={styles.forgot}>Forgot Password</p> */}
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

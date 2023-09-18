import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const user = useSelector((state: any) => state.user);

  const fields = [
    { label: "Name", type: "text", name: user.name },
    { label: "Email", type: "email", name: user.email },
    { label: "Address", type: "text", name: user.address },
    { label: "Phone Number", type: "tel", name: user.phoneNumber },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    // setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Update user information in your database here
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Account</title>
        <meta
          name="description"
          content="Update your account information here"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto min-h-screen pb-10 pt-28">
        <div className="bg-white  w-full rounded">
          <h1 className="text-3xl p-6 border-b-2 border-gray-200">
            My Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="pb-2" htmlFor={field.name}>
                  {field.label}:
                </label>
                <input
                  className="border p-2 rounded"
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={field.name}
                  onChange={handleInputChange}
                  placeholder={field.label}
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Update Profile
            </button>
          </form>
          <div className="p-6 pt-0">
            <button
              onClick={() => {
                /* Add password update logic here */
              }}
              className="bg-red-500 text-white p-2 rounded mt-4"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

/*

Include
- Name
- Email
- Address
- Phone Number
- Password
- Avatar


*/

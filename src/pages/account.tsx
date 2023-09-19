import Head from "next/head";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Account = () => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [newUserData, setNewUserData] = useState({} as any);

  const toggleEdit = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const user = useSelector((state: any) => state.user);

  const fields = [
    { label: "Name", type: "text", name: user.name },
    { label: "Email", type: "email", name: user.email },
    { label: "Address", type: "text", name: user.address },
    { label: "Phone Number", type: "tel", name: user.phoneNumber },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setNewUserData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(newUserData);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/users/updateMe",
        newUserData,
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

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
      <div className="container mx-auto min-h-screen pb-10 pt-20 sm:pt-28">
        <div className="bg-white lg:w-1/2 rounded mx-auto shadow-lg">
          <h1 className="text-3xl p-6 border-b-2 border-gray-200">
            My Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex sm:items-center sm:space-x-2 flex-col sm:flex-row"
              >
                <label className="" htmlFor={field.name}>
                  {field.label}:
                </label>
                <div className="items-center space-x-2 pt-2 sm:pt-0">
                  <input
                    className="border p-1 rounded"
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={field.name}
                    onChange={handleInputChange}
                    placeholder={field.label}
                    disabled={field.name === "" || field.name === undefined}
                  />
                  <button
                    className="cursor-pointer text-sm hover:text-blue-900 transition duration-300"
                    onClick={() => toggleEdit(field.label)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            <div className="flex sm:flex-row flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  /* Add password update logic here */
                }}
                className="px-4 py-2 rounded border-black border-2 hover:shadow-lg"
              >
                Change Password
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;

/*

- Connect to backend updating user details
- Add all of the other user details to the model that you will need
- Figure out changing the password
- Add a delete account button and figure out on the backend

- Fix how it looks
- Make it responsive


*/

import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "redux/slices/userSlice";
import axios from "axios";

const Account = () => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [fields, setFields] = useState([] as any);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    fields.forEach((field: any, index: any) => {
      if (isEditing[field.label]) {
        inputRefs.current[index]?.focus();
      }
    });
  }, [isEditing]);

  const toggleEdit = (field: string, index: number) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  useEffect(() => {
    setFields([
      { label: "Name", type: "text", name: user.name },
      { label: "Email", type: "email", name: user.email },
      { label: "Address", type: "text", name: user.address },
      { label: "Phone Number", type: "tel", name: user.phoneNumber },
    ]);
  }, [user]);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFields((prevState: any) =>
      prevState.map((field: any) => {
        if (field.label === name) {
          return { ...field, name: value };
        }
        return field;
      })
    );
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newUserData = {
      name: fields[0].name,
      email: fields[1].name,
      address: fields[2].name,
      phoneNumber: fields[3].name,
    };

    try {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/users/updateMe",
        newUserData,
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(res.data.data.user));
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyDown = (field: any, e: any) => {
    if (field.type === "tel") {
      const allowedKeys = [
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Tab",
      ];
      if (!/[0-9\-+\s()]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
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
      <div className="container mx-auto min-h-screen pb-10 pt-20 sm:pt-28">
        <div className="bg-white lg:w-1/2 rounded mx-auto shadow-lg">
          <h1 className="text-3xl p-6 border-b-2 border-gray-200">
            My Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {fields.map((field: any, index: any) => (
              <div
                key={index}
                className="flex sm:items-center sm:space-x-2 flex-col sm:flex-row"
              >
                <label className="" htmlFor={field.name}>
                  {field.label}:
                </label>
                <div className="items-center space-x-2 pt-2 sm:pt-0">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="border py-1 px-2 rounded"
                    type={field.type}
                    id={field.label}
                    name={field.label}
                    value={field.name ? field.name : ""}
                    onChange={handleInputChange}
                    placeholder={field.label}
                    disabled={!isEditing[field.label]}
                    onKeyDown={(e) => handleKeyDown(field, e)}
                  />
                  <button
                    type="button"
                    className="cursor-pointer text-sm hover:text-blue-900 transition duration-300"
                    onClick={() => toggleEdit(field.label, index)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            <div className="flex sm:flex-row flex-col gap-2 pt-2">
              {/* <button
                onClick={() => {
                }}
                className="px-4 py-2 rounded border-black border-2 hover:shadow-lg"
              >
                Change Password
              </button> */}
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

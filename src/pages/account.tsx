import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "redux/slices/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Modal from "components/shared/Modal/Modal";
import { BiShow, BiHide } from "react-icons/bi";

const Account = () => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [fields, setFields] = useState([] as any);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const passwordModalCloseRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const router = useRouter();

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
      { label: "Phone Number", type: "tel", name: user.phoneNumber },
      {
        label: "Address",
        type: "object",
        name: {
          streetAddress: user.address?.streetAddress || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          postalCode: user.address?.postalCode || "",
          country: user.address?.country || "",
        },
      },
    ]);
  }, [user]);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();

    // Check if the user typed the current password, new password, and confirm password fields
    if (!currentPassword || !newPassword || !passwordConfirm) {
      return toast.error("Please fill in all fields");
    }

    // Check if the new password and confirm password fields match
    if (newPassword !== passwordConfirm) {
      return toast.error("New password and confirm password fields must match");
    }

    const passwordData = {
      currentPassword,
      newPassword,
      passwordConfirm,
    };

    try {
      const res = await axios.patch(
        "http://localhost:4242/api/v1/auth/updatePassword",
        passwordData,
        {
          withCredentials: true,
        }
      );
      toast.success("Password Updated Successfully");
      passwordModalCloseRef.current?.click();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server sends an error message, show it in a toast
        toast.error(error.response.data.message);
      } else {
        // If the error message is not available, show a generic error message
        toast.error("An error occurred while updating the password");
      }
      console.log(error);
    }
  }

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const [label, key] = e.target.name.split(".");
    const value = e.target.value;

    setFields((prevState: any) =>
      prevState.map((field: any) => {
        if (field.label === label) {
          if (key) {
            return { ...field, name: { ...field.name, [key]: value } };
          } else {
            return { ...field, name: value };
          }
        }
        return field;
      })
    );
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    // // Check if the user has made any changes
    // const hasChanged = fields.some((field: any) => {
    //   if (field.type === "object") {
    //     return Object.keys(field.name).some(
    //       (key) => field.name[key] !== user[field.label]?.[key]
    //     );
    //   } else {
    //     return field.name !== user[field.label];
    //   }
    // });

    // if (!hasChanged) {
    //   return toast.error("No changes made");
    // }

    const newUserData = {
      name: fields[0].name,
      email: fields[1].name,
      phoneNumber: fields[2].name,
      address: fields[3].name,
    };

    try {
      const res = await axios.patch(
        "http://localhost:4242/api/v1/users/updateMe",
        newUserData,
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(res.data.data.user));
      // Set all fields to not editing when the update is successful.
      setIsEditing({});
      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error updating profile");
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

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );

    if (!confirmation) return;

    try {
      await axios.delete("http://localhost:4242/api/v1/users/deleteMe", {
        withCredentials: true,
      });

      toast.success("Account Deleted Successfully");
      router.push("/login"); // Or '/' to redirect to home page or login page after deletion
    } catch (err: any) {
      console.log(err);
      // Check if the error message is related to the deletion of demo account
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error deleting account");
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
      <ToastContainer />
      <div className="container mx-auto min-h-screen pb-10 pt-20 sm:pt-28">
        <div className="bg-white lg:w-1/2 rounded mx-auto shadow-lg">
          <h1 className="text-3xl p-6 border-b-2 border-gray-200">
            My Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 p-6 pb-0">
            {fields.map((field: any, index: number) => (
              <div
                key={index}
                className="flex sm:items-center sm:space-x-2 flex-col sm:flex-row"
              >
                <label
                  className={field.label === "Address" ? "self-start" : ""}
                  htmlFor={field.name}
                >
                  {field.label}:
                </label>
                <div className="space-x-2 pt-2 sm:pt-0">
                  {field.type === "object" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.keys(field.name).map((key) => (
                        <input
                          key={key}
                          className="border py-1 px-2 rounded"
                          type="text"
                          id={`${field.label}_${key}`}
                          name={`${field.label}.${key}`}
                          value={field.name[key]}
                          placeholder={key}
                          disabled={!isEditing[field.label]}
                          onChange={handleInputChange}
                        />
                      ))}
                      <button
                        type="button"
                        className="text-left cursor-pointer text-sm hover:text-blue-900 transition duration-300"
                        onClick={() => toggleEdit(field.label, index)}
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <div className="space-x-2">
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="border py-1 px-2 rounded"
                        type={field.type}
                        id={field.label}
                        name={field.label}
                        value={field.name ? field.name : ""}
                        placeholder={field.label}
                        disabled={!isEditing[field.label]}
                        onChange={handleInputChange}
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
                  )}
                </div>
              </div>
            ))}
            <div className="flex sm:flex-row flex-col gap-2 pt-2">
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg"
              >
                Update Profile
              </button>
            </div>
          </form>
          <div className="px-6 pb-6 sm:space-x-3 space-y-3 pt-3 sm:space-y-0 w-full sm:flex">
            <Modal
              trigger={
                <div className="bg-white text-black border-2 border-black px-4 py-2 rounded hover:opacity-75 hover:shadow-lg w-full ">
                  Change Password
                </div>
              }
              classAddOn="w-full"
              closeRef={passwordModalCloseRef}
            >
              <h2 className="text-2xl font-bold text-center pt-2 pb-4 text-gray-800">
                Change Password
              </h2>
              <form
                onSubmit={handlePasswordChange}
                className="space-y-4 relative"
              >
                <div className="z-50 flex flex-col space-y-2">
                  <label htmlFor="currentPassword" className="self-center">
                    Current Password:
                  </label>
                  <div className="relative flex items-center space-x-2">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      className="border p-2 rounded flex-grow pr-8"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    >
                      {showCurrentPassword ? <BiHide /> : <BiShow />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="newPassword" className="self-center">
                    New Password:
                  </label>
                  <div className="relative flex items-center space-x-2">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      className="border p-2 rounded flex-grow pr-8"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    >
                      {showNewPassword ? <BiHide /> : <BiShow />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="passwordConfirm" className="self-center">
                    Confirm New Password:
                  </label>
                  <div className="relative flex items-center space-x-2">
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      id="passwordConfirm"
                      className="border p-2 rounded flex-grow pr-8"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <button
                      className="absolute top-1/2 right-2 transform -translate-y-1/2"
                      type="button"
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                    >
                      {showPasswordConfirm ? <BiHide /> : <BiShow />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg w-full"
                >
                  Update Password
                </button>
              </form>
            </Modal>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="bg-red-600 border-red-600 border-2 text-white px-4 py-2 rounded hover:opacity-75 hover:shadow-lg w-full "
            >
              Delete Account
            </button>
          </div>
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

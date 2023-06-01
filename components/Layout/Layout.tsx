import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "redux/slices/userSlice";

type LayoutProps = {
  children: React.ReactNode;
  signInButton: VoidFunction;
};

const Layout = ({ children, signInButton }: LayoutProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/me",
          { withCredentials: true }
        );

        console.log(response.data);

        if (response.data.status === "success") {
          dispatch(setUser(response.data.data.user));
        } else {
          console.log("Not logged in");
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!user.email) {
      console.log("User not logged in");
      fetchUser();
    } else {
      console.log("User already logged in");
    }
  }, []);

  return (
    <div>
      <Header signInButton={signInButton} />
      <main className="" style={{ minHeight: "90vh" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

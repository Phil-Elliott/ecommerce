import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useSelector } from "react-redux";

type LayoutProps = {
  children: React.ReactNode;
  signInButton: VoidFunction;
};

const Layout = ({ children, signInButton }: LayoutProps) => {
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

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

import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

type LayoutProps = {
  children: React.ReactNode;
  signInButton: VoidFunction;
};

const Layout = ({ children, signInButton }: LayoutProps) => {
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

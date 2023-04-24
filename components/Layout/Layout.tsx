import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main className="" style={{ minHeight: "90vh" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

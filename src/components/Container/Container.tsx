import React, { ReactNode } from "react";
import Navbar from "../Shared/Nav/Navbar";
import Footer from "../Shared/Footer/Footer";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Container;

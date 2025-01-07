import React, { ReactNode } from "react";
import Navbar from "../Shared/Nav/Navbar";
import Footer from "../Shared/Footer/Footer";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="container mx-auto">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Container;

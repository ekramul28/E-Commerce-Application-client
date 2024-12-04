import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      this is customer layout
      {children}
    </div>
  );
};

export default layout;

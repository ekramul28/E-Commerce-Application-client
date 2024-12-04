import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      this is Admin layout
      {children}
    </div>
  );
};

export default layout;

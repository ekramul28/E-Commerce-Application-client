import SideBar from "@/components/SideBar/SideBar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className="col-span-2 fixed top-0 left-0  h-screen ">
          <SideBar />
        </div>

        <div className="col-span-12 md:col-span-10 md:col-start-3 mx-3 ml-12 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

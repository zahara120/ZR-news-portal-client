import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";
export const MainLayout = () => {
  return (
    <>
      <div className="p-4 md:px-12 md:py-7 md:mx-9 h-screen">
        <Navbar />
        <div className="flex flex-col gap-y-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

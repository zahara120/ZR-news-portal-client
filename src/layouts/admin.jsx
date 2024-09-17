import AdminNavbar from "../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";
export const CMSLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="p-4 md:p-12 md:mx-9 h-screen">
        <Outlet />
      </div>
    </>
  );
};

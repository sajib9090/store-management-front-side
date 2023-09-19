import { NavLink, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <>
      <div className="w-full h-[60px] bg-blue-400 flex justify-center items-center">
        {/* heading */}
        <div className="flex space-x-6 font-bold  cursor-pointer">
          <NavLink
            to={"check_accounts_activity"}
            className={({ isActive }) =>
              isActive ? "text-white underline" : ""
            }
          >
            Check accounts activity
          </NavLink>
          <NavLink
            to={"create_new_account"}
            className={({ isActive }) =>
              isActive ? "text-white underline" : ""
            }
          >
            Create new account
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Account;

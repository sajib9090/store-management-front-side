import { useEffect } from "react";
import TabsHeadline from "../../Components/TabsHeadline/TabsHeadline";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Store = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("welcome_to_store");
  }, [navigate]);
  return (
    <div className="bg-blue-100">
      <nav className="h-[70px] flex items-center justify-center space-x-2">
        <NavLink
          to={"add"}
          className={({ isActive }) =>
            isActive
              ? "border-2 flex items-center justify-center text-white bg-blue-400 border-blue-400 w-[130px] h-[40px] rounded"
              : "border-2 flex items-center justify-center bg-transparent text-blue-500 border-blue-400 w-[130px] h-[40px] rounded"
          }
        >
          <TabsHeadline headline="Add" />
        </NavLink>

        <NavLink
          to={"stock"}
          className={({ isActive }) =>
            isActive
              ? "border-2 flex items-center justify-center text-white bg-blue-400 border-blue-400 w-[130px] h-[40px] rounded"
              : "border-2 flex items-center justify-center bg-transparent text-blue-500 border-blue-400 w-[130px] h-[40px] rounded"
          }
        >
          <TabsHeadline headline="Stock" />
        </NavLink>

        <NavLink
          to={"sell"}
          className={({ isActive }) =>
            isActive
              ? "border-2 flex items-center justify-center text-white bg-blue-400 border-blue-400 w-[130px] h-[40px] rounded"
              : "border-2 flex items-center justify-center bg-transparent text-blue-500 border-blue-400 w-[130px] h-[40px] rounded"
          }
        >
          <TabsHeadline headline="Sell" />
        </NavLink>
      </nav>

      {/* content */}

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Store;

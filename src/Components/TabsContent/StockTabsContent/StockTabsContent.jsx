import { NavLink, Outlet } from "react-router-dom";

const StockTabsContent = () => {
  return (
    <div className="min-h-screen">
      <div className="text-center">
        <div className="flex items-center justify-center lg:h-12 space-x-4 py-4 bg-blue-400">
          <NavLink
            to={"find_stock_by_company"}
            className={({ isActive }) =>
              isActive
                ? "text-gray-100 font-bold underline"
                : "text-black font-bold"
            }
          >
            Find Stock by Company
          </NavLink>
        </div>
        {/* content */}

        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StockTabsContent;

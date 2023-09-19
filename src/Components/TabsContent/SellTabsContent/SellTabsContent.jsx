import { NavLink, Outlet } from "react-router-dom";

const SellTabsContent = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center lg:h-12 space-x-4 py-4 bg-blue-400">
        <NavLink
          to={"sell_history"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Sell History
        </NavLink>

        <NavLink
          to={"find_sold_invoice"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Find Sold Invoice
        </NavLink>
      </div>
      {/* content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SellTabsContent;

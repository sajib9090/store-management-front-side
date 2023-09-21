import { NavLink, Outlet } from "react-router-dom";

const PurchaseTabsContent = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center lg:h-12 space-x-4 py-4 bg-blue-400">
        <NavLink
          to={"purchase_history"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Purchase History
        </NavLink>
        <NavLink
          to={"find_purchase_invoice"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Find Purchase Invoice
        </NavLink>
      </div>
      {/* content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PurchaseTabsContent;

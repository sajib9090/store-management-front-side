import { NavLink, Outlet } from "react-router-dom";

const AddTabsContent = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center lg:h-12 space-x-4 py-4 bg-blue-400">
        <NavLink
          to={"add_products"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Add Products
        </NavLink>

        <NavLink
          to={"add_new_generic"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Add New Generic
        </NavLink>

        <NavLink
          to={"add_new_company"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Add New Company
        </NavLink>

        <NavLink
          to={"add_new_product"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Add New Product
        </NavLink>

        <NavLink
          to={"add_new_category"}
          className={({ isActive }) =>
            isActive
              ? "text-gray-100 font-bold cursor-pointer underline"
              : "text-black cursor-pointer font-bold"
          }
        >
          Add New Category
        </NavLink>
      </div>
      {/* content */}

      <div>
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AddTabsContent;

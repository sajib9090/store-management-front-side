import { GoHomeFill } from "react-icons/go";
import { BsCartPlusFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { FaStore, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../GlobalContext/AuthProvider";
import { useContext } from "react";
import { useUserContext } from "../../../GlobalContext/UserContext";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { singleUser } = useUserContext();

  return (
    <nav className="lg:sticky lg:top-0">
      <div className="h-screen w-[90px] bg-white hidden lg:flex border-r border-gray-300 flex-col justify-center space-y-8 px-2 relative">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-200 py-2 scale-125"
              : "hover:bg-gray-200 hover:scale-110 py-2 duration-500"
          }
        >
          <div title="Home">
            <GoHomeFill className="w-10 h-10 cursor-pointer mx-auto" />
          </div>
        </NavLink>
        <NavLink
          to={"/sell"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-200 py-2 scale-125"
              : "hover:bg-gray-200 hover:scale-110 py-2 duration-500"
          }
        >
          <div title="Sell" className="hover:bg-gray-200 py-2">
            <BsCartPlusFill className="w-10 h-10 cursor-pointer mx-auto" />
          </div>
        </NavLink>
        {singleUser && singleUser?.isAdmin ? (
          <>
            <NavLink
              to={"/store/add"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 py-2 scale-125"
                  : "hover:bg-gray-200 hover:scale-110 py-2 duration-500"
              }
            >
              <div title="Store" className="hover:bg-gray-200 py-2">
                <FaStore className="w-9 h-9 cursor-pointer mx-auto" />
              </div>
            </NavLink>

            <NavLink
              to={"/account"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 py-2 scale-125"
                  : "hover:bg-gray-200 hover:scale-110 py-2 duration-500"
              }
            >
              <div title="Account" className="hover:bg-gray-200 py-2">
                <MdAccountCircle className="w-10 h-10 cursor-pointer mx-auto" />
              </div>
            </NavLink>
          </>
        ) : (
          ""
        )}

        {user ? (
          <div title="Logout" className="absolute bottom-6">
            <p
              onClick={() => logOut()}
              className="cursor-pointer font-bold flex items-center"
            >
              Logout <FaSignOutAlt className="ml-1" />
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* small screen */}
      <div className="h-[80px] bg-white lg:hidden shadow-xl flex items-center justify-center space-x-6 relative">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-200 scale-110 py-1 px-2"
              : "hover:bg-gray-200 py-1 px-2 hover:scale-110 duration-500"
          }
        >
          <div title="Home">
            <GoHomeFill className="w-10 h-10 cursor-pointer mx-auto" />
          </div>
        </NavLink>
        <NavLink
          to={"/sell"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-200 scale-125 py-1 px-2"
              : "hover:bg-gray-200 py-1 px-2 hover:scale-110 duration-500"
          }
        >
          <div title="Sell">
            <BsCartPlusFill className="w-10 h-10 cursor-pointer mx-auto" />
          </div>
        </NavLink>
        {singleUser && singleUser?.isAdmin ? (
          <>
            <NavLink
              to={"/store/add"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 scale-125 py-1 px-2"
                  : "hover:bg-gray-200 py-1 px-2 hover:scale-110 duration-500"
              }
            >
              <div title="Store">
                <FaStore className="w-9 h-9 cursor-pointer mx-auto" />
              </div>
            </NavLink>
            <NavLink
              to={"/account"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 scale-125 py-1 px-2"
                  : "hover:bg-gray-200 py-1 px-2 hover:scale-110 duration-500"
              }
            >
              <div title="Account">
                <MdAccountCircle className="w-9 h-9 cursor-pointer mx-auto" />
              </div>
            </NavLink>
          </>
        ) : (
          ""
        )}
        {user ? (
          <div title="Logout" className="absolute right-4">
            <p
              onClick={() => logOut()}
              className="cursor-pointer font-bold flex items-center"
            >
              Logout <FaSignOutAlt className="ml-1" />
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;

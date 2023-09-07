import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div className="lg:flex max-w-[96rem] mx-auto">
      <div>
        <Navbar />
      </div>
      <div className="w-full">
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Main;


import Navbar from "./../Components/Navbar";
import { Outlet } from "react-router";


const Root = () => {

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-18 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

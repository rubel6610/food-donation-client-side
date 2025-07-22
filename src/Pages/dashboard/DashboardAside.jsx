import { FaSignOutAlt } from "react-icons/fa";
import UseAuth from "../../hooks/UseAuth";
import Logo from "../../Components/Logo";
import UseRole from "../../hooks/UseRole";
import AdminDashboard from "./RoleDashboard/AdminDashboard";
import CharityDashboard from "./RoleDashboard/CharityDashboard";
import UserDashboard from "./RoleDashboard/UserDashboard";
import RestaurantDashboard from "./RoleDashboard/RestaurantDashboard";

const DashboardAside = ({ isOpen, setIsOpen }) => {
  const { logout } = UseAuth();
  const { role, isRoleLoading } = UseRole();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <aside
      className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-br from-green-100 via-green-200 to-yellow-100 shadow-xl p-4  rounded-r-3xl flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 min-h-screen`}
    >
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end mb-2">
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold text-gray-600 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Logo + Title */}
      <div className="space-y-2 mb-2 text-center">
        <Logo />
        <h2 className="text-2xl font-bold text-green-700 font-serif">
          Dashboard
        </h2>
        <p className="text-gray-500 text-sm">Welcome to your control panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <ul className="flex flex-col">
          {!isRoleLoading && role === "user" && <UserDashboard setIsOpen={setIsOpen} />}
          {!isRoleLoading && role === "charity" && <CharityDashboard setIsOpen={setIsOpen} />}
          {!isRoleLoading && role === "admin" && <AdminDashboard setIsOpen={setIsOpen} />}
          {!isRoleLoading && role === "restaurant" && <RestaurantDashboard setIsOpen={setIsOpen} />}
       
        </ul>
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error w-full flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardAside;

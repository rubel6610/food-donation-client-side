import { Link } from "react-router";
import { MdFoodBank } from "react-icons/md"; // or any icon you prefer

const Logo = () => {
  return (
  <Link
      to="/"
      className="group flex justify-center px-4 items-center gap-2 text-2xl font-extrabold text-accent transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
    >
      <MdFoodBank
        className="text-green-500 group-hover:rotate-12 group-hover:text-lime-500 transition-transform duration-300"
        size={28}
      />
      <span className="hidden sm:inline bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:underline decoration-wavy underline-offset-4">
        FoodSave 
      </span>
    </Link>
  );
};

export default Logo;

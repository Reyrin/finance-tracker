import { FC } from "react";
import { FaClipboardList, FaSignOutAlt, FaTags } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/store";
import { logOut } from "../features/auth/authSlice";

interface NavLinkProps {
  isActive: boolean;
}

export const Header: FC = () => {
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
  };

  const setActiveStyle = ({ isActive }: NavLinkProps) =>
    `${isActive ? "text-white" : "text-white/50"} flex items-center gap-4 hover:text-grey-300`;

  return (
    <header className="relative bg-secondaryColor p-4 text-lg font-bold shadow-sm">
      <nav>
        <ul className="flex justify-center gap-20">
          <NavLink to="/transactions" className={setActiveStyle}>
            Transactions
            <FaClipboardList size={20} />
          </NavLink>
          <NavLink to="/categories" className={setActiveStyle}>
            Categories
            <FaTags size={20} />
          </NavLink>
        </ul>
      </nav>
      <button
        onClick={logOutHandler}
        className="absolute right-10 top-1/2 -translate-y-1/2"
      >
        <FaSignOutAlt
          size={20}
          className="transition-text duration-[0.2s] ease-[ease-in-out] hover:text-rose-400"
        />
      </button>
    </header>
  );
};

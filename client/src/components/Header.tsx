import { FC } from "react";
import { FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

interface NavLinkProps {
  isActive: boolean;
}

export const Header: FC = () => {
  const setActiveStyle = ({ isActive }: NavLinkProps) =>
    isActive ? "text-white" : "text-white/50";

  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 shadow-sm backdrop-blur-sm ">
      <Link to="/">
        <FaHome size={20} />
      </Link>
      <nav>
        <ul className="ml-auto mr-10 flex items-center gap-5">
          <li>
            <NavLink to="/" className={setActiveStyle}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions" className={setActiveStyle}>
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={setActiveStyle}>
              Categories
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

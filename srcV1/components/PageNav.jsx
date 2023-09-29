import { NavLink } from "react-router-dom";
import style from "../components/PageNav.module.css";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={style.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/"></NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={style.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

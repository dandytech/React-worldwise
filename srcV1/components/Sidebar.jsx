import { Outlet } from "react-router-dom";
import AppLayout from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppLayout />

      {/* Call the children Routes for use just like children components */}
      <Outlet />

      <Footer />
    </div>
  );
}

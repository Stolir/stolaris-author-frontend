import { NavLink } from "react-router";
import styles from "./SidebarItem.module.css";

function SidebarItem({ name, path, icon }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${styles.sidebarItem} ${isActive ? styles.active : ""}`
      }
    >
      {icon}
      <p className={styles.itemName}>{name}</p>
    </NavLink>
  );
}

export default SidebarItem;

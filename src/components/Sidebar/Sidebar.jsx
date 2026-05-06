import { Link, useNavigate } from "react-router";
import styles from "./Sidebar.module.css";
import SidebarItem from "../SidebarItem/SidebarItem";
import { Book, PagePlus, Settings } from "iconoir-react";
import CustomButton from "../CustomButton/CustomButton";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <Link to="/author/dashboard" className={`${styles.logo}`}>
        <p className={styles.mainText}>STOLARIS</p>
        <p className={styles.logoSubtext}>EDITORIAL WORKSPACE</p>
      </Link>
      <section className={styles.navItems}>
        <SidebarItem name={"Library"} icon={<Book />} path={"library"} />
        <SidebarItem name={"Settings"} icon={<Settings />} path={"settings"} />
      </section>
      <section className={styles.controls}>
        <CustomButton
          text={"New Article"}
          icon={<PagePlus />}
          onClick={() => navigate("/author/editor")}
        />
      </section>
    </aside>
  );
}

export default Sidebar;

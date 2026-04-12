import { Link, useNavigate } from "react-router";
import styles from "./Sidebar.module.css";
import SidebarItem from "../SidebarItem/SidebarItem";
import { Archive, Book, Settings } from "iconoir-react";
import CustomButton from "../CustomButton/CustomButton";
import ProfileWidget from "../ProfileWidget/ProfileWidget";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ setPageTitle }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <Link to="/author/dashboard" className={`${styles.logo}`}>
        <p>STOLARIS</p>
        <p className={styles.logoSubtext}>EDITORIAL WORKSPACE</p>
      </Link>
      <section className={styles.navItems}>
        <SidebarItem name={"Library"} icon={<Book />} path={"library"} />
        <SidebarItem name={"Archive"} icon={<Archive />} path={"archive"} />
        <SidebarItem name={"Settings"} icon={<Settings />} path={"settings"} />
      </section>
      <section className={styles.controls}>
        <CustomButton
          text={"Write New Article"}
          onClick={() => navigate("/author/editor")}
        />
        {/* <ProfileWidget user={user} /> */}
      </section>
    </aside>
  );
}

export default Sidebar;

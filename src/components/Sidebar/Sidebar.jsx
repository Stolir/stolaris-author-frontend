import { Link, useNavigate } from "react-router";
import styles from "./Sidebar.module.css";
import SidebarItem from "../SidebarItem/SidebarItem";
import { Archive, Book, Settings } from "iconoir-react";
import CustomButton from "../CustomButton/CustomButton";
import ProfileWidget from "../ProfileWidget/ProfileWidget";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={`${styles.logo}`}>
        <p>STOLARIS</p>
        <p className={styles.logoSubtext}>EDITORIAL WORKSPACE</p>
      </Link>
      <section className={styles.navItems}>
        <SidebarItem
          name={"Library"}
          icon={<Book />}
          path={"/author/dashboard"}
        />
        <SidebarItem
          name={"Archive"}
          icon={<Archive />}
          path={"/author/dashboard/archive"}
        />
        <SidebarItem
          name={"Settings"}
          icon={<Settings />}
          path={"/author/dashboard/settings"}
        />
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

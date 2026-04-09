import { ProfileCircle } from "iconoir-react";
import styles from "./ProfileWidget.module.css";
import { Link } from "react-router";

function ProfileWidget({ user }) {
  return (
    <Link to="/author/profile" className={styles.profileWidget}>
      <ProfileCircle width={35} height={35} />
      <div className={styles.userInfo}>
        <p className={styles.username}>{user.name}</p>
        <p className={styles.accountType}>Author</p>
      </div>
    </Link>
  );
}

export default ProfileWidget;

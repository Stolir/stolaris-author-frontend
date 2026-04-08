import { ProfileCircle } from "iconoir-react";
import styles from "./ProfileWidget.module.css";
import { Link } from "react-router";

function ProfileWidget({ user }) {
  return (
    <div className={styles.profileWidget}>
      <ProfileCircle width={35} height={35} />
      <div className={styles.userInfo}>
        <Link to="/author/profile" className={styles.username}>
          {user.name}
        </Link>
        <p className={styles.accountType}>Author</p>
      </div>
    </div>
  );
}

export default ProfileWidget;

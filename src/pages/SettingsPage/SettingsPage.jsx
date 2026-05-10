import { useAuth } from "@/context/AuthContext";
import styles from "./SettingsPage.module.css";
import { useEffect, useState } from "react";
import FormInput from "@/components/FormInput/FormInput";
import AlertBox from "@/components/AlertBox/AlertBox";
import FormButton from "@/components/FormButton/FormButton";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import SuccessBox from "@/components/SuccessBox/SuccessBox";

function SettingsPage() {
  const { user, login } = useAuth();
  const [userInfo, setUserInfo] = useState(user);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [usernameStatus, setUsernameStatus] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [changePassword, setChangePassword] = useState(false);

  function toggleChangePassword() {
    if (isEditing) {
      setChangePassword(!changePassword);
    } else {
      setChangePassword(false);
    }
  }

  function toggleEditing(e = null, newUser = null) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (isEditing) {
      setIsEditing(false);
      setChangePassword(false);
      setUserInfo(newUser || user);
      setUsernameStatus(null);
      setFieldErrors({});
      setError(null);
    } else {
      setIsEditing(true);
    }
  }

  async function checkUsername(username) {
    setUsernameStatus(null);
    setFieldErrors({});
    if (username === user.username) {
      return;
    }
    try {
      const response = await fetch("/api/user/username-attempt", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const mappedErrors = {};
          data.errors.forEach((err) => {
            mappedErrors[err.path] = err.msg;
          });
          setFieldErrors(mappedErrors);
        } else {
          setError(data.message);
        }
        return;
      }
      if (data.available) {
        setUsernameStatus(true);
      } else {
        setUsernameStatus(false);
      }
    } catch (err) {
      setError(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    const formData = new FormData(e.target);
    try {
      const response = await fetch("/auth/me", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          name: formData.get("name"),
          email: formData.get("email"),
          newPassword: formData.get("newPassword"),
          confirmNewPassword: formData.get("confirmNewPassword"),
          currentPassword: formData.get("currentPassword"),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const mappedErrors = {};
          data.errors.forEach((err) => {
            mappedErrors[err.path] = err.msg;
          });
          setFieldErrors(mappedErrors);
        } else {
          setError(data.message);
        }
        return;
      }
      // Display success message
      setSuccess("Profile saved");
      login(data.user);
      setUserInfo(data.user);
      toggleEditing(e, data.user);
    } catch {
      setError("An error occurred. Please try again.");
    }
  }

  if (!userInfo) return <LoadingSpinner />;

  return (
    <>
      {success && (
        <SuccessBox onClose={() => setSuccess(null)}>{success}</SuccessBox>
      )}
      <div className={styles.settingsContainer}>
        {error && <AlertBox onClose={() => setError(null)}>{error}</AlertBox>}
        <p>Configuration</p>
        <section className={styles.topBar}>
          <h1>Author Settings</h1>
        </section>
        <section className={styles.settingsControls}>
          <form className={styles.settingsForm} onSubmit={handleSubmit}>
            <FormInput
              type="text"
              id="name"
              name="name"
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, name: e.target.value }))
              }
              label={"Name"}
              value={userInfo.name}
              error={fieldErrors.name}
              disabled={!isEditing}
            />
            <div className={styles.usernameField}>
              <FormInput
                type="text"
                id="username"
                name="username"
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, username: e.target.value }))
                }
                onBlur={(e) => checkUsername(e.target.value)}
                label={"Username"}
                value={userInfo.username}
                error={fieldErrors.username}
                disabled={!isEditing}
              />
              {usernameStatus === true && (
                <span className={styles.usernameSuccess}>
                  Username Available!
                </span>
              )}
              {usernameStatus === false && (
                <span className={styles.usernameFail}>
                  Username Not Available.
                </span>
              )}
            </div>
            <FormInput
              type="text"
              id="email"
              name="email"
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              label={"Email"}
              value={userInfo.email}
              error={fieldErrors.email}
              disabled={!isEditing}
            />
            <div className={styles.passwordWrapper}>
              {changePassword && (
                <>
                  <FormInput
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    value={userInfo.newPassword || ""}
                    label={"New Password"}
                    error={fieldErrors.newPassword}
                  />
                  <FormInput
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        confirmNewPassword: e.target.value,
                      }))
                    }
                    value={userInfo.confirmNewPassword || ""}
                    label={"Confirm New Password"}
                    error={fieldErrors.confirmNewPassword}
                  />
                </>
              )}
              <button
                className={styles.changePassword}
                type="button"
                disabled={!isEditing}
                onClick={() => {
                  toggleChangePassword();
                }}
              >
                {!changePassword ? "Change password" : "Cancel"}
              </button>
            </div>
            {(changePassword || userInfo.email !== user.email) && (
              <FormInput
                type="password"
                id="currentPassword"
                name="currentPassword"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                value={userInfo.currentPassword || ""}
                label={"Current Password"}
                error={fieldErrors.currentPassword}
              />
            )}
            <div className={styles.buttonContainer}>
              {isEditing ? (
                <>
                  <FormButton type="submit">Save</FormButton>
                  <FormButton type="button" onClick={toggleEditing}>
                    Cancel
                  </FormButton>
                </>
              ) : (
                <FormButton type="button" onClick={(e) => toggleEditing(e)}>
                  Edit
                </FormButton>
              )}
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default SettingsPage;

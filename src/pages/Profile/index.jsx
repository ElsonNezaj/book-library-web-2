import React, { useState } from "react";
import styles from "./styles.module.scss";
import Header from "../../Components/Header/Header";
import { useAuth } from "../../AuthContext";
import profile from "../../Images/profileIcon.png";
import logoutIcon from "../../Images/logout.png";
import Favorites from "../../Components/Favorites/Favorites";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [mouseEnter, setMouseEnter] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const fullDateLastSignIn =
    currentUser.metadata.lastSignInTime.split(" ")[0] +
    " " +
    currentUser.metadata.lastSignInTime.split(" ")[1] +
    " " +
    currentUser.metadata.lastSignInTime.split(" ")[2] +
    " " +
    currentUser.metadata.lastSignInTime.split(" ")[3];

  const handleMouseMovement = (state) => {
    setMouseEnter(state);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <Header />
      <div className={styles.profileBody}>
        <div className={styles.profileIconContainer}>
          <div
            onClick={() => mouseEnter && handleLogout}
            className={styles.icon}
          >
            {mouseEnter ? (
              <img
                src={logoutIcon}
                alt="logout icon"
                onClick={handleLogout}
                onMouseLeave={() => handleMouseMovement(false)}
                className={[styles.profileIcon, styles.logout].join(" ")}
              />
            ) : (
              <img
                src={profile}
                alt="profile icon"
                onMouseEnter={() => handleMouseMovement(true)}
                className={styles.profileIcon}
              />
            )}
          </div>

          <p className={styles.displayNameLabel}>
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email.split("@")[0]}
          </p>
        </div>
        <div className={styles.extraInfoContainer}>
          <p className={styles.label}>
            E-mail : <span>{currentUser.email}</span>
          </p>
          <p className={styles.label}>
            Phone Number :{" "}
            <span>
              {currentUser.phoneNumber
                ? currentUser.phoneNumber
                : "Not Applied"}
            </span>
          </p>

          <p className={styles.label}>
            Last Logged In : <span>{fullDateLastSignIn}</span>
          </p>
          {/* <p>{currentUser.email}</p> */}
        </div>

        <div className={styles.favoritesContainer}>
          <Favorites noNavbar={true} />
        </div>
      </div>
    </div>
  );
}

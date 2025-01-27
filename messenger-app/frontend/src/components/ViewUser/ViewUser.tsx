import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/usersApi";
import Profile from "../../assets/profile.svg";
import { API_URL } from "../../configs/configs";
import { EditModeProps } from "../../types/userTypes";
import classes from "./viewUser.module.css";

function ViewUser({ setEditMode }: EditModeProps) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    profilePic: "",
  });
  useEffect(() => {
    getCurrentUser()
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="modal-body">
        <img
          src={
            userInfo.profilePic
              ? `${API_URL}/uploads/${userInfo.profilePic}`
              : Profile
          }
          className="profile-img"
        />

        <div>
          <p className={classes.name}>
            {userInfo.firstName} {userInfo.lastName}
          </p>
          <p className={classes.username}>{userInfo.username}</p>
        </div>
      </div>

      <div>
        <p className={classes.bio}>Bio</p>
        <p>{userInfo.bio}</p>
      </div>
      <div className={classes.btnContainer}>
        <button
          className={`blue-button ${classes.edit}`}
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default ViewUser;

import Profile from "../../assets/profile.svg";
import classes from "./viewUser.module.css";

function ViewUser({ setEditMode }: { setEditMode: (arg0: boolean) => void }) {
  return (
    <div>
      <div className="modal-body">
        <img src={Profile} className="profile-img" />

        <div>
          <p className={classes.name}>FirstName LastName</p>
          <p className={classes.username}>username</p>
        </div>
      </div>

      <div>
        <p className={classes.bio}>Bio</p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa.
        </p>
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

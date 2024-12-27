import Profile from "../../assets/profile.svg";
import classes from "./editUser.module.css";

function EditUser({ setEditMode }: { setEditMode: (arg0: boolean) => void }) {
  function handleCancel() {
    setEditMode(false);
  }
  return (
    <div>
      <div className="modal-body">
        <img src={Profile} className="profile-img" />

        <div className={classes.uploadBtnContainer}>
          <button className="blue-button">Change picture</button>
          <button className="outline-button">Delete picture</button>
        </div>
      </div>

      <form className={classes.modalForm}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder={"Enter your First Name"}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder={"Enter your Last Name"}
        />
        <label htmlFor="bio">Bio</label>
        <textarea name="bio" id="bio" placeholder={"Enter your Bio"} />
      </form>

      <div className="flex-space-between">
        <button className="outline-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="blue-button">Save</button>
      </div>
    </div>
  );
}

export default EditUser;

import { useState } from "react";
import EditUser from "../EditUser/EditUser";
import ViewUser from "../ViewUser/ViewUser";
import Modal from "../Modal/Modal";
import Close from "../../assets/close.svg";
import classes from "./userInfo.module.css";

function UserInfo() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Profile</button>
      <Modal open={modalIsOpen}>
        <div>
          <div className="flex-space-between">
            <h1 className={classes.h1}>User Info</h1>
            <img
              className={classes.btn}
              src={Close}
              onClick={() => setIsOpen(false)}
            />
          </div>
          {editMode ? (
            <EditUser setEditMode={setEditMode} />
          ) : (
            <ViewUser setEditMode={setEditMode} />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default UserInfo;

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  deleteProfilePic,
  getCurrentUser,
  updateUserInfo,
  uploadProfilePic,
} from "../../api/usersApi";
import { API_URL } from "../../configs/configs";
import { EditModeProps, User } from "../../types/userTypes";
import Profile from "../../assets/profile.svg";
import classes from "./editUser.module.css";

function EditUser({ setEditMode }: EditModeProps) {
  const [currentUser, setCurrentUser] = useState("");
  const [oldPic, setOldPic] = useState("");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");
  const [sizeErr, setSizeErr] = useState("");
  const maxSize = 5 * 1024 * 1024; // 5MB

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<User>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      if (file) {
        await uploadProfilePic(currentUser, file, oldPic);
      }
      if (preview === "" && oldPic !== "") {
        await deleteProfilePic(currentUser, oldPic);
      }
      await updateUserInfo(currentUser, data);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile changes", error);
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        const { username, firstName, lastName, bio, profilePic } = res.data;
        setCurrentUser(username);
        reset({ firstName, lastName, bio });
        if (profilePic) {
          setOldPic(profilePic);
          setPreview(`${API_URL}/uploads/${profilePic}`);
        }
      })
      .catch((err) => console.error(err));
  }, [reset]);

  function handleCancel() {
    setEditMode(false);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/"))
        setSizeErr("Only image files are allowed!");
      else if (file.size > maxSize) setSizeErr("File size exceeds 5MB limit.");
      else {
        setSizeErr("");
        setFile(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  }

  return (
    <div>
      <div className="modal-body">
        <img src={preview || Profile} className="profile-img" />

        <div className={classes.uploadBtnContainer}>
          <label
            htmlFor="file-upload"
            className={`blue-button ${classes.uploadBtn}`}
          >
            Change picture
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <button className="outline-button" onClick={() => setPreview("")}>
            Remove picture
          </button>
        </div>
      </div>
      <p className={classes.error}>{sizeErr}</p>
      <form className={classes.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          placeholder={"Enter your First Name"}
          {...register("firstName", { required: true, maxLength: 20 })}
        />
        {errors["firstName"]?.type === "required" && (
          <p className={classes.error}>First Name is required</p>
        )}
        {errors["firstName"]?.type === "maxLength" && (
          <p className={classes.error}>Limit of 20 characters is exceeded</p>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder={"Enter your Last Name"}
          {...register("lastName", { required: true, maxLength: 20 })}
        />
        {errors["lastName"]?.type === "required" && (
          <p className={classes.error}>Last Name is required</p>
        )}
        {errors["lastName"]?.type === "maxLength" && (
          <p className={classes.error}>Limit of 20 characters is exceeded</p>
        )}

        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          placeholder={"Enter your Bio"}
          {...register("bio", { maxLength: 100 })}
        />
        {errors["bio"]?.type === "maxLength" && (
          <p className={classes.error}>Limit of 100 characters is exceeded</p>
        )}
        <div className="flex-space-between">
          <button className="outline-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="blue-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;

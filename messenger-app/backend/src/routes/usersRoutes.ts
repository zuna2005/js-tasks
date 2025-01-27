import multer from "multer";
import { router, USERNAME_COOKIE_NAME } from "../configs/configs";
import { upload, deletePhoto } from "../helpers/photoHandlers";
import { getUser } from "../helpers/userHelpers";
import { updateUserInfo } from "../services/userService";

router.post("/getUser", async (req, res) => getUser(req.body.username, res));

router.get("/getCurrentUser", async (req, res) =>
  getUser(req.cookies[USERNAME_COOKIE_NAME], res),
);

router.post("/update", async (req, res) => {
  const { username, formData } = req.body;
  try {
    const user = await updateUserInfo(username, formData);
    if (user) res.status(200).send("User info updated");
    else {
      res.status(400).send("Invalid username");
    }
  } catch (error) {
    console.error("Error while updating user info:", error);
  }
});

router.post(
  "/uploadProfilePic",
  (req, res, next) => {
    upload.single("profilePic")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send(`Multer error: ${err.message}`);
      } else if (err) {
        return res.status(500).send(`Server error: ${err.message}`);
      }
      next();
    });
  },
  async (req, res) => {
    const { username, oldPic } = req.body;
    if (!req.file) {
      res.status(400).send("No file uploaded");
    } else {
      try {
        console.log(`we save this file ${req.file?.filename} for ${username}`);
        const user = await updateUserInfo(username, {
          profilePic: req.file?.filename,
        });
        if (user) {
          res.status(200).send("User profile pic updated");
          if (oldPic) deletePhoto(oldPic);
        } else {
          res.status(400).send("Invalid username");
        }
      } catch (error) {
        console.error("Error while updloading profile pic:", error);
      }
    }
  },
);

router.post("/deleteProfilePic", async (req, res) => {
  const { username, filename } = req.body;
  try {
    const user = await updateUserInfo(username, { profilePic: "" });
    if (user) {
      res.status(200).send("User profile pic deleted");
      deletePhoto(filename);
    } else {
      res.status(400).send("Invalid username");
    }
  } catch (error) {
    console.error("Error while deleting profile pic:", error);
    res.status(500).send(`Failed to delete profile picture: ${error}`);
  }
});

export default router;

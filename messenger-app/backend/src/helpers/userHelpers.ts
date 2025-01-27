import { Response } from "express";
import { getUserByUsername } from "../services/userService";

export async function getUser(username: string, res: Response) {
  try {
    const user = await getUserByUsername(username);
    if (user) {
      res.status(200).send({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        profilePic: user.profilePic || "",
      });
    } else {
      res.status(400).send("Invalid username");
    }
  } catch (error) {
    console.error("Error while getting user:", error);
  }
}

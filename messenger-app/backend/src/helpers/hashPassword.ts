import bcrypt from "bcrypt";
import { HASH_SALT_ROUNDS } from "../configs/configs";

export function hashPassword(password: string) {
  return bcrypt.hash(password, HASH_SALT_ROUNDS);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

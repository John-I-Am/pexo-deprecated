import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserCredentials } from "types";
import User from "../models/user";

const authUser = async (userToAuth: UserCredentials): Promise<false | object> => {
  const user: User | null = await User.findOne({
    where: { email: userToAuth.email },
    attributes: {
      include: ["passwordHash"],
    },
  });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(userToAuth.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return false;
  }

  if (user.disabled) {
    return false;
  }

  const userToken = {
    userId: user.id,
  };

  const token: string = jwt.sign(userToken, process.env.SECRET as string, { expiresIn: "6h" });

  return {
    token,
    userId: user.id,
  };
};

export default { authUser };

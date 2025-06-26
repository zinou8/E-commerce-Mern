import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RregisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RregisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User already exists!", statusCode: 400 };
  }

  const hashedPassowrd = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    email,
    password: hashedPassowrd,
    firstName,
    lastName,
  });
  await newUser.save();

  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface LoginParamas {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParamas) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "incorrect email or password !", statusCode: 400 };
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return {
      data: generateJWT({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      }),
      statusCode: 200,
    };
  }
  return { data: "incorrect email or password !", statusCode: 400 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "fdfknfkgngnejrngkenrk");
};

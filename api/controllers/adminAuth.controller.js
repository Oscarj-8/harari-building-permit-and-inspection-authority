import Admin from "../models/admin.model.js";
import bycryptjs from "bycryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, passowrd } = req.body;

  const hashedPassword = bycryptjs.hashSync(passowrd, 10);

  const newAdmin = new Admin({ username, email, passowrd: hashedPassword });

  try {
    await newAdmin.save();
    res.status(201).json("Admin created successfully");
  } catch (error) {
    next(error);
  }
};

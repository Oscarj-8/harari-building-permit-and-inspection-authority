import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateAdmin = async (req, res, next) => {
  if (req.admin.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedAdmin._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  if (req.admin.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));

  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("Admin has been deleted");
  } catch (error) {
    next(error);
  }
};

import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  signOutStart,
  signOutFailure,
  signOutSuccess,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ReusableModal from "../ReusableModal";

export default function UserProfile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [userUpdated, setUserUpdated] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const handleSignOutClose = () => setSignOutOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch(`/api/user-auth/user-signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(error.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUserUpdated(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          className="rounded-full w-24 
          self-center
          mt-2
          hover:cursor-pointer
          "
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="profile"
        />
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg placeholder:text-slate-700"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg placeholder:text-slate-700"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg placeholder:text-slate-700"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 
        p-3
        rounded-lg
        uppercase
        text-white
        hover:opacity-90
        disabled:opacity-80
        "
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={() => setDeleteOpen(true)}
        >
          Delete account
        </span>
        <span
          onClick={() => setSignOutOpen(true)}
          className="text-red-700 cursor-pointer"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 text-center">{error ? error : ""}</p>
      <p className="text-green-700 text-center">
        {userUpdated ? "User is updated successfully" : ""}
      </p>
      <ReusableModal open={deleteOpen} onClose={handleDeleteClose}>
        <div className="min-w-[300px] max-w-[500px]">
          <Typography
            className="text-slate-900 text-xl text-center flex flex-col m-0"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Are you sure you want to delete this account?
            <span className="text-sm text-red-700">
              * Please note that deleting your account is a permanent action and
              cannot be undone.
            </span>
          </Typography>
          <div className="flex flex-col md:flex-row md:gap-8">
            <Button
              variant="contained"
              className="w-full bg-red-700 mt-6 hover:bg-red-900"
              onClick={handleDeleteUser}
            >
              DELETE
            </Button>
            <Button
              variant="contained"
              className="w-full bg-blue-700 mt-6"
              onClick={() => setDeleteOpen(false)}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </ReusableModal>
      <ReusableModal open={signOutOpen} onClose={handleSignOutClose}>
        <div className="w-[300px] md:w-auto">
          <Typography
            className="text-slate-900 text-lg text-center w-full m-0"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Are you sure you want to sign out?
          </Typography>
          <div className="flex flex-col justify-center md:flex-row md:gap-8 items-center">
            <Button
              variant="contained"
              className="w-full bg-red-700 mt-6 hover:bg-red-900"
              onClick={handleSignOut}
            >
              SIGN OUT
            </Button>
            <Button
              variant="contained"
              className="w-full bg-blue-700 mt-6"
              onClick={() => setSignOutOpen(false)}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </ReusableModal>
    </div>
  );
}

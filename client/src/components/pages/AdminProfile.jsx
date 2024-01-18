import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  signOutStart,
  signOutFailure,
  signOutSuccess,
  updateAdminFailure,
  updateAdminSuccess,
  updateAdminStart,
  deleteAdminStart,
  deleteAdminFailure,
  deleteAdminSuccess,
} from "../../redux/admin/adminSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ReusableModal from "../ReusableModal";

export default function AdminProfile() {
  const { currentAdmin, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [adminInfo, setAdminInfo] = useState({});
  const [adminUpdated, setAdminUpdated] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const handleSignOutClose = () => setSignOutOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.id]: e.target.value });
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteAdminStart());
      const res = await fetch(`/api/admin/delete/${currentAdmin._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteAdminFailure(data.message));
        return;
      }
      dispatch(deleteAdminSuccess(data));
    } catch (error) {
      dispatch(deleteAdminFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(error.message));
        return;
      }
      dispatch(signOutSuccess(data));
      // navigate("/sign-in");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateAdminStart());
      const res = await fetch(`/api/admin/update/${currentAdmin._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminInfo),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateAdminFailure(data.message));
        return;
      }

      dispatch(updateAdminSuccess(data));
      setAdminUpdated(true);
    } catch (error) {
      dispatch(updateAdminFailure(error.message));
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
          src="https://cdn-icons-png.flaticon.com/512/560/560199.png"
        />
        <input
          type="text"
          defaultValue={currentAdmin.username}
          placeholder="username"
          className="border p-3 rounded-lg placeholder:text-slate-700"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentAdmin.email}
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
        {adminUpdated ? "Admin is updated successfully" : ""}
      </p>
      <ReusableModal open={deleteOpen} onClose={handleDeleteClose}>
        <div className="min-w-[300px] max-w-[500px]">
          <Typography
            className="text-slate-900 text-xl text-center flex flex-col"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Are you sure you want to delete this admin account?
            <span className="text-sm text-red-700">
              * Please note that deleting your account is a permanent action and
              cannot be undone.
            </span>
          </Typography>
          <div className="flex flex-col md:flex-row md:gap-8">
            <Button
              variant="contained"
              className="w-full bg-red-700 mt-6"
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
      <ReusableModal
        className="bg-red-500 w-full"
        open={signOutOpen}
        onClose={handleSignOutClose}
      >
        <div className="w-[300px] md:w-auto">
          <Typography
            className="text-slate-900 text-lg text-center w-full"
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

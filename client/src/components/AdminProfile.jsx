import { useSelector } from "react-redux";
import {
  signOutStart,
  signOutFailure,
  signOutSuccess,
  updateAdminFailure,
  updateAdminSuccess,
  updateAdminStart,
} from "../redux/admin/adminSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function AdminProfile() {
  const { currentAdmin, loading, error } = useSelector((state) => state.admin);
  console.log(currentAdmin._id);
  const dispatch = useDispatch();
  const [adminInfo, setAdminInfo] = useState({});
  const [adminUpdated, setAdminUpdated] = useState(false);

  const handleChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.id]: e.target.value });
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
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 text-center">{error ? error : ""}</p>
      <p className="text-green-700 text-center">
        {adminUpdated ? "User is updated successfully" : ""}
      </p>
    </div>
  );
}

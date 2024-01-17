import { useSelector } from "react-redux";
import {
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from "../redux/admin/adminSlice.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentAdmin, loading, error } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full w-24 
          self-center
          mt-2
          hover:cursor-pointer
          "
          src={currentAdmin.avatar}
        />
        <input
          type="text"
          defaultValue={currentAdmin.username}
          placeholder="username"
          className="border p-3 rounded-lg placeholder:text-slate-700"
          id="username"
        />
        <input
          type="email"
          defaultValue={currentAdmin.email}
          placeholder="email"
          className="border p-3 rounded-lg placeholder:text-slate-700"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg placeholder:text-slate-700"
          id="password"
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
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-90
        "
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
    </div>
  );
}

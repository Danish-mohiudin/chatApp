import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountThunk } from "../../store/slice/user/userThunk";
import { logout } from "../../store/slice/user/userSlice";
// import { logout } from "../store/slice/user/userSlice";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.userReducer);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Dispatch the delete thunk
      dispatch(deleteAccountThunk()).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          // Clear Redux state immediately
          dispatch(logout());
          // Navigate to login page instantly
          navigate("/login", { replace: true });
        }
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}


export default DeleteAccount;
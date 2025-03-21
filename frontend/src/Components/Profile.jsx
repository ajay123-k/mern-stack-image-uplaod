import React, { useEffect, useState } from "react";
import Navbar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/Slice/userSlice";
import { clearToken } from "../Redux/Slice/tokenSlice";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "easyUplaod | Profile";
    setUserDetails(user);
  }, []);

  const logout = () => {
    dispatch(logoutUser());
    dispatch(clearToken());
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <h2 className="">Profile</h2>
          <p className="text-muted">
            View your profile details,you can logout from here.
          </p>
          <div className="col-lg-5 offset-lg-4">
            <div className="card shadow-sm ">
              <div className="card-body">
                {userDetails ? (
                  <div className="text-center">
                    <img
                      src="./avatar.jpg"
                      alt="User Avatar"
                      className="rounded-circle mb-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <h5>{userDetails?.name}</h5>
                    <p className="text-muted">
                      {" "}
                      <i className="fa fa-envelope text-warning"></i>{" "}
                      {userDetails?.email}
                    </p>
                    <p>
                      {" "}
                      <i className="fa fa-phone text-success"></i>{" "}
                      {userDetails?.phone}
                    </p>
                    <div className="d-grid">
                      <button className="btn btn-danger mt-3" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center">Loading user details...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

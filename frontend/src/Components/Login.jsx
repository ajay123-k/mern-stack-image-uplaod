import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;
import { setUser } from "../Redux/Slice/userSlice";
import { setToken } from "../Redux/Slice/tokenSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "easyUplaod | Login";
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPwd(!showPwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      handleError("Enter valid Email and Password", "error");
      return;
    }

    const { data } = await axios.post(`${serverURL}/users/login`, formData);
    const status = data.status;
    if (status.code === -1) {
      handleError(status.message, "error");
      return;
    }
    handleError(status.message, "success");
    setTimeout(() => {
      // localStorage.setItem("token", data.token);
      // login(data.user, data.token);
      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
      navigate("/image-gallery");
    }, 3000);
  };

  const handleError = (message, messageType) => {
    setShowMsg(true);
    setMsg(message);
    setMsgType(messageType);
    setTimeout(() => {
      setShowMsg(false);
      setMsg("");
      setMsgType("");
    }, 3000);
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-5 mt-5">
            <div className="card p-4 shadow mt-5">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type={!showPwd ? "password" : "text"}
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      autoComplete="off"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePassword}
                    >
                      <i
                        className={!showPwd ? "fa fa-eye-slash" : "fa fa-eye"}
                      ></i>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                <div className="my-2 text-center">
                  Don't have an account yet ?{" "}
                  <Link to={"/register"}>Register</Link>
                </div>
                {showMsg && (
                  <div
                    className={`my-2 p-2 fw-bold text-center border ${
                      msgType === "error"
                        ? "text-danger border-danger"
                        : "text-success border-success"
                    }`}
                  >
                    {msg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

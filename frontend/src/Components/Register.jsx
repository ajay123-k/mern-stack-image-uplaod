import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    document.title = "easyUplaod | Register";
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPwd(!showPwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in formData) {
      if (formData[key] === "") {
        handleError("All fields are Required", "error");
        return;
      }
    }

    const { data } = await axios.post(`${serverURL}/users/register`, formData);
    const status = data.status;

    if (status.code === -1) {
      handleError(status.message, "error");
      setFormData({
        email: "",
        fullName: "",
        password: "",
        phone: "",
      });
      return;
    }
    handleError(status.message, "success");

    setTimeout(() => {
      navigate("/");
    }, 4000);
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 mt-4">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                </div>
              </div>

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
                <label className="form-label">Phone</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
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
                Register
              </button>
              <div className="my-2 text-center">
                Already have an account ?<Link to={"/"}>Login</Link>
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
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
const serverURL = import.meta.env.VITE_SERVER_URL;

const FileUpload = () => {
  const token = useSelector((state) => state.token);
  const [file, setFile] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    document.title = "easyUplaod | Upload File";
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(`${serverURL}/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      });

      const status = data.status;
      if (status.code === -1) {
        handleError(status.message, "error");
        return;
      }
      handleError(status.message, "success");
    } catch (error) {
      console.error("Upload error:", error);
    }
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
      <Sidebar />
      <div className="container my-5">
        <div className="row">
          <h2 className="">Uplaod </h2>
          <p className="text-muted">
            Quickly upload your images with a simple and intuitive interface.
            Select a file, upload it instantly, and keep your gallery updated
            with ease.
          </p>
          <div className="col-lg-5 offset-lg-4 my-4">
            <div className="card ">
              <div className="card-body">
                <h5 className="fw-bold mb-4">Upload File</h5>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleUpload}
                  disabled={!file}
                >
                  Upload
                </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;

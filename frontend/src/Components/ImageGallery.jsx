import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
const serverURL = import.meta.env.VITE_SERVER_URL;

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(true);
  const [downloadLink, setDownloadLinks] = useState({});
  const [copiedLinks, setCopiedLinks] = useState({});
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  useEffect(() => {
    fetchFiles(currentPage);
    document.title = "easyUplaod | Gallery";
  }, [currentPage]);

  const fetchFiles = async (pageNo) => {
    try {
      const { data } = await axios.get(`${serverURL}/file/${pageNo}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setImages(data.files);
      setTotalImages(data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setCurrentPage(newPage);
  };

  function extractName(filename) {
    return filename.substring(0, filename.lastIndexOf("_"));
  }

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLinks((prevState) => ({ ...prevState, [url]: true }));

    setTimeout(() => {
      setCopiedLinks((prevState) => ({ ...prevState, [url]: false }));
    }, 3000);
  };

  const handleDownload = async (url, filename) => {
    setDownloadLinks((prevState) => ({ ...prevState, [url]: true }));
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setDownloadLinks((prevState) => ({ ...prevState, [url]: false }));
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const { data } = await axios.patch(
        `${serverURL}/file/delete`,
        { id: id },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      let status = data.status;
      alert(status.message);
      setLoading(true);
      setTimeout(() => {
        fetchFiles(1);
      }, 2000);
    } catch (error) {
      alert("Failed to delete the image.");
      fetchFiles(1);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="d-flex">
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-12 ">
              <h2 className="text-start">Gallery</h2>
              <p className="text-muted">
                Your uploaded images are displayed here in a clean and organized
                layout. Easily browse, view, and manage your images for a
                seamless experience.
              </p>
              {loading ? (
                <div className="d-flex justify-content-center my-5">
                  <ClipLoader color="#007bff" size={50} />
                </div>
              ) : (
                <>
                  <div className="row g-4">
                    {images.length > 0 ? (
                      images.map((image, index) => (
                        <div key={index} className="col-lg-4 col-md-6 d-flex">
                          <div className="card shadow-sm w-100">
                            <img
                              src={image.url}
                              className="card-img-top"
                              alt="Uploaded"
                              style={{
                                height: "220px",
                                objectFit: "cover",
                                borderTopLeftRadius: "5px",
                                borderTopRightRadius: "5px",
                              }}
                            />
                            <div className="card-body d-flex flex-column">
                              <h6 className="text-truncate text-center mb-2">
                                {extractName(image.name)}
                              </h6>

                              <p className="small text-muted text-center mb-3">
                                Uploaded at:
                                {new Date(image.uploaded_at).toLocaleString()}
                              </p>

                              <div className="d-flex justify-content-between">
                                <button
                                  className="btn btn-sm btn-success w-50 me-1"
                                  onClick={() =>
                                    handleDownload(image.url, image.name)
                                  }
                                >
                                  <i className="fa fa-download"></i>{" "}
                                  {downloadLink[image.url]
                                    ? "Downloading..."
                                    : "Download"}
                                </button>
                                <button
                                  className="btn btn-sm btn-secondary w-50 ms-1"
                                  onClick={() => handleCopy(image.url)}
                                >
                                  <i className="fa fa-copy"></i>{" "}
                                  {copiedLinks[image.url]
                                    ? "Copied"
                                    : "Copy Link"}
                                </button>
                              </div>
                              <div className="text-center mt-3">
                                <button
                                  className="btn btn-sm btn-danger w-100"
                                  onClick={() => handleDelete(image.id)}
                                >
                                  <i className="fa fa-trash"></i> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No images uploaded yet.</p>
                    )}
                  </div>
                  {images.length > 0 && (
                    <>
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(totalImages / imagesPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={
                          "pagination justify-content-center my-4"
                        }
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;

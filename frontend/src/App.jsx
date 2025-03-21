import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClipLoader } from "react-spinners";

const Register = lazy(() => import("./Components/Register"));
const Login = lazy(() => import("./Components/Login"));
const ImageGallery = lazy(() => import("./Components/ImageGallery"));
const FileUpload = lazy(() => import("./Components/FileUpload"));
const Profile = lazy(() => import("./Components/Profile"));
const PrivateRoute = lazy(() => import("./Components/Private"));
const PageNotFound = lazy(() => import("./Components/PageNotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<ClipLoader color="#007bff" size={50} />}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={
              <PrivateRoute authRoute={true}>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute authRoute={true}>
                <Register />
              </PrivateRoute>
            }
          />

          <Route
            path="/image-gallery"
            element={
              <PrivateRoute>
                <ImageGallery />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload-image"
            element={
              <PrivateRoute>
                <FileUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

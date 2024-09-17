import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={1000}
        theme="light"
        transition={Slide}
        pauseOnHover={false}
        hideProgressBar
      />
    </>
  );
}

export default App;

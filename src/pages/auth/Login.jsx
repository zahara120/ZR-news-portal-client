import { Input } from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";

export const Login = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "admin@mail.com",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validasi
      if (!formData.email || !formData.password) {
        alert("Please fill out all fields.");
        return;
      }
      const { data } = await axios({
        method: "post",
        url: "/login",
        data: formData,
      });

      // save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", formData.email);
      nav("/cms/news");
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-12 w-[300px] md:w-[500px]">
          <h1 className="text-3xl">
            ZR<span className="font-bold">News</span>
          </h1>
          <h1 className="text-2xl">Sign in to your account</h1>
          <Input
            isRequired
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            className="max-w-xl"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            isRequired
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FontAwesomeIcon
                    icon="fa-solid fa-eye"
                    className="text-default-400"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="fa-solid fa-eye-slash"
                    className="text-default-400"
                  />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xl"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="w-full font-bold"
            onClick={(e) => handleSubmit(e)}
          >
            Sign in
          </Button>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const { data } = await axios({
                  method: "post",
                  url: "/google-login",
                  data: {
                    googleToken: credentialResponse?.credential,
                  },
                });
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", data.email);
                nav("/cms/news");
              } catch (error) {
                toast.error(error.response.data.message || error.message);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
          <Link to="/" className="font-bold text-slate-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

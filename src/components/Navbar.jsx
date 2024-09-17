import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export const Navbar = (props) => {
  const [user, setUser] = useState([]);

  const isLogin = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const getData = async () => {
    const { data } = await axios.get(`/pub/users/${email}`);
    setUser(data);
  };

  useEffect(() => {
    isLogin ? getData() : '';
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <nav className="flex justify-between items-center py-2 border-b-2 border-slate-200">
          <span className="w-[110px] overflow-hidden whitespace-nowrap text-ellipsis">
            hello, {user ? user.username : "there"}
          </span>
          <div className="flex-grow text-center">
            <h1 className="text-3xl">
              <Link to="/">
                ZR<span className="font-bold">News</span>
              </Link>
            </h1>
          </div>
          <div className="flex gap-4">
            {!isLogin ? (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            ) : (
              <Link to="/cms/news">
                <Button>CMS</Button>
              </Link>
            )}
          </div>
        </nav>
        {/* <div className="flex content-center justify-between gap-4 py-4 border-b-2 border-slate-200">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
          <div className="hidden md:flex align-items gap-12 text-slate-400">
            <a href="#all" className="hover:font-bold">
              Food
            </a>
            <a href="#" className="hover:font-bold">
              Lifestyle
            </a>
            <a href="#" className="hover:font-bold">
              Traveling
            </a>
            <a href="#" className="hover:font-bold">
              Health
            </a>
            <a href="#" className="hover:font-bold">
              Technology
            </a>
            <a href="#" className="hover:font-bold">
              Business
            </a>
          </div>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div> */}
      </div>
    </>
  );
};

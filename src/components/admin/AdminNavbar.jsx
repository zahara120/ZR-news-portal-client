import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { googleLogout } from '@react-oauth/google';

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState([]);

  const menuItems = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "News",
      to: "/cms/news",
    },
    {
      label: "Categories",
      to: "/cms/categories",
    },
    {
      label: "Add User",
      to: "/cms/addUser",
    },
  ];

  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    googleLogout();
    nav("/");
  };
  const email = localStorage.getItem("email");

  const getData = async () => {
    const { data } = await axios.get(`/pub/users/${email}`);
    setUser(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered className="py-2">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link to="/">
          <NavbarBrand>
            <h1>ZR</h1>
            <p className="font-bold text-inherit">News</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            color="foreground"
          >
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/cms/news"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            color="foreground"
          >
            News
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/cms/categories"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            aria-current="page"
          >
            Categories
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/cms/addUser"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            color="foreground"
          >
            Add User
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  color:"primary",
                  src: user.imageUrl,
                }}
                className="transition-transform"
                description={user.email}
                name={user.username}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              color="foreground"
            >
              {item.label}
            </NavLink>
          </NavbarMenuItem>
        ))}
        <Link onClick={handleLogout} className="text-lg text-red-500">
          Log out
        </Link>
      </NavbarMenu>
    </Navbar>
  );
}

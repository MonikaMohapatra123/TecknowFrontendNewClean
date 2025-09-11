import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavLinks from "./NavLinks";
import LazyLoad from 'react-lazyload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from "../../Assets/logobg.jpeg";
const Link = ({ to, children, ...rest }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <RouterLink to={to} onClick={handleClick} {...rest}>
      {children}
    </RouterLink>
  );
};

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
  }, [location]);

  useEffect(() => {
    const checkScroll = () => {
      if (location.pathname === "/") {
        setIsScrolled(window.scrollY > 100);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [location]);

  return (
    <nav
      id="animated-navbar"
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        isScrolled
          ? "shadow-lg bg-white"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center font-medium justify-around">
        {/* Logo + Hamburger */}
        <div className="z-50 p-2 lg:w-auto w-full flex justify-between">
          <Link to="/">
            <LazyLoad height={200} offset={100} once>
              <img
                src={logo}
                alt="logo"
                className="w-16 lg:w-20 xl:w-24" loading="lazy"
              />
            </LazyLoad>
          </Link>
          <div
            className={`text-4xl lg:hidden`}
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon
              icon={open ? faTimes : faBars}
              color={open ? undefined : isScrolled ? "black" : "white"}
            />
          </div>
        </div>

        {/* Desktop Navbar */}
        <ul
          className={`lg:flex hidden uppercase items-center gap-6 whitespace-nowrap font-[Poppins] ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          <li>
            <Link to="/" className="block py-7 px-3 hover:text-green-700">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/why-priya"
              className="block py-7 px-3 hover:text-green-700"
            >
              Why Us?
            </Link>
          </li>
          <NavLinks isScrolled={isScrolled} />
          <li>
            <Link
              to="/company"
              className="block py-7 px-3 hover:text-green-700"
            >
              Company
            </Link>
          </li>
          <li>
            <Link
              to="/sustainability"
              className="block py-7 px-3 hover:text-green-700"
            >
              Sustainability
            </Link>
          </li>
          <li>
            <Link
              to="/career"
              className="block py-7 px-3 hover:text-green-700"
            >
              Career
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-7 px-3 hover:text-green-700"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Navbar */}
        <ul
          className={`lg:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-20 pl-4 duration-500 ${
            open ? "left-0" : "left-[-100%]"
          }`}
        >
          <li>
            <Link
              to="/"
              className="block py-4 px-2 hover:text-green-700"
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/why-priya"
              className="block py-4 px-2 hover:text-green-700"
              onClick={handleLinkClick}
            >
              Why Us?
            </Link>
          </li>
          <li>
            <Link
              to="/company"
              className="block py-4 px-2 hover:text-green-700"
              onClick={handleLinkClick}
            >
              Company
            </Link>
          </li>
          <NavLinks handleLinkClick={handleLinkClick} />
          <li>
            <Link
              to="/sustainability"
              className="block py-4 px-2 hover:text-green-700"
              onClick={handleLinkClick}
            >
              Sustainability
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-4 px-2 hover:text-green-700"
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/career"
              className="block py-4 px-2 hover:text-green-700"
              onClick={handleLinkClick}
            >
              Career
            </Link>
          </li>
          <li>
            <div className="py-5"></div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

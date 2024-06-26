import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import DropdownMenu from './components/DropdownMenu/DropdownMenu';
import NavbarLink from './components/NavbarLink/NavbarLink';

import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="flex justify-between items-center flex-wrap sm:flex-nowrap bg-vaki-primary text-white p-4 lg:px-40 text-2xl">
      <div>
        <Link
          className="lg:outline-none lg:hover:underline lg:focus:underline lg:active:underline"
          to="/"
        >
          <div className="flex items-center gap-2">
            <img src={logo} alt="Vaki Logo" />
            <span>Vaki</span>
          </div>
        </Link>
      </div>
      <div className="flex flex-wrap mt-3 sm:mt-0 order-last sm:order-none justify-between sm:justify-normal w-full sm:w-fit gap-2 xs:gap-8">
        <NavbarLink pathname={pathname} text="Friends" path="/friends" />
        <NavbarLink pathname={pathname} text="Expenses" path="/expenses" />
        <NavbarLink pathname={pathname} text="Groups" path="/groups" />
      </div>
      <DropdownMenu />
    </header>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import userFilledLogo from '../../../../assets/user-filled.svg';
import { useEscapeKey } from '../../../../hooks/useEscapeKey';

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const containerRef = React.useRef();

  useEscapeKey({
    isOpen: isDropdownOpen,
    setIsOpen: setIsDropdownOpen,
  });

  // closes the dropdown when clicking outside the element (body)
  React.useEffect(() => {
    const closeDropdown = (e) => {
      if (!containerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.body.addEventListener('click', closeDropdown);

    return () => {
      document.body.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex gap-5 relative">
      <button
        className="rounded-full p-[0.3rem] px-[0.4rem] bg-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        id="dropdownDefaultButton"
      >
        <img src={userFilledLogo} alt="Menu logo" />
      </button>
      <div
        id="dropdown"
        className={`z-10 ${
          isDropdownOpen ? '' : 'hidden'
        } bg-white divide-y divide-gray-100 absolute right-0 top-[40px] rounded-lg shadow dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <DropdownElement
            onClick={() => setIsDropdownOpen(false)}
            text="Account"
            path="/my-account"
          />
          <DropdownElement onClick={() => setIsDropdownOpen(false)} text="Logout" path="/logout" />
        </ul>
      </div>
    </div>
  );
};

const DropdownElement = ({ path, text, onClick }) => {
  return (
    <li>
      <Link
        onClick={onClick}
        className="block px-7 py-2 text-vaki-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-2xl"
        to={path}
      >
        {text}
      </Link>
    </li>
  );
};

DropdownElement.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default DropdownMenu;

import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { useEscapeKey } from '../../hooks/useEscapeKey';

const Modal = ({ isOpen, setIsOpen, children, title }) => {
  useEscapeKey({
    isOpen,
    setIsOpen,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-10 w-full h-full max-h-full bg-slate-500 opacity-70"></div>
      <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:px-6 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-6 space-y-4">{children}</div>
            <div className="flex items-center justify-end p-4 md:px-6 border-t border-gray-200 rounded-b dark:border-gray-600">
              <Button text="Close" action={() => setIsOpen(false)} variant="transparent" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  title: PropTypes.string,
};

export default Modal;

import { useEffect, useCallback } from 'react';

const useEscapeKey = ({ setIsOpen, isOpen }) => {
  const escFunction = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  // executes the closing event when pressing escape key
  useEffect(() => {
    if (!isOpen) {
      document.removeEventListener('keydown', escFunction, false);
      return;
    }
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction, isOpen]);
};

export { useEscapeKey };

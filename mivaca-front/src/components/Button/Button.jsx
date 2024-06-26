import PropTypes from 'prop-types';

const Button = ({
  className,
  disabled,
  text,
  action,
  size = 'md',
  type = 'button',
  variant = 'default',
}) => {
  return (
    <button
      disabled={!!disabled}
      onClick={action}
      type={type}
      className={`${
        variant === 'default'
          ? 'bg-vaki-primary text-white hover:opacity-90 focus:opacity-90'
          : 'text-vaki-primary hover:opacity-80 hover:bg-vaki-primary hover:text-white focus:opacity-80 focus:bg-vaki-primary focus:text-white'
      } border-2 border-vaki-primary rounded cursor-pointer ${className ?? ''} ${
        size === 'md' ? 'px-3 py-2' : 'px-2 py-1'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  action: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
};

export default Button;

import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';

const Card = ({ hideLogo = false, color, className, children }) => {
  return (
    <div
      className={`${
        className ?? ''
      } flex justify-start gap-8 p-4 font-base shadow-lg rounded border`}
    >
      {!hideLogo && (
        <div
          style={{ backgroundColor: color }}
          className="flex items-center justify-between px-6 rounded"
        >
          <img src={logo} alt="Card logo" />
        </div>
      )}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.string,
  hideLogo: PropTypes.bool,
  name: PropTypes.string,
};

export default Card;

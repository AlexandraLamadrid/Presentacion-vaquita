import userIcon from '../../assets/user.svg';
import passwordIcon from '../../assets/password.svg';
import peopleIcon from '../../assets/people.svg';
import PropTypes from 'prop-types';

const availableIcons = {
  user: userIcon,
  password: passwordIcon,
  people: peopleIcon,
};

const TextInput = ({ icon, ariaLabel, type, placeholder, name, onChange, value }) => {
  const showIcon = !!availableIcons[icon];

  return (
    <div className="relative">
      <input
        aria-label={ariaLabel}
        className={`w-full border border-vaki-black rounded p-1 pl-2 ${showIcon ? 'pr-8' : ''}`}
        type={type || 'text'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {showIcon && (
        <img className="absolute top-[5px] right-[5px]" src={availableIcons[icon]} alt="icon" />
      )}
    </div>
  );
};

TextInput.propTypes = {
  ariaLabel: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextInput;

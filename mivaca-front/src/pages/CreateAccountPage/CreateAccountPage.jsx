import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import loginLogo from '../../assets/login-logo.svg';
import * as userService from '../../services/UserService';
import schema from './Validations';

const CreateAccountPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onRegister = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      {
        email,
        password,
        name,
      },
      {
        abortEarly: false,
      }
    );

    if (error) {
      setMessage(error.details[0].message);
      return;
    }

    setMessage('');
    setIsLoading(true);

    userService
      .create(value)
      .then((response) => {
        navigate(`/login?email=${response.data.email}`, { replace: true });
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <img className="mb-6 w-40 sm:w-52" src={loginLogo} alt="App Logo" />
      <h1 className="text-2xl font-bold mb-4 text-center text-vaki-primary">Register</h1>
      <div className="mt-4 text-center w-11/12 xs:w-8/12 sm:w-80">
        <form onSubmit={onRegister}>
          <div className="flex flex-col gap-8 justify-center mb-8">
            <TextInput
              ariaLabel="Name"
              type="text"
              placeholder="Name"
              name="name"
              icon="users"
              onChange={(value) => setName(value)}
            />
            <TextInput
              ariaLabel="Email"
              type="email"
              placeholder="Email"
              name="email"
              icon="users"
              onChange={(value) => setEmail(value)}
            />
            <TextInput
              ariaLabel="Password"
              type="password"
              placeholder="Password"
              name="password"
              icon="password"
              onChange={(value) => setPassword(value)}
            />
          </div>
          <Button
            className="mt-4 w-full"
            disabled={isLoading}
            text="Create account"
            type="submit"
          />
        </form>
        <Button
          action={() => navigate('/login')}
          disabled={isLoading}
          className="mt-4 w-full"
          text="Go to Login"
          variant="transparent"
        />
        {message && <p className="text-vaki-red mt-6">{message}</p>}
      </div>
    </div>
  );
};

export default CreateAccountPage;

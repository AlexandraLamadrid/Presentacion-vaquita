import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import loginLogo from '../../assets/login-logo.svg';
import * as loginService from '../../services/LoginService';
import schema from './Validations';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const emailFromUrl = params.get('email');
      if (emailFromUrl) {
        setEmail(emailFromUrl);
      }
    }
  }, [location]);

  const onLogin = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      {
        email,
        password,
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

    loginService
      .login(value)
      .then((response) => {
        const token = response.data.token;
        if (token) {
          sessionStorage.setItem('token', token);
          window.dispatchEvent(new Event('storage'));
          navigate('/', { replace: true });
        } else {
          setMessage('An error ocurred');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <img className="mb-6 w-40 sm:w-52" src={loginLogo} alt="App Logo" />
      <h1 className="text-2xl font-bold mb-4 text-center text-vaki-primary">Login</h1>
      <div className="mt-4 text-center w-11/12 xs:w-8/12 sm:w-80">
        <form onSubmit={onLogin}>
          <div className="flex flex-col gap-8 justify-center mb-8">
            <TextInput
              ariaLabel="Email"
              type="email"
              placeholder="Email"
              name="email"
              icon="users"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <TextInput
              ariaLabel="Password"
              type="password"
              placeholder="Password"
              name="password"
              icon="password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
          </div>
          <Button className="mt-4 w-full" disabled={isLoading} text="Login" type="submit" />
        </form>
        <Button
          action={() => navigate('/create-account')}
          disabled={isLoading}
          className="mt-4 w-full"
          text="Register"
          variant="transparent"
        />
        {message && <p className="text-vaki-red mt-6">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

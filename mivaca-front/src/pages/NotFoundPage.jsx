import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import logo from '../assets/logo.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <img className="mb-6 w-20" src={logo} alt="Vaki Logo" />
      <h1 className="text-4xl font-bold mb-4 text-center">404 - Not Found</h1>
      <p className="text-center">Sorry, It looks like the page you're looking for doesn't exist.</p>
      <div className="mt-4 text-center">
        <div className="flex gap-4 justify-center">
          <Button text="Take me Home" action={() => navigate('/')} size="md" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

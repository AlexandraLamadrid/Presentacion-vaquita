import { Route, Routes } from 'react-router-dom';
import GroupsPage from './pages/GroupsPage/GroupsPage';
import GroupsDetailPage from './pages/GroupsDetailPage/GroupsDetailPage';
import FriendsPage from './pages/FriendsPage';
import ExpensesPage from './pages/ExpensesPage';
import HomePage from './pages/HomePage';
import MyAccountPage from './pages/MyAccountPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage/CreateAccountPage';
import LogoutPage from './pages/LogoutPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const App = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <main className="mt-4 mb-auto px-2 sm:px-8 lg:px-40">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:id"
            element={
              <ProtectedRoute>
                <GroupsDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <FriendsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <ExpensesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccountPage />
              </ProtectedRoute>
            }
          />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

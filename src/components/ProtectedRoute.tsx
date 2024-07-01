import { Navigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  let isLoginData: any = getCookie('isLogin') || false;
  let userLoggedIn = JSON.parse(isLoginData);
  let isLogin = userLoggedIn.isLogin || false;

  if (!isLogin) {
    return <Navigate to="/signIn" />;
  }

  try {
    return children;
  } catch (error) {
    return <Navigate to="/signIn" />;
  }
};

export default ProtectedRoute;

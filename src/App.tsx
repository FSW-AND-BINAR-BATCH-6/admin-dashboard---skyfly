import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Users';
import Flights from './pages/Flights';
import DefaultLayout from './layout/DefaultLayout';
import { Toaster } from 'react-hot-toast';
import { getCookie } from 'typescript-cookie';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  let isLogin: any = getCookie('isLogin') || false;
  console.log(isLogin);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster />
      {!isLogin ? (
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="Signin | Sky Fly Admin" />
                <SignIn />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <h1>Not Found</h1>
              </>
            }
          />
        </Routes>
      ) : (
        <DefaultLayout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <PageTitle title="Dashboard SkyFly" />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <h1>Not Found</h1>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | SkyFly Admin" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/users"
              element={
                <>
                  <PageTitle title="Users | SkyFly Admin" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/flights"
              element={
                <>
                  <PageTitle title="Flight | SkyFly Admin" />
                  <Flights />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings | SkyFly Admin" />
                  <Settings />
                </>
              }
            />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;

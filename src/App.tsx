import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Users';
import TablesNotifications from './pages/Notification';
import Flights from './pages/Flights';
import DefaultLayout from './layout/DefaultLayout';
import { Toaster } from 'react-hot-toast';
import { getCookie } from 'typescript-cookie';
import TableAirlines from './components/Tables/Airlines';
import TableAirports from './components/Tables/Airports';
import TablesUser from './pages/Users';
import TablesTransaction from './pages/Transactions';

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
              path="/users"
              element={
                <>
                  <PageTitle title="Users | SkyFly Admin" />
                  <TablesUser />
                </>
              }
            />
            <Route
              path="/transactions"
              element={
                <>
                  <PageTitle title="Transactions | SkyFly Admin" />
                  <TablesTransaction />
                </>
              }
            />
            <Route
              path="/notifications"
              element={
                <>
                  <PageTitle title="Notifications | SkyFly Admin" />
                  <TablesNotifications />
                </>
              }
            />
            <Route
              path="/airlines"
              element={
                <>
                  <PageTitle title="Airlines | SkyFly Admin" />
                  <TableAirlines />
                </>
              }
            />
            <Route
              path="/airports"
              element={
                <>
                  <PageTitle title="Airports | SkyFly Admin" />
                  <TableAirports />
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

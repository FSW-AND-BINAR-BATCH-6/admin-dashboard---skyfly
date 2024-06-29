import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TablesNotifications from './pages/Notification';
import Flights from './pages/Flights';
import DefaultLayout from './layout/DefaultLayout';
import { Toaster } from 'react-hot-toast';
import TableAirlines from './components/Tables/Airlines';
import TableAirports from './components/Tables/Airports';
import TablesUser from './pages/Users';
import TablesTransaction from './pages/Transactions';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Toaster />
      {/* <Router> */}
      <Routes>
        <Route
          path="/signIn"
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

        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard SkyFly" />
              <ProtectedRoute>
                <DefaultLayout>
                  <Dashboard />
                </DefaultLayout>
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | SkyFly Admin" />
              <ProtectedRoute>
                <DefaultLayout>
                  <Profile />
                </DefaultLayout>
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users | SkyFly Admin" />
              <ProtectedRoute>
                <DefaultLayout>
                  <TablesUser />
                </DefaultLayout>
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/transactions"
          element={
            <>
              <PageTitle title="Transactions | SkyFly Admin" />
              <ProtectedRoute>
                <DefaultLayout>
                  <TablesTransaction />
                </DefaultLayout>
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <PageTitle title="Notifications | SkyFly Admin" />
              <ProtectedRoute>
                <DefaultLayout>
                  <TablesNotifications />
                </DefaultLayout>
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/airlines"
          element={
            <>
              <PageTitle title="Airlines | SkyFly Admin" />
              <ProtectedRoute>
                <DefaultLayout>
                  <TableAirlines />
                </DefaultLayout>
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/airports"
          element={
            <>
              <PageTitle title="Airports | SkyFly Admin" />
              <ProtectedRoute>
                <DefaultLayout>
                  <TableAirports />
                </DefaultLayout>
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/flights"
          element={
            <>
              <PageTitle title="Flight | SkyFly Admin" />
              <ProtectedRoute>
                <DefaultLayout>
                  <Flights />
                </DefaultLayout>
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | SkyFly Admin" />
              <ProtectedRoute>
                <DefaultLayout>
                  <Settings />
                </DefaultLayout>
              </ProtectedRoute>
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
      {/* </Router> */}
    </>
  );
}

export default App;

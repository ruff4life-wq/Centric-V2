import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Today from './components/Today';
import Assessment from './components/Assessment';
import ModuleView from './components/ModuleView';
import CheckIn from './components/CheckIn';
import Profile from './components/Profile';
import SplashScreen from './components/SplashScreen';

function AppRoutes() {
  const { state } = useUser();
  const [splashDone, setSplashDone] = useState<boolean>(false);

  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  if (!state.assessment.completed) {
    return <Assessment />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/today" replace />} />
        <Route path="today" element={<Today />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="modules" element={<Navigate to={`/modules/${state.currentWeek}`} replace />} />
        <Route path="modules/:id" element={<ModuleView />} />
        <Route path="chat" element={<CheckIn />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

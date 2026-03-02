import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Assessment from './components/Assessment';
import ModuleView from './components/ModuleView';
import ChatInterface from './components/ChatInterface';
import Profile from './components/Profile';

function AppRoutes() {
  const { state } = useUser();

  if (!state.assessment.completed) {
    return <Assessment />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="modules" element={<Navigate to={`/modules/${state.currentWeek}`} replace />} />
        <Route path="modules/:id" element={<ModuleView />} />
        <Route path="chat" element={<ChatInterface />} />
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

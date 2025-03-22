import React from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import './styles/main.css';
import LandingPage from './pages/LandingPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ChatPage from './pages/ChatPage';
import ApplicationsPage from './pages/ApplicationsPage';
import { AuthProvider } from './context/AuthContext';

// Create routes first
const routes = createRoutesFromElements(
  <Route>
    <Route index element={<LandingPage />} />
    <Route path="upload" element={<ResumeUploadPage />} />
    <Route path="signin" element={<SignInPage />} />
    <Route path="signup" element={<SignUpPage />} />
    <Route path="chat" element={<ChatPage />} />
    <Route path="applications" element={<ApplicationsPage />} />
  </Route>
);

// Create router with future flags
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
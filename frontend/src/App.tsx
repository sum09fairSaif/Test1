import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Landing from "./Components/Landing/Landing";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import FindDoctorPage from "./Components/FindDoctor/FindDoctor";
import Onboarding from "./Components/Onboarding/Onboarding";
import SymptomChecker from "./Components/SymptomChecker/SymptomChecker";
import Dashboard from "./Components/Dashboard/Dashboard";
import NameSetup from "./Components/NameSetup/NameSetup";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Loading from "./Components/Loading/Loading";
import WorkoutRecommendations from "./Components/WorkoutRecommendations/WorkoutRecommendations";
import { AuthProvider } from "./context/AuthContext";

function getPageTitle(pathname: string): string {
  const byPath: Record<string, string> = {
    "/": "Home",
    "/login": "Login",
    "/register": "Register",
    "/symptom-checker": "Symptom Checker",
    "/recommendations": "Recommendations",
    "/loading": "Loading",
    "/workout-recommendations": "Workout Recommendations",
    "/find-a-provider": "Find a Doctor",
    "/name-setup": "Name Setup",
    "/your-profile": "Dashboard",
    "/onboarding": "Onboarding",
  };

  return byPath[pathname] || "ConnectHER";
}

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    document.title =
      pageTitle === "ConnectHER" ? "ConnectHER" : `${pageTitle} | ConnectHER`;
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <TitleManager />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/recommendations" element={<WorkoutRecommendations />} />
        <Route path="/loading" element={<Loading />} />
        <Route
          path="/workout-recommendations"
          element={<WorkoutRecommendations />}
        />
        <Route path="/find-a-provider" element={<FindDoctorPage />} />

        <Route
          path="/name-setup"
          element={
            <ProtectedRoute requireOnboarding={false}>
              <NameSetup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/your-profile"
          element={
            <ProtectedRoute requireOnboarding={false}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/onboarding"
          element={
            <ProtectedRoute requireOnboarding={false}>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from "react";
import BrandPanel from "./components/BrandPanel";
import RoleSelector from "./components/RoleSelector";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { getCurrentUser } from "./services/authService";
import "./index.css";

function App() {

  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setCheckingSession(false);
    });
  }, []);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleBack = () => {
    setRole(null);
  };

  if (checkingSession) return <main className="app-loading">Cargando espacio de trabajo…</main>;
  if (user) return <Dashboard user={user} onLogout={() => setUser(null)} />;

  return (
    <main className="app">

      <BrandPanel />

      <section className="auth-panel">

        {!role ? (
          <RoleSelector
            onSelect={handleRoleSelect}
          />
        ) : (
          <LoginForm
            role={role}
            onBack={handleBack}
            onAuthenticated={setUser}
          />
        )}

      </section>

    </main>
  );
}

export default App;

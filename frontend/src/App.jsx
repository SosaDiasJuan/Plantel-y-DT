import { useState } from "react";
import BrandPanel from "./components/BrandPanel";
import RoleSelector from "./components/RoleSelector";
import LoginForm from "./components/LoginForm";
import "./index.css";

function App() {

  const [role, setRole] = useState(null);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleBack = () => {
    setRole(null);
  };

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
          />
        )}

      </section>

    </main>
  );
}

export default App;
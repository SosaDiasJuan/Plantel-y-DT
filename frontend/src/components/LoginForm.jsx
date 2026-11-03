import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ArrowRight,
  LoaderCircle
} from "lucide-react";

import { login } from "../services/authService";

function LoginForm({ role, onBack, onAuthenticated }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roleName =
    role === "DIRECTOR_TECNICO"
      ? "Director Técnico"
      : "Jugador";

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Completá tu correo electrónico y contraseña.");
      return;
    }

    try {

      setLoading(true);

      const response = await login({
        email,
        password,
        role,
        rememberMe
      });

      onAuthenticated(response);

    } catch (err) {

      setError(
        err.message ||
        "No pudimos iniciar sesión."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-content login-content">

      <div className="login-top">

        <button
          className="back-button"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        <span className="selected-role">
          {roleName}
        </span>

      </div>

      <div className="eyebrow">
        INICIO DE SESIÓN
      </div>

      <h2>
        Bienvenido
        <br />
        de vuelta
      </h2>

      <form onSubmit={handleSubmit}>

        <label>
          CORREO ELECTRÓNICO

          <input
            type="email"
            placeholder={
              role === "DIRECTOR"
                ? "director@plantelydt.com"
                : "jugador@plantelydt.com"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

        </label>

        <label>

          <div className="password-label">
            <span>CONTRASEÑA</span>

            <button
              type="button"
              onClick={() =>
                alert("La recuperación de contraseña se implementará próximamente.")
              }
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <div className="password-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="••••••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword
                ? <EyeOff size={19} />
                : <Eye size={19} />
              }
            </button>

          </div>

        </label>

        <label className="remember">

          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) =>
              setRememberMe(e.target.checked)
            }
          />

          <span>Recordarme</span>

        </label>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <button
          className="login-button"
          type="submit"
          disabled={loading}
        >

          {loading ? (
            <>
              <LoaderCircle
                size={20}
                className="spinner"
              />

              INGRESANDO...
            </>
          ) : (
            <>
              INGRESAR AL SISTEMA
              <ArrowRight size={20} />
            </>
          )}

        </button>

      </form>

      <div className="login-access">
        ¿No tenés cuenta?
        <button>
          Solicitá el acceso a tu liga
        </button>
      </div>

    </div>
  );
}

export default LoginForm;

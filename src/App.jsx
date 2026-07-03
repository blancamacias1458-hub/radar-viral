import { useState, useEffect } from "react";

const styles = {
  body: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 16px",
    paddingTop: "env(safe-area-inset-top, 20px)",
    background: "#F2F2F7",
    fontFamily: "'Inter Tight', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "390px",
    animation: "fadeUp 0.5s ease both",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logo: {
    display: "block",
    margin: "0 auto 20px",
    borderRadius: "16px",
    width: "72px",
    height: "72px",
    background: "linear-gradient(135deg, #1C1C1E 0%, #3A3A3C 100%)",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },
  h1: {
    fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "0.36px",
    color: "#1C1C1E",
    lineHeight: "34px",
    marginBottom: "6px",
    margin: "0 0 6px 0",
  },
  subtitle: {
    fontSize: "17px",
    color: "#6E6E73",
    letterSpacing: "-0.43px",
    margin: 0,
  },
  card: {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "16px",
    border: "0.5px solid rgba(0,0,0,0.1)",
    marginBottom: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
  },
  fieldTop: {
    padding: "0 16px",
    borderBottom: "0.5px solid rgba(60,60,67,0.36)",
  },
  fieldBottom: {
    padding: "0 16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    color: "#6E6E73",
    letterSpacing: "-0.08px",
    paddingTop: "11px",
    paddingBottom: "2px",
    fontWeight: "500",
  },
  input: (focused, hasError) => ({
    width: "100%",
    height: "auto",
    paddingLeft: "0",
    paddingBottom: "11px",
    paddingTop: "4px",
    borderRadius: "0",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "17px",
    color: "#1C1C1E",
    letterSpacing: "-0.43px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    caretColor: focused ? (hasError ? "#FF3B30" : "#007AFF") : "auto",
    transition: "color 0.2s",
  }),
  errorText: {
    fontSize: "12px",
    color: "#FF3B30",
    padding: "4px 16px 8px",
    margin: 0,
  },
  btnPrimary: (disabled, hovered) => ({
    width: "100%",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: disabled
      ? "#A2A2A7"
      : hovered
      ? "#0063CC"
      : "#007AFF",
    color: "#FFFFFF",
    fontSize: "17px",
    fontWeight: "600",
    letterSpacing: "-0.43px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "inherit",
    transition: "background 0.2s, transform 0.1s",
    transform: hovered && !disabled ? "scale(1.01)" : "scale(1)",
    boxShadow: disabled ? "none" : "0 4px 16px rgba(0,122,255,0.3)",
  }),
  linkBtn: (hovered) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    color: hovered ? "#0063CC" : "#007AFF",
    fontWeight: "600",
    fontFamily: "inherit",
    padding: "4px 8px",
    transition: "color 0.2s",
    letterSpacing: "-0.23px",
  }),
  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "15px",
    letterSpacing: "-0.23px",
    color: "#6E6E73",
  },
  footerLink: (hovered) => ({
    color: hovered ? "#0063CC" : "#007AFF",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.2s",
  }),
  divider: {
    textAlign: "center",
    marginTop: "16px",
  },
  errorBanner: {
    background: "#FFF2F2",
    border: "0.5px solid rgba(255,59,48,0.3)",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#FF3B30",
    letterSpacing: "-0.23px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  successBanner: {
    background: "#F0FFF4",
    border: "0.5px solid rgba(52,199,89,0.3)",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#34C759",
    letterSpacing: "-0.23px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  loadingSpinner: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginRight: "8px",
    verticalAlign: "middle",
  },
};

function LogoIcon() {
  return (
    <div
      style={{
        ...styles.logo,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: "36px" }}>🐄</span>
    </div>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [regHovered, setRegHovered] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [eyeHovered, setEyeHovered] = useState(false);

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isDisabled = !email.trim() || !password.trim() || loading;

  function validateEmail(val) {
    if (!val.trim()) {
      setEmailError("El correo es obligatorio");
    } else if (!isValidEmail(val)) {
      setEmailError("Ingresa un correo válido");
    } else {
      setEmailError("");
    }
  }

  function validatePass(val) {
    if (!val.trim()) {
      setPassError("La contraseña es obligatoria");
    } else if (val.length < 6) {
      setPassError("Mínimo 6 caracteres");
    } else {
      setPassError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    validateEmail(email);
    validatePass(password);
    if (!isValidEmail(email) || password.length < 6) return;

    setLoading(true);
    setFormError("");
    setFormSuccess("");

    try {
      // TODO: Reemplazar con llamada real a API de autenticación
      // Ejemplo: const res = await fetch(import.meta.env.VITE_API_URL + '/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      await new Promise((r) => setTimeout(r, 1500)); // Simulación
      const mockSuccess = email.includes("@") && password.length >= 6;
      if (mockSuccess) {
        setFormSuccess("¡Sesión iniciada correctamente! Redirigiendo...");
        // TODO: Redirigir al dashboard después del login
        // window.location.href = '/dashboard';
      } else {
        setFormError("Credenciales incorrectas. Verifica tu correo y contraseña.");
      }
    } catch {
      setFormError("Error de conexión. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }

  function handleMagicLink() {
    // TODO: Implementar envío de magic link por correo
    if (!isValidEmail(email)) {
      setEmailError("Ingresa un correo válido primero");
      return;
    }
    setFormSuccess(`Se envió un enlace de acceso a ${email}`);
    setFormError("");
  }

  function handleRegister() {
    // TODO: El link de redirección de registro debe configurarse según necesidades del proyecto
    // El usuario indicó: C:\Users\BEML — esto parece una ruta local, no una URL web
    // Por defecto redirigimos a /register dentro de la misma app
    window.location.href = "/register";
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; }
        
        body {
          margin: 0;
          padding: 0;
          background: #F2F2F7;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(4px); }
        }

        .form-card {
          animation: fadeUp 0.5s ease 0.1s both;
        }

        .shake {
          animation: shake 0.4s ease;
        }

        input::placeholder {
          color: #C7C7CC;
          font-size: 17px;
        }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: #1C1C1E !important;
        }

        .field-top-wrapper {
          position: relative;
        }

        .field-focus-bar {
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 1.5px;
          background: #007AFF;
          transform: scaleX(0);
          transition: transform 0.2s ease;
          border-radius: 1px;
        }

        .field-focus-bar.active {
          transform: scaleX(1);
        }

        .field-focus-bar.error {
          background: #FF3B30;
          transform: scaleX(1);
        }

        .eye-btn {
          position: absolute;
          right: 16px;
          bottom: 11px;
          background: none;
          border: none;
          cursor: pointer;
          color: #C7C7CC;
          font-size: 18px;
          padding: 0;
          transition: color 0.2s;
          line-height: 1;
        }

        .eye-btn:hover {
          color: #6E6E73;
        }
      `}</style>

      <main style={styles.body}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <LogoIcon />
            <h1 style={styles.h1}>Inicia sesión</h1>
            <p style={styles.subtitle}>en tu cuenta de Cowpad</p>
          </div>

          {/* Mensajes de estado */}
          {formError && (
            <div style={styles.errorBanner} role="alert">
              <span>⚠️</span>
              <span>{formError}</span>
            </div>
          )}
          {formSuccess && (
            <div style={styles.successBanner} role="status">
              <span>✅</span>
              <span>{formSuccess}</span>
            </div>
          )}

          {/* Formulario */}
          <div style={styles.card} className="form-card">
            <form onSubmit={handleSubmit} noValidate>
              {/* Campo Email */}
              <div className="field-top-wrapper" style={styles.fieldTop}>
                <label htmlFor="email" style={styles.label}>
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  style={styles.input(emailFocused, !!emailError)}
                  placeholder="correo@ejemplo.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                    setFormError("");
                    setFormSuccess("");
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => {
                    setEmailFocused(false);
                    if (email) validateEmail(email);
                  }}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                <div
                  className={`field-focus-bar ${emailFocused ? "active" : ""} ${emailError ? "error" : ""}`}
                />
              </div>
              {emailError && (
                <p id="email-error" style={styles.errorText} role="alert">
                  {emailError}
                </p>
              )}

              {/* Campo Contraseña */}
              <div
                className="field-top-wrapper"
                style={{ ...styles.fieldBottom, position: "relative" }}
              >
                <label htmlFor="password" style={styles.label}>
                  Contraseña
                </label>
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  style={{
                    ...styles.input(passFocused, !!passError),
                    paddingRight: "44px",
                  }}
                  placeholder="Tu contraseña"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passError) validatePass(e.target.value);
                    setFormError("");
                    setFormSuccess("");
                  }}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => {
                    setPassFocused(false);
                    if (password) validatePass(password);
                  }}
                  aria-invalid={!!passError}
                  aria-describedby={passError ? "pass-error" : undefined}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  style={{ color: eyeHovered ? "#6E6E73" : "#C7C7CC" }}
                  onMouseEnter={() => setEyeHovered(true)}
                  onMouseLeave={() => setEyeHovered(false)}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
                <div
                  className={`field-focus-bar ${passFocused ? "active" : ""} ${passError ? "error" : ""}`}
                />
              </div>
              {passError && (
                <p id="pass-error" style={styles.errorText} role="alert">
                  {passError}
                </p>
              )}
            </form>
          </div>

          {/* Botón principal */}
          <button
            type="submit"
            style={styles.btnPrimary(isDisabled, btnHovered)}
            disabled={isDisabled}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            onClick={handleSubmit}
            aria-label="Ingresar a tu cuenta"
          >
            {loading ? (
              <>
                <span style={styles.loadingSpinner} aria-hidden="true" />
                Verificando...
              </>
            ) : (
              "Ingresar →"
            )}
          </button>

          {/* Magic Link */}
          <div style={styles.divider}>
            <button
              type="button"
              style={styles.linkBtn(linkHovered)}
              onMouseEnter={() => setLinkHovered(true)}
              onMouseLeave={() => setLinkHovered(false)}
              onClick={handleMagicLink}
              aria-label="Recibir código de acceso por correo"
            >
              Usar código por correo
            </button>
          </div>

          {/* Registro */}
          <p style={styles.footer}>
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              style={styles.footerLink(regHovered)}
              onMouseEnter={() => setRegHovered(true)}
              onMouseLeave={() => setRegHovered(false)}
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              Regístrate
            </a>
          </p>

          {/* Indicador de seguridad */}
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#AEAEB2",
              marginTop: "24px",
              letterSpacing: "-0.08px",
            }}
          >
            🔒 Conexión segura · Cowpad {new Date().getFullYear()}
          </p>
        </div>
      </main>
    </>
  );
}
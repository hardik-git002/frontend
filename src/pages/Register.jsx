import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../api";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      await authAPI.post("/users/register", { username, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🎉</h2>
        <p style={styles.subtitle}>Sign up to get started</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    margin: 0,
    color: "#1a1a2e",
  },
  subtitle: {
    margin: 0,
    color: "#888",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    margin: 0,
  },
  footer: {
    textAlign: "center",
    color: "#888",
  },
  link: {
    color: "#1a1a2e",
    fontWeight: "bold",
  },
};

export default Register;
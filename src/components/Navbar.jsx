import { Link, useNavigate } from "react-router-dom";

function Navbar({ onLogout, token }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🚀 My App</h2>
      <div style={styles.links}>
        {token ? (
          <>
            <Link to="/inventory" style={styles.link}>Inventory</Link>
            <Link to="/posts" style={styles.link}>Posts</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  logo: {
    margin: 0,
    color: "white",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;
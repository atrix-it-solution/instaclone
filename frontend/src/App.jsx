import { useState } from "react";
 
const InstagramLogo = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig1" cx="30%" cy="107%" r="120%">
        <stop offset="0%" stopColor="#ffd600" />
        <stop offset="50%" stopColor="#ff6a00" />
        <stop offset="100%" stopColor="#ee0979" />
      </radialGradient>
      <radialGradient id="ig2" cx="0%" cy="100%" r="100%">
        <stop offset="0%" stopColor="#7b00d8" stopOpacity="1" />
        <stop offset="100%" stopColor="#7b00d8" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="56" height="56" rx="16" fill="url(#ig1)" />
    <rect x="2" y="2" width="56" height="56" rx="16" fill="url(#ig2)" />
    <rect x="12" y="12" width="36" height="36" rx="10" stroke="white" strokeWidth="3" fill="none" />
    <circle cx="30" cy="30" r="9" stroke="white" strokeWidth="3" fill="none" />
    <circle cx="40.5" cy="19.5" r="2.5" fill="white" />
  </svg>
);
 
export default function InstagramLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
 
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 

  const isDisabled = loading || !username.trim() || !password.trim();
 
  const handleLogin = async (e) => {
  e.preventDefault();
    if (isLogin) {
      // --- LOGIN ---
      if (!email.trim() || !password.trim()) {
        setError("Please fill in all fields.");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");
        alert("Logged in as: " + data.name);
        // Here you would typically store user data (context/state) and redirect
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // --- SIGNUP ---
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("Please fill in all fields.");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Signup failed");
        alert("Account created! Please log in.");
        setIsLogin(true); // switch to login after signup
        setName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
};

 
  const inputBase = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#262626",
    backgroundColor: "#fafafa",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };
 
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f2f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "390px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "24px 20px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{ color: "#737373", fontSize: "12px", marginBottom: "24px", width: "100%", textAlign: "center" }}>
          English (US)
        </div>
 
        <div style={{ marginBottom: "44px", marginTop: "10px" }}>
          <InstagramLogo />
        </div>
 
        <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Username, email or mobile number"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            style={{ ...inputBase, border: userFocus ? "1.5px solid #a8a8a8" : "1.5px solid #dbdbdb" }}
          />
 
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
              style={{ ...inputBase, padding: "14px 54px 14px 16px", border: passFocus ? "1.5px solid #a8a8a8" : "1.5px solid #dbdbdb" }}
            />
            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#262626", fontSize: "13px", fontWeight: "600", padding: "0", fontFamily: "inherit",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>
 
          {error && <div style={{ color: "#ed4956", fontSize: "13px", textAlign: "center" }}>{error}</div>}
 
          <button
            type="submit"
            disabled={isDisabled}
            style={{
              width: "100%", padding: "14px", marginTop: "4px",
              background: isDisabled ? "#9fc6f5" : "#0095f6",
              color: "#ffffff", border: "none", borderRadius: "28px",
              fontSize: "15px", fontWeight: "700",
              cursor: isDisabled ? "not-allowed" : "pointer",
              fontFamily: "inherit", letterSpacing: "0.2px", transition: "background 0.2s",
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
 
        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          <a href="#" onClick={(e) => e.preventDefault()}
            style={{ color: "#262626", fontSize: "13px", textDecoration: "none", fontWeight: "400" }}>
            Forgot password?
          </a>
        </div>
 
        <div style={{ height: "140px" }} />
 
        <button
          type="button"
          style={{
            width: "100%", padding: "13px", background: "transparent",
            color: "#0095f6", border: "1.5px solid #0095f6", borderRadius: "28px",
            fontSize: "15px", fontWeight: "700", cursor: "pointer",
            marginBottom: "20px", fontFamily: "inherit", transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e8f4fd")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Create new account
        </button>
 
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#8e8e8e", fontSize: "13px" }}>
          <span style={{ fontSize: "16px", lineHeight: 1 }}>∞</span>
          <span style={{ fontWeight: "500" }}>Meta</span>
        </div>
      </div>
    </div>
  );
}
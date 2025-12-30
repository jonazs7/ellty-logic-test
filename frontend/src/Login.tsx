import React, { useState } from "react";
import axios from "axios";
import { Lock, User } from "lucide-react";

interface LoginProps {
  onAuthSuccess: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle antara Login dan Register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";
    try {
      const response = await axios.post(
        `http://localhost:3000/api/${endpoint}`,
        { username, password }
      );
      if (isLogin) {
        onAuthSuccess(response.data.user);
      } else {
        setMessage({
          text: "Akun berhasil dibuat! Silakan login.",
          type: "success",
        });
        setIsLogin(true); // Pindah ke mode login setelah daftar sukses
      }
    } catch (err: any) {
      setMessage({
        text: err.response?.data?.error || "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        width: "320px",
        margin: "20px auto",
        backgroundColor: "#fff",
      }}
    >
      <h2>{isLogin ? "Login" : "Daftar Akun"}</h2>
      {message.text && (
        <p style={{ color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <label>
            <User size={14} /> Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label>
            <Lock size={14} /> Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          {isLogin ? "Masuk" : "Daftar Sekarang"}
        </button>
      </form>

      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "none",
            color: "#646cff",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {isLogin ? " Daftar di sini" : " Login di sini"}
        </button>
      </p>
    </div>
  );
};

export default Login;

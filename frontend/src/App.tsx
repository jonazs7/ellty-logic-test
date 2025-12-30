import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import CalculationNode from "./CalculationTree";
import "./App.css";

function App() {
  const [user, setUser] = useState<any>(null);
  const [calculations, setCalculations] = useState<any[]>([]);
  const [newRootValue, setNewRootValue] = useState<number>(0);

  // AMBIL URL DARI ENVIRONMENT VARIABLE
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCalculations = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/calculations`);
      setCalculations(res.data);
    } catch (err) {
      console.error("Gagal mengambil data", err);
    }
  };

  useEffect(() => {
    fetchCalculations();
  }, []);

  useEffect(() => {
    fetchCalculations();
  }, [user]);

  const handleStartNew = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/calculations`, {
        userId: user.id,
        value: newRootValue,
        operator: null,
        parentId: null,
      });
      setNewRootValue(0);
      fetchCalculations();
    } catch (err) {
      alert("Gagal memulai diskusi baru");
    }
  };

  const rootNodes = calculations.filter((c) => c.parentId === null);

  return (
    <div
      className="App"
      style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Ellty Logic Test 🧮</h1>
        {user ? (
          <div>
            <span>
              Halo, <b>{user.username}</b>{" "}
            </span>
            <button
              onClick={() => setUser(null)}
              style={{ backgroundColor: "#ff4444" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <p style={{ color: "#666" }}>Login untuk mulai menghitung</p>
        )}
      </header>

      {!user && <Login onAuthSuccess={(userData) => setUser(userData)} />}

      {user && (
        <div
          style={{
            margin: "20px 0",
            padding: "15px",
            border: "1px solid #646cff",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          <h3>🚀 Mulai Diskusi Angka Baru</h3>
          <form
            onSubmit={handleStartNew}
            style={{ display: "flex", gap: "10px" }}
          >
            <input
              type="number"
              placeholder="Angka awal..."
              value={newRootValue}
              onChange={(e) => setNewRootValue(Number(e.target.value))}
              required
            />
            <button type="submit">Buat Root Node</button>
          </form>
        </div>
      )}

      <div style={{ marginTop: "30px", textAlign: "left" }}>
        <h2>Pohon Kalkulasi Global</h2>
        {rootNodes.length === 0 && <p>Belum ada data...</p>}
        {rootNodes.map((node) => (
          <CalculationNode
            key={node.id}
            node={node}
            allData={calculations}
            currentUserId={user?.id || null}
            onRefresh={fetchCalculations}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

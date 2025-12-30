import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import axios from "axios";

interface Calculation {
  id: string;
  value: number;
  operator: string | null;
  parentId: string | null;
  user: { username: string };
}

interface Props {
  node: Calculation;
  allData: Calculation[];
  currentUserId: string;
  onRefresh: () => void;
}

const CalculationNode: React.FC<Props> = ({
  node,
  allData,
  currentUserId,
  onRefresh,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [newValue, setNewValue] = useState<number>(0);
  const [operator, setOperator] = useState("+");

  const children = allData.filter((item) => item.parentId === node.id);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/calculations`, {
        userId: currentUserId,
        value: newValue,
        operator,
        parentId: node.id,
      });
      setShowReply(false);
      onRefresh();
    } catch (err) {
      alert("Gagal membalas kalkulasi");
    }
  };

  return (
    <div
      style={{
        marginLeft: node.parentId ? "30px" : "0",
        borderLeft: node.parentId ? "2px solid #ddd" : "none",
        paddingLeft: "15px",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #eee",
        }}
      >
        <small style={{ color: "#888" }}>
          Oleh: <b>{node.user?.username || "Guest"}</b>
        </small>
        <h3 style={{ margin: "5px 0" }}>
          {node.operator && (
            <span style={{ color: "#646cff" }}>{node.operator} </span>
          )}
          {node.value}
        </h3>

        {currentUserId && (
          <button
            onClick={() => setShowReply(!showReply)}
            style={{
              fontSize: "12px",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <MessageSquare size={14} /> Balas
          </button>
        )}

        {showReply && (
          <form
            onSubmit={handleReply}
            style={{ marginTop: "10px", display: "flex", gap: "5px" }}
          >
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>
            <input
              type="number"
              onChange={(e) => setNewValue(Number(e.target.value))}
              style={{ width: "60px" }}
              required
            />
            <button type="submit" style={{ backgroundColor: "#4CAF50" }}>
              Hitung
            </button>
          </form>
        )}
      </div>

      {children.map((child) => (
        <CalculationNode
          key={child.id}
          node={child}
          allData={allData}
          currentUserId={currentUserId}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default CalculationNode;

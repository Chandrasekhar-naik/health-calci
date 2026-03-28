import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="border p-2 w-full mb-2 rounded"
             value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="border p-2 w-full mb-2 rounded"
             value={password} onChange={e=>setPassword(e.target.value)} required />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}

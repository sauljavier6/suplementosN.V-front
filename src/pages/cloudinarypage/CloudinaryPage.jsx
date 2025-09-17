import React, { useState } from "react";
import Cloudinary from "../../components/cloudinary/Cloudinary";

// COMPONENTE DE LOGIN
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sesion/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");
      localStorage.setItem("token", data.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Iniciar Sesión
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Ingresar
      </button>

      {error && <p className="text-red-600 mt-3 text-sm text-center">{error}</p>}
    </form>
  );
}

// COMPONENTE DE REGISTRO
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sesion/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");
      setMsg("Usuario creado con éxito");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Registro</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700"
      >
        Registrar
      </button>

      {msg && <p className="text-green-600 mt-3 text-sm text-center">{msg}</p>}
      {error && <p className="text-red-600 mt-3 text-sm text-center">{error}</p>}
    </form>
  );
}

// PÁGINA PRINCIPAL
export default function CloudinaryPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="space-y-4 text-center">
          {showRegister ? (
            <>
              <Register />
              <p className="text-sm mt-4">
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setShowRegister(false)}
                  className="text-blue-600 hover:underline"
                >
                  Iniciar sesión
                </button>
              </p>
            </>
          ) : (
            <>
              <Login onLogin={() => setIsLoggedIn(true)} />
              <p className="text-sm mt-4">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-blue-600 hover:underline"
                >
                  Registrarse
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Subida de Imágenes</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
        <Cloudinary />
      </div>
    </div>
  );
}

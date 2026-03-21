import { useState } from "react";

const DeleteProduct = () => {
  const [name, setName] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!name.trim()) {
      setMessage("Escribe un nombre de producto");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setProduct(null);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/productos/producto/name/${encodeURIComponent(name)}`,
        { method: "GET" }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setProduct(data.data);
    } catch {
      setMessage("❌ Producto no encontrado");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product) return;

    const confirmDelete = window.confirm(
      `¿Seguro que deseas eliminar "${product.item_name}"?`
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/productos/deleteproducto/${product.ID_Product}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      setMessage("✅ Producto eliminado correctamente");
      setProduct(null);
      setName("");
    } catch {
      setMessage("❌ Error al eliminar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto border border-red-200">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        Eliminar Producto
      </h2>

      {/* BUSCADOR */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* MENSAJE */}
      {message && (
        <p className="mb-4 text-sm text-gray-700">{message}</p>
      )}

      {/* RESULTADO */}
      {product && (
        <div className="border p-4 rounded-md mb-4 bg-gray-50">
          <p className="font-semibold text-lg">{product.name}</p>
          <p className="text-sm text-gray-500">ID: {product.id}</p>
        </div>
      )}

      {/* BOTÓN ELIMINAR */}
      {product && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? "Eliminando..." : "Eliminar producto"}
        </button>
      )}
    </div>
  );
};

export default DeleteProduct
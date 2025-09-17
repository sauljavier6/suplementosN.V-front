import React, { useState, useEffect } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dsrxhrjfu/upload";
const UPLOAD_PRESET = "productos_upload";

const Cloudinary = () => {
  const [selectedFiles, setSelectedFiles] = useState([null, null, null, null, null]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async (folder) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/productos/images/${encodeURIComponent(folder)}`);
      if (!res.ok) throw new Error("Error al obtener imágenes");
      const images = await res.json();
      console.log('images',images)
      setExistingImages(images);
    } catch (error) {
      console.error("No se encontraron imágenes:", error);
      setExistingImages([]);
    }
  };

  useEffect(() => {
    if (!folderName.trim()) {
      setExistingImages([]);
      return;
    }
    fetchImages(folderName);
  }, [folderName]);

  const handleFileChange = (index, file) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async () => {
    setLoading(true);
    const urls = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      if (!selectedFiles[i]) continue;

      const formData = new FormData();
      formData.append("file", selectedFiles[i]);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", `productos/${folderName}`);
      formData.append("public_id", `img${i + 1}`);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      urls.push({ url: data.secure_url, public_id: data.public_id });
    }

    setUploadedUrls(urls);
    setLoading(false);
    fetchImages(folderName);
  };

  const handleDeleteImages = async () => {
    try {
      for (let img of uploadedUrls) {
        await fetch(`${import.meta.env.VITE_API_URL}/productos/deleteimagen`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: img.public_id }),
        });
      }
      setUploadedUrls([]);
      fetchImages(folderName);
      alert("Imágenes eliminadas correctamente");
    } catch (err) {
      alert("Error eliminando imágenes");
      console.error(err);
    }
  };

  const handleDeleteOne = async (public_id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/productos/deleteimagen`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id }),
      });
      fetchImages(folderName); // Refresca
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Imágenes</h2>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Nombre de la carpeta:</span>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Ej: Gymshark_Crew_Socks"
          className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      {/* Mostrar imágenes existentes cuando existan */}
      {existingImages.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Imágenes existentes:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {existingImages.map((img, i) => (
              <div
                key={i}
                className="relative border rounded-lg shadow-sm p-2 bg-gray-50 hover:shadow-md transition"
              >
                <img
                  src={img.secure_url}
                  alt={`Imagen existente ${i + 1}`}
                  className="w-full h-28 object-cover rounded-md"
                />
                <button
                  onClick={() => handleDeleteOne(img.public_id)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 shadow"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}




      {/* Mostrar imágenes subidas en esta sesión */}
      {uploadedUrls.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {uploadedUrls.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`Imagen subida ${i + 1}`}
                className="rounded-lg shadow-md border"
              />
            ))}
          </div>
          <button
            onClick={handleDeleteImages}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            Eliminar Imágenes Subidas
          </button>
        </>
      )}

      {/* Mostrar formulario solo si no hay imágenes subidas */}
      {uploadedUrls.length === 0 && (
        <>
          <div className="space-y-3 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <label className="text-gray-700 font-medium">Imagen {i + 1}:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(i, e.target.files[0])}
                  className="mt-1 block"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={!folderName.trim() || selectedFiles.every((f) => !f) || loading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Subiendo..." : "Subir Imágenes"}
          </button>
        </>
      )}
    </div>
  );
};

export default Cloudinary;

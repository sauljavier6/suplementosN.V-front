import React, { useState } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dsrxhrjfu/upload";
const UPLOAD_PRESET = "productos_upload";

const Cloudinary = () => {
  const [selectedFiles, setSelectedFiles] = useState([null, null, null, null, null]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [folderName, setFolderName] = useState("");

  const handleFileChange = (index, file) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async () => {
    const urls = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      if (!selectedFiles[i]) continue;

      const formData = new FormData();
      formData.append("file", selectedFiles[i]);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", `productos/${folderName}`);
      formData.append("public_id", `img${i + 1}`); // nombre fijo img1, img2, etc

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      urls.push(data.secure_url);
    }

    setUploadedUrls(urls);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Subir imágenes del producto</h2>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Nombre de la carpeta:</span>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Ej: Gymshark_Crew_Socks"
          className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

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
        disabled={!folderName.trim() || selectedFiles.every((f) => !f)}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        Subir Imágenes
      </button>

      {uploadedUrls.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {uploadedUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Subida ${i + 1}`}
              className="rounded-lg shadow-md border"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cloudinary;

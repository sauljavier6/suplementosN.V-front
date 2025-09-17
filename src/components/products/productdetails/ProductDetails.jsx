import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log('product',product)
  const [mainImage, setMainImage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/productos/producto/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((error) => console.error("Error al obtener producto:", error));
  }, [id]);

  useEffect(() => {
    if (!product?.item_name) return;

    const fetchImages = async () => {
      try {
        const cleanName = product?.item_name ? product.item_name.split(/[\/&]/)[0] : "";
        if (!cleanName) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/productos/images/${encodeURIComponent(cleanName)}`
        );
        
        if (!res.ok) throw new Error("Error al obtener imágenes");

        const data = await res.json();
        console.log('res',data)
        setImages(data);
        if (data.length > 0) {
          setMainImage(data[0].secure_url); 
        }
      } catch (err) {
        console.error("Error al obtener imágenes:", err);
        setImages([]);
      }
    };

    fetchImages();
  }, [product]);


  const suplementos = [
    'ec5d1aa5-d230-41aa-a7dc-fade78b0a441', '061950c4-73f1-410a-95f9-22a7a5f5558d',
    'e6f0b7cf-7aef-4892-929c-bda5b1009e0a', 'deb95bec-5df4-4e5b-99a8-ef6243c3a010',
    'fe41ea76-e1c0-4b0a-9af6-561102ad4490', '1907451b-4a87-4b53-875b-79b8b7735ed5',
    'a96452d8-71af-4bc1-8cc5-c1c9950d9639', '441a656e-f89d-458f-8444-cfd965d1d7b2',
    '97d25b2d-71b4-11ea-8d93-0603130a05b8', '97d25b14-71b4-11ea-8d93-0603130a05b8'
  ];

  if (!product) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (!isClient) return null;

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Galería de Imágenes */}
        <div className="flex flex-col">
          {mainImage && images.length > 0 ? (
            <img
              src={mainImage}
              alt="Imagen principal"
              width={300}
              height={300}
              className="rounded-lg w-full object-cover border"
            />
          ) : (
                <img
                  src={product.image_url}
                  alt="Imagen no disponible"
                  width={300}
                  height={300}
                  className="rounded-lg border"
                />
          )}

          {/* Miniaturas */}
          <div className="overflow-x-auto md:overflow-visible">
            <div className="flex gap-4 mt-4 w-max md:w-full">
              {images && images?.length > 0 ? (
                images?.map((img, i) => (
                  <img
                    key={i}
                    src={img.secure_url}
                    alt={`Miniatura ${i + 1}`}
                    width={100}
                    height={100}
                    className={`rounded-lg border cursor-pointer hover:opacity-80 shrink-0 ${
                      img.secure_url === mainImage ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setMainImage(img.secure_url)}
                  />
                ))
              ) : (
                <img
                  src={product.image_url}
                  alt="Imagen no disponible"
                  width={100}
                  height={100}
                  className="rounded-lg border"
                />
              )}
            </div>
          </div>
        </div>

        {/* Info del producto */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product?.item_name}</h1>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {product?.stock?.map((variant, i) => (
                  <div
                    key={i}
                    className="mb-4 p-3 border border-gray-200 rounded-md shadow-sm bg-white"
                  >
                    <div className="flex justify-between items-center gap-2">
                      {<p className="font-semibold text-gray-800">
                        {variant.option1_value && (
                          <span>
                            {suplementos.includes(product.category_id)
                              ? "Sabor: " + variant.option1_value
                              : "Talla: " + variant.option1_value}
                          </span>
                        )}
                      </p>}
                      <p className="text-sm text-gray-600">
                        Stock:{" "}
                        <span className="font-medium text-black">
                          {variant.totalVariantStock ?? "No definido"}
                        </span>
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-green-600 font-semibold">
                      Precio: $
                      {variant.default_price ?? "No disponible"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

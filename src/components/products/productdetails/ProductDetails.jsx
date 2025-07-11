import { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

  export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!id) return;

      fetch(`${import.meta.env.VITE_API_URL}/productos/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("data:", data)
          setProduct(data);
        })
        .catch((error) => console.error("Error al obtener producto:", error));
    }, [id]);
    
    const cleanName = product?.item_name ? product.item_name.split("/")[0] : "";

    const images = useMemo(() => {
      if (!cleanName) return [];
      return Array.from({ length: 5 }, (_, i) =>
        `https://res.cloudinary.com/dsrxhrjfu/image/upload/v1/productos/${cleanName}/img${i + 1}.jpg`
      );
    }, [cleanName]);

    useEffect(() => {
      if (images.length > 0) {
        setMainImage(images[0]);
      }
    }, [images]);

    const suplementos = ['ec5d1aa5-d230-41aa-a7dc-fade78b0a441', '061950c4-73f1-410a-95f9-22a7a5f5558d', 'e6f0b7cf-7aef-4892-929c-bda5b1009e0a', 'deb95bec-5df4-4e5b-99a8-ef6243c3a010', 'fe41ea76-e1c0-4b0a-9af6-561102ad4490', 
  '1907451b-4a87-4b53-875b-79b8b7735ed5', 'a96452d8-71af-4bc1-8cc5-c1c9950d9639', '441a656e-f89d-458f-8444-cfd965d1d7b2', '97d25b2d-71b4-11ea-8d93-0603130a05b8', '97d25b14-71b4-11ea-8d93-0603130a05b8'];


    if (!product) {
      return <p className="text-center mt-10">Loading products...</p>;
    }

    if (!isClient) return null;

    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Galería de Imágenes */}
          <div className="flex flex-col">
            {mainImage && (
              <img
                src={mainImage}
                alt="Imagen principal"
                width={300}
                height={300}
                className="rounded-lg w-full object-cover border"
              />
            )}

            {/* Miniaturas */}
            <div className="overflow-x-auto md:overflow-visible">
              <div className="flex gap-4 mt-4 w-max md:w-full">
                {images?.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`Miniatura ${i + 1}`}
                    width={100}
                    height={100}
                    className={`rounded-lg border cursor-pointer hover:opacity-80 shrink-0 ${
                      imgUrl === mainImage ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setMainImage(imgUrl)}
                  />
                ))}
              </div>
            </div>

            </div>


          {/* Info del producto */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.item_name}</h1>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                {product?.variants?.map((variant, i) => (
                <div key={i} className="mb-4 p-3 border border-gray-200 rounded-md shadow-sm bg-white">
                  <div className="flex justify-between items-center gap-2">
                    <p className="font-semibold text-gray-800">
                      {
                        variant.option1_value && (
                          <p>
                            {suplementos.includes(product.category_id)
                              ? 'Sabor: ' + variant.option1_value
                              : 'Talla: ' + variant.option1_value}
                          </p>
                        )
                      }
                    </p>
                    <p className="text-sm text-gray-600">
                      Stock: <span className="font-medium text-black">{variant.total_stock ?? "No definido"}</span>
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-green-600 font-semibold">
                    Precio: ${variant.stores[0]?.price.toFixed(2) ?? "No disponible"}
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

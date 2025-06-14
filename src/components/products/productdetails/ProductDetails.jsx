  import { useEffect, useState } from "react";
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
          if (data.image) {
            setMainImage(data.image);
          }
        })
        .catch((error) => console.error("Error al obtener producto:", error));
    }, [id]);
    
    useEffect(() => {
    if (product?.image_url) {
        setMainImage(product.image_url);
    }
    }, [product]);


    if (!product) {
      return <p className="text-center mt-10">Loading products...</p>;
    }

    if (!isClient) return null;

    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Galería de Imágenes */}
          <div className="flex flex-col">
            <img
              src={mainImage}
              alt={product.Descripcion}
              width={600}
              height={600}
              className="rounded-lg w-full object-cover border"
            />

            {/* Miniaturas */}
            <div className="flex gap-4 mt-4">
                <img
                src={product.image_url}
                alt="Miniatura"
                width={100}
                height={100}
                className={`rounded-lg border cursor-pointer hover:opacity-80 ${
                    product.image_url === mainImage ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setMainImage(product.image_url)}
                />
            </div>
            </div>


          {/* Info del producto */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.item_name}</h1>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                {product?.variants?.map((variant, i) => (
                <div key={i} className="mb-2">
                  <p>{variant.option1_value}</p>
                    {variant?.stores?.map((store, j) => (
                    <div key={j} className="text-black">
                        ${store.price ?? "Sin precio"} ({store.optimal_stock ?? "Stock no definido"})
                    </div>
                    ))}
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

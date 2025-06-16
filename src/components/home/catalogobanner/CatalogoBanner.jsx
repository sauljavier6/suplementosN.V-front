import { useEffect, useState } from "react";
import ProductCard from "../../productscard/ProductCard";

const marcas = [
  {
    Id: 1,
    Descripcion: "gymshark",    
    Imagen: "/carrusel/gymshark.avif",
  },
  {
    Id: 2,
    Descripcion: "underarmour",
    Imagen: "/carrusel/underarmour.jpg",
  },
  {
    Id: 3,
    Descripcion: "adidas",
    Imagen: "/carrusel/adidas.jpg",
  },
  {
    Id: 4,
    Descripcion: "nike",
    Imagen: "/carrusel/nike.jpg",
  },
  {
    Id: 5,
    Descripcion: "maxi",
    Imagen: "/carrusel/maxi.jpeg",
  },
  {
    Id: 6,
    Descripcion: "whey",
    Imagen: "/carrusel/whey.jpg",
  },
];


function CatalogoProducts() {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/productos`, {cache: 'no-store'});
        const data = await res.json();
        setProducts(data.items);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!isClient || isLoading) {
    return <h2 className="text-2xl text-center p-10">Cargando las mejores ofertas...</h2>;
  }
  
  return (   
    <div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md flex flex-wrap gap-4 justify-between text-black dark:text-white mb-4">
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/icons/compra-local.png" alt="local" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Locales establecidos</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/icons/carrito-de-compras.png" alt="carrito" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Amplia variedad de productos</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/icons/promocion.png" alt="Promocion" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Súper promociones</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/icons/apoyo.png" alt="apoyo" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Atención personalizada</p>
        </div>
        </div>

        <div className="w-full p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        </div>
        <div
          className="bg-white dark:bg-gray-800 p-4 text-black dark:text-white mt-4 rounded-lg"
          style={{ boxShadow: '0 -4px 6px -4px rgba(0,0,0,0.1)' }}
        >
          {/* Grid para pantallas chicas, flex solo en md hacia arriba */}
          <div className="grid grid-cols-3 gap-2 sm:flex">
            {marcas.map((marca) => (
              <img
                key={marca.Id}
                src={marca.Imagen}
                alt={marca.Descripcion}
                title={marca.Descripcion}
                className="w-full max-w-[140px] h-[80px] object-cover mx-auto transition-transform duration-200 hover:scale-105"
              />
            ))}
          </div>
        </div>
    </div>
  );
}

export default CatalogoProducts;


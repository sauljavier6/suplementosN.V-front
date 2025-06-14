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
    Imagen: "/public/carrusel/whey.jpg",
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
            <img src="/public/icons/compra-local.png" alt="local" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Locales establecidos</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/public/icons/carrito-de-compras.png" alt="carrito" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Amplia variedad Productos</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/public/icons/promocion.png" alt="Promocion" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Super Promos</p>
        </div>
        <div className="flex-1 min-w-[150px] flex flex-col items-center text-center">
            <img src="/public/icons/apoyo.png" alt="apoyo" className="w-12 h-12 mb-2" />
            <p className="font-semibold text-sm">Atencion personalizada</p>
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
          className="bg-white dark:bg-gray-800 p-4 shadow-md flex flex-wrap gap-4 justify-between text-black dark:text-white mt-4 relative"
          style={{ boxShadow: '0 -4px 6px -4px rgba(0,0,0,0.1)' }}
        >
          {marcas.map((marca) => (
            <img
              key={marca.Id}
              src={marca.Imagen}
              alt={marca.Descripcion}
              title={marca.Descripcion}
              className="w-[70px] h-[70px] object-cover"
            />
          ))}
        </div>
    </div>
  );
}

export default CatalogoProducts;


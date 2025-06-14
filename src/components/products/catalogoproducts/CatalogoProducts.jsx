import React, { useEffect, useState } from "react";
import ProductCard from "../../productscard/ProductCard";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

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


function CatalogoBanner() {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoria, busqueda } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
      if (!categoria) return;

      fetch(`${import.meta.env.VITE_API_URL}/catalogo/${categoria}?page=${page}&limit=12`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.items);
          setTotalPages(data.totalPages);
          setIsLoading(false);
        })
        .catch((error) => console.error("Error al obtener producto:", error));
    }, [categoria, page]);

  useEffect(() => {
      if (!busqueda) return;

      fetch(`${import.meta.env.VITE_API_URL}/busqueda/${busqueda}?page=${page}&limit=12`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.items);
          setTotalPages(data.totalPages);
          setIsLoading(false);
        })
        .catch((error) => console.error("Error al obtener producto:", error));
    }, [busqueda]);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
    

  if (!isClient || isLoading) {
    return <h2 className="text-2xl text-center p-10">Cargando las mejores ofertas...</h2>;
  }
  
  return (   
    <div>
        <div className="flex flex-col min-h-200 md:flex-row w-full gap-4">
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/4 bg-gradient-to-b from-white p-6 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-extrabold mb-6 text-blue-800 tracking-wide">Menú</h2>
          <nav className="flex flex-col gap-3">
            <div>
              <button
                onClick={() => toggleMenu("hombre")}
                className="w-full flex items-center justify-between text-gray-700 hover:text-blue-700 hover:bg-blue-100 transition-colors px-3 py-2 rounded-md"
              >
                <span className="flex gap-3 items-center">Hombre</span>
                <span>{openMenu === "hombre" ? <img src="/public/icons/flecha-negra.png" alt="flecha arriba" className="w-4 h-4 rotate-90"/> : <img src="/public/icons/flecha-negra.png" alt="flecha arriba" className="w-4 h-4 rotate-270"/>}</span>
              </button>
              {openMenu === "hombre" && (
              <div className="ml-6 mt-1 flex flex-col gap-2 text-sm text-gray-600">
                <Link to="/productos/0ce0a0e5-3897-4859-b8e2-eb1307eca211" className="hover:text-blue-600">DRAC SPORT</Link>
                <Link to="/productos/a6028cec-3718-4e4f-90b0-44cecbe430d9" className="hover:text-blue-600">Under Armour</Link>
                <Link to="/productos/53ab37e4-9ab8-4286-9f47-0641feb624b0" className="hover:text-blue-600">GymShark</Link>
                <Link to="/productos/55e68c28-2833-4bc6-a3e4-390f92436061" className="hover:text-blue-600">Ropa Hombre</Link>
              </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleMenu("mujer")}
                className="w-full flex items-center justify-between text-gray-700 hover:text-blue-700 hover:bg-blue-100 transition-colors px-3 py-2 rounded-md"
              >
                <span className="flex gap-3 items-center">Mujer</span>
                <span>{openMenu === "mujer" ? <img src="/public/icons/flecha-negra.png" alt="flecha arriba" className="w-4 h-4 rotate-90"/> : <img src="/public/icons/flecha-negra.png" alt="flecha arriba" className="w-4 h-4 rotate-270"/>}</span>
              </button>
              {openMenu === "mujer" && (
              <div className="ml-6 mt-1 flex flex-col gap-2 text-sm text-gray-600">
                <Link to="/productos/53ab37e4-9ab8-4286-9f47-0641feb624b0" className="hover:text-blue-600">GymShark</Link>
                <Link to="/productos/a6028cec-3718-4e4f-90b0-44cecbe430d9" className="hover:text-blue-600">Under Armour</Link>
              </div>
              )}
            </div>

            {/* Otros enlaces normales */}
            <a href="/productos/58d6f966-bc95-47d1-b9df-86c649bb4048" className="flex items-center gap-3 text-gray-700 hover:text-blue-700 hover:bg-blue-100 transition-colors px-3 py-2 rounded-md">
              Accesorios
            </a>
            <div>
              <button
                onClick={() => toggleMenu("suplementos")}
                className="w-full flex items-center justify-between text-gray-700 hover:text-blue-700 hover:bg-blue-100 transition-colors px-3 py-2 rounded-md"
              >
                <span className="flex gap-3 items-center">Suplementos</span>
                <span>{openMenu === "suplementos" ? <img src="/public/icons/flecha-negra.png" alt="flecha arriba" className="w-4 h-4 rotate-90"/> : <img src="/public/icons/flecha-negra.png" alt="flecha arriba" className="w-4 h-4 rotate-270"/>}</span>
              </button>
              {openMenu === "suplementos" && (
              <div className="ml-6 mt-1 flex flex-col gap-2 text-sm text-gray-600">
                <Link to="/productos/ec5d1aa5-d230-41aa-a7dc-fade78b0a441" className="hover:text-blue-600">Galletas/barritas/scoops</Link>
                <Link to="/productos/061950c4-73f1-410a-95f9-22a7a5f5558d" className="hover:text-blue-600">Vitaminas</Link>
                <Link to="/productos/e6f0b7cf-7aef-4892-929c-bda5b1009e0a" className="hover:text-blue-600">Carbohidratos</Link>
                <Link to="/productos/deb95bec-5df4-4e5b-99a8-ef6243c3a010" className="hover:text-blue-600">Glutamina</Link>
                <Link to="/productos/fe41ea76-e1c0-4b0a-9af6-561102ad4490" className="hover:text-blue-600">Gainer</Link>
                <Link to="/productos/1907451b-4a87-4b53-875b-79b8b7735ed5" className="hover:text-blue-600">Creatina</Link>
                <Link to="/productos/a96452d8-71af-4bc1-8cc5-c1c9950d9639" className="hover:text-blue-600">Termogenicos</Link>
                <Link to="/productos/441a656e-f89d-458f-8444-cfd965d1d7b2" className="hover:text-blue-600">Protreinas</Link>
                <Link to="/productos/97d25b2d-71b4-11ea-8d93-0603130a05b8" className="hover:text-blue-600">Prewokr-Out</Link>
                <Link to="/productos/97d25b14-71b4-11ea-8d93-0603130a05b8" className="hover:text-blue-600">Bcaa/Aminos</Link>
              </div>
              )}
            </div>
          </nav>
        </div>


          {/* Catálogo */}
          <div className="md:w-3/4 w-full p-2">
            {products.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-8">
                No hay productos disponibles en esta categoría.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>


        {/* paginacion */}
        <div className="flex flex-wrap justify-center sm:justify-end sm:pr-8 mr-0 sm:mr-5 gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-300"
          >
            <img src="/icons/flechas-negras.png" alt="Flecha derecha" className="w-4 h-4" />
          </button>

          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-300"
          >
            <img src="/icons/flecha-negra.png" alt="Flecha izquierda" className="w-4 h-4" />
          </button>


          {/* Renderizar números de página */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded ${
                page === num ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-300"
          >
            <img src="/icons/flecha-negra.png" alt="Flecha derecha" className="w-4 h-4 rotate-180" />
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-300"
          >
            <img src="/icons/flechas-negras.png" alt="Flecha derecha" className="w-4 h-4 rotate-180" />
          </button>
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

export default CatalogoBanner;


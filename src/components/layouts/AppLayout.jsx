import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [open, setOpen] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const toggleMenuSidebar = (menuName) => {
    setOpen(open === menuName ? null : menuName);
  };

  const handleIconClick = () => {
    setShowInput(true);
  };

  const handleBlur = () => {
    setShowInput(false);
  };

  // Función para manejar Enter en input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchInput.trim() !== "") {
        // Puedes pasar el texto como query param, state, o params
        navigate(`/productos/search/${encodeURIComponent(searchInput.trim())}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
    e.preventDefault();
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/productos/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        alert(`Correo ${data.message} registrado con éxito`);
        setEmail("")
      } catch (error) {
        console.error("Error al enviar correo:", error);
      }
    } 
  };


  return (
    <div>
      {/*Navbar medios y grandes*/}
      <div className="hidden md:block">
      <nav className="fixed top-0 z-50 w-full bg-black border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between px-4">
            <div></div>
            <ul className="flex gap-2" role="none">
              <li>
                <a href="https://www.facebook.com/share/1CqAqaxUYA/?mibextid=wwXIfr" className={styles.menuitem} role="menuitem" target="_blank" rel="noopener noreferrer"><img src="/icons/facebook.png" alt="facebook" className="w-[25px] h-auto filter" /></a>
              </li>
              <li>
                <a href="https://www.instagram.com/suplementos_n.v/?hl=es" className={styles.menuitem} role="menuitem" target="_blank" rel="noopener noreferrer"><img src="/icons/instagram.png" alt="instagram" className="w-[25px] h-auto filter" /></a>
              </li>
              <li>
              <a
                href="https://wa.me/5216462781997?text=Hola%20quiero%20más%20información%20sobre%20los%20productos"
                className={styles.menuitem}
                role="menuitem"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/whatsapp.png"
                  alt="whatsapp"
                  className="w-[25px] h-auto filter"
                />
              </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between px-15">
            <div className="flex items-center justify-start rtl:justify-end">
                <a href="/">
                  <img
                    src="/suplementosn.v.jpg"
                    alt="Logo Medicare"
                    className="h-12 me-3 rounded-3xl"
                  />
                </a>
            </div>
            <div className="flex items-center">
              <ul className="flex gap-6 text-blue-800 text-lg font-medium">
                <li>
                  <a href="/" className={styles.menuitem} role="menuitem">Inicio</a>
                </li>
                <li className="relative group">
                  <div className="flex items-center gap-1">
                    <p className={styles.menuitem}>Hombre</p>
                    <img src="/icons/flechasinfondo.png" alt="flechasinfondo" className="w-4 h-4" />
                  </div>
                  <ul className="absolute left-0 hidden group-hover:block bg-gray-800 shadow-lg rounded-lg w-40 z-10">
                    <li>
                      <Link to="/productos/a6028cec-3718-4e4f-90b0-44cecbe430d9" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                        Under Armour
                      </Link>
                    </li>
                    <li>
                      <Link to="/productos/53ab37e4-9ab8-4286-9f47-0641feb624b0" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                        GymShark
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="relative group">
                  <div className="flex items-center gap-1">
                    <p className={styles.menuitem}>Mujer</p>
                    <img src="/icons/flechasinfondo.png" alt="flechasinfondo" className="w-4 h-4" />
                  </div>
                  <ul className="absolute left-0 hidden group-hover:block bg-gray-800 shadow-lg rounded-lg w-45 z-10">
                    <li>
                      <Link to="/productos/a9aa671a-62ab-4312-bb84-093ee4a7cf1d" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                        GymShark
                      </Link>
                    </li>
                    <li>
                      <Link to="/productos/e49d2aa4-394a-4072-8ebc-f800265bf497" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                        Under Armour
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/productos/58d6f966-bc95-47d1-b9df-86c649bb4048" className={styles.menuitem} role="menuitem">
                    Accesorios
                  </Link>
                </li>
                <li className="relative group">
                  <div className="flex items-center gap-1">
                    <p className={styles.menuitem}>Suplementos</p>
                    <img src="/icons/flechasinfondo.png" alt="flechasinfondo" className="w-4 h-4" />
                  </div>
                  <ul className="absolute left-0 hidden group-hover:block bg-gray-800 shadow-lg rounded-lg w-60 z-10">
                  <li>
                    <Link to="/productos/ec5d1aa5-d230-41aa-a7dc-fade78b0a441" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Galletas/barritas/scoops
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/061950c4-73f1-410a-95f9-22a7a5f5558d" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Vitaminas
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/e6f0b7cf-7aef-4892-929c-bda5b1009e0a" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Carbohidratos
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/deb95bec-5df4-4e5b-99a8-ef6243c3a010" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Glutamina
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/fe41ea76-e1c0-4b0a-9af6-561102ad4490" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Gainer
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/1907451b-4a87-4b53-875b-79b8b7735ed5" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Creatina
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/a96452d8-71af-4bc1-8cc5-c1c9950d9639" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Termogenicos
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/441a656e-f89d-458f-8444-cfd965d1d7b2" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Proteínas
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/97d25b2d-71b4-11ea-8d93-0603130a05b8" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Prework-Out
                    </Link>
                  </li>
                  <li>
                    <Link to="/productos/97d25b14-71b4-11ea-8d93-0603130a05b8" className={`${styles.menuitem} block px-4 py-2 hover:bg-gray-100 rounded-lg`}>
                      Bcaa/Aminos
                    </Link>
                  </li>
                </ul>
                </li>
              </ul>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3 relative">
                {showInput ? (
                  <input
                    type="text"
                    onBlur={handleBlur}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar..."
                    className="border border-gray-100 bg-white text-black rounded px-2 py-1 w-full focus:outline-none focus:ring-0 focus:border-gray-100"
                    autoFocus
                  />
                ) : (
                  <img
                    src="/icons/vaso.png"
                    alt="buscar"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleIconClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      </div>

      {/* Navbar para móviles */}
      <div className="md:hidden">
        <nav className="fixed top-0 z-50 w-full bg-black border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-2">
            <a href="/">
              <img src="/suplementosn.v.jpg" alt="Logo" className="h-10 rounded-3xl" />
            </a>
            <button onClick={toggleMenu} className="text-white">
              <img src="/icons/barra-de-menus.png" alt="Menu" className="w-6 h-6" />
            </button>
          </div>

          {isOpen && (
            <ul className="flex flex-col px-4 pb-4 text-white space-y-3">
              <li><Link to="/" className={styles.menuitem}>Inicio</Link></li>

              {/* Menú desplegable Hombre */}
              <li>
                <details className="group">
                  <summary className={`${styles.menuitem} cursor-pointer flex items-center justify-between`}>
                    Hombre 
                    <span onClick={() => toggleMenuSidebar("hombre")} className="cursor-pointer">
                    {open==="hombre" ? (
                      <img
                        src="/icons/flechasinfondo.png"
                        alt="flecha abajo"
                        className="w-4 h-4 rotate-180"
                      />
                    ) : (
                      <img
                        src="/icons/flechasinfondo.png"
                        alt="flecha derecha"
                        className="w-4 h-4"
                      />
                    )}
                  </span>
                  </summary>
                  <ul className="ml-4 mt-2 space-y-2 text-sm">
                    <li><Link to="/productos/a6028cec-3718-4e4f-90b0-44cecbe430d9" className={styles.menuitem}>Under Armour</Link></li>
                    <li><Link to="/productos/53ab37e4-9ab8-4286-9f47-0641feb624b0" className={styles.menuitem}>GymShark</Link></li>
                  </ul>
                </details>
              </li>

              <li>
                <details className="group">
                  <summary className={`${styles.menuitem} cursor-pointer flex items-center justify-between`}>
                    Mujer
                  <span onClick={() => toggleMenuSidebar("mujer")} className="cursor-pointer">
                    {open==="mujer" ? (
                      <img
                        src="/icons/flechasinfondo.png"
                        alt="flecha abajo"
                        className="w-4 h-4 rotate-180"
                      />
                    ) : (
                      <img
                        src="/icons/flechasinfondo.png"
                        alt="flecha derecha"
                        className="w-4 h-4"
                      />
                    )}
                  </span>
                  </summary>
                  <ul className="ml-4 mt-2 space-y-2 text-sm">
                    <li><Link to="/productos/a9aa671a-62ab-4312-bb84-093ee4a7cf1d" className={styles.menuitem}>GymShark</Link></li>
                    <li><Link to="/productos/e49d2aa4-394a-4072-8ebc-f800265bf497" className={styles.menuitem}>Under Armour</Link></li>
                  </ul>
                </details>
              </li>

              <li><Link to="/productos/58d6f966-bc95-47d1-b9df-86c649bb4048" className={styles.menuitem}>Accesorios</Link></li>

              <li>
                <details className="group">
                  <summary className={`${styles.menuitem} cursor-pointer flex items-center justify-between`}>
                    Suplementos 
                  <span onClick={() => toggleMenuSidebar("suplementos")} className="cursor-pointer">
                    {open==="suplementos" ? (
                      <img
                        src="/icons/flechasinfondo.png"
                        alt="flecha abajo"
                        className="w-4 h-4 rotate-180"
                      />
                    ) : (
                      <img
                        src="/icons/flechasinfondo.png"
                        alt="flecha derecha"
                        className="w-4 h-4"
                      />
                    )}
                  </span>
                  </summary>
                  <ul className="ml-4 mt-2 space-y-2 text-sm">
                    <li><Link to="/productos/ec5d1aa5-d230-41aa-a7dc-fade78b0a441" className={styles.menuitem}>Galletas/barritas/scoops</Link></li>
                    <li><Link to="/productos/061950c4-73f1-410a-95f9-22a7a5f5558d" className={styles.menuitem}>Vitaminas</Link></li>
                    <li><Link to="/productos/e6f0b7cf-7aef-4892-929c-bda5b1009e0a" className={styles.menuitem}>Carbohidratos</Link></li>
                    <li><Link to="/productos/deb95bec-5df4-4e5b-99a8-ef6243c3a010" className={styles.menuitem}>Glutamina</Link></li>
                    <li><Link to="/productos/fe41ea76-e1c0-4b0a-9af6-561102ad4490" className={styles.menuitem}>Gainer</Link></li>
                    <li><Link to="/productos/1907451b-4a87-4b53-875b-79b8b7735ed5" className={styles.menuitem}>Creatina</Link></li>
                    <li><Link to="/productos/a96452d8-71af-4bc1-8cc5-c1c9950d9639" className={styles.menuitem}>Termogénicos</Link></li>
                    <li><Link to="/productos/441a656e-f89d-458f-8444-cfd965d1d7b2" className={styles.menuitem}>Proteínas</Link></li>
                    <li><Link to="/productos/97d25b2d-71b4-11ea-8d93-0603130a05b8" className={styles.menuitem}>Prework-Out</Link></li>
                    <li><Link to="/productos/97d25b14-71b4-11ea-8d93-0603130a05b8" className={styles.menuitem}>BCAA / Aminos</Link></li>
                  </ul>
                </details>
              </li>
              <li className="relative">
                {showInput ? (
                  <input
                    type="text"
                    onBlur={handleBlur}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown} // aquí
                    placeholder="Buscar..."
                    className="border border-gray-100 bg-white text-black rounded px-2 py-1 w-full focus:outline-none focus:ring-0 focus:border-gray-100"
                  />
                ) : (
                  <img
                    src="/icons/vaso.png"
                    alt="buscar"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleIconClick}
                  />
                )}
              </li>
            </ul>
          )}
        </nav>
      </div>


      <div className="pt-[56px] md:pt-[100px] w-full">
        <Outlet />
      </div>

      <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Nuestras Ubicaciones</h3>
          <div className="text-sm space-y-2">
            <p>
              <span className="font-semibold">Teléfono:</span> +52: 6462781997
            </p>
          </div>
          <div className="text-sm space-y-2 mt-4">
            <p>
              <span className="font-semibold">Dirección:</span> 206 Calle sexta, zona centro, Ensenada, Baja california, Mexico
            </p>
            <p>
              <span className="font-semibold">Dirección:</span> Blvd. Gral. Juan Zertuche 937, Valle Dorado, 22890 Ensenada, Baja california, Mexico
            </p>
            <p>
              <span className="font-semibold">Dirección:</span> Av. Diamante 2057, Hidalgo, 22880 Ensenada, Baja california, Mexico
            </p>
          </div>

        </div>

        {/* Columna de mapa */}
        <div className="md:w-1/2 w-full h-60 md:h-44 rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Mapa de ubicación"
            src="https://www.google.com/maps/d/u/0/embed?mid=12zu-u-wFLP80AqhFmDAMPwjnRexPOjg&ehbc=2E312F&noprof=1"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="border-0 w-full h-full"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-black text-center py-4 text-sm text-white gap-4">
        <p>UNETE Y RECIBE LAS MEJORES OFERTAS</p>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Correo"
            value={email}    
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleSubmit}
            className="w-full border border-white text-white bg-transparent px-4 py-2 pr-10 rounded"
            autoFocus
          />
          <img
            src="/icons/flechaabajo.png"
            alt="icon"
            className="w-5 h-5 absolute top-1/2 right-3 transform -translate-y-1/2 rotate-270"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-black text-center py-4 text-sm text-white">
        <p>&copy; 2025 SUPLEMENTOSN.V. Todos los derechos reservados. Powered by <span className="font-semibold">SWS Souls Web Solutions</span>.</p>
      </div>
      </footer>

    </div>
  );
};

export default AppLayout;      


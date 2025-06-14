
function CollageBanner() {
  
  return (   
    <>
    <div className="bg-black flex justify-between items-center p-6">
    <div>
        <h1 className="font-semibold text-white">Instagram</h1>
        <p className="text-[12px] text-white mt-4">#SUPLEMENTOSN.V</p>
    </div>
    <div>
        
      <a href="https://www.instagram.com/suplementos_n.v/?hl=es" role="menuitem" target="_blank" rel="noopener noreferrer"><img src="/icons/instagram.png" alt="instagram" className="w-12 h-12" /></a>
    </div>
    </div> 

    <div className="bg-black w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 p-4">
    {[
        "/carrusel/H691552b05de0485a9f3ee4d666b10405Y.png",
        "/carrusel/H1faa3e5d7c8646e689eb3567d166e313B.png",
        "/carrusel/02e0533be2dba4eb0c6e862e7a310344.png",
        "/carrusel/fe14f5e80230117ebf14d7912598cd9e.png",
        "/carrusel/entrenamiento_reebok_mujer_dt.png",
        "/carrusel/a2f37ee44c22662672d65ed1289c08cc.png",
        "/carrusel/eb32abf202ca1eb048bd9492b81ff3e5.png",
        "/carrusel/172ecd884bae61560e89a1e2f342fbd3.png",
    ].map((src, index) => (
        <div key={index} className="w-full aspect-square overflow-hidden shadow">
        <img
            src={src}
            alt={`Foto ${index + 1}`}
            className="w-full h-full object-cover"
        />
        </div>
    ))}
    </div>
    </>

  );
}

export default CollageBanner;


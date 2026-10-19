import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Importa la conexión a Firebase
import { collection, getDocs } from 'firebase/firestore';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  Compass, 
  ChevronRight, 
  Menu, 
  X,
  ExternalLink,
  CheckCircle2,
  Globe,
  Clock
} from 'lucide-react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtroDestino, setFiltroDestino] = useState('Todos');

  // Estados para los paquetes dinámicos de Firebase
  const [paquetes, setPaquetes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Leer paquetes en tiempo real desde Firebase (colección 'paquetes_web') filtrando los suspendidos
  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "paquetes_web"));
        const listaPaquetes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(p => p.activo !== false); // <--- Filtro que oculta los paquetes suspendidos

        setPaquetes(listaPaquetes);
      } catch (error) {
        console.error("Error al obtener los paquetes desde Firebase:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPaquetes();
  }, []);

  const paquetesFiltrados = filtroDestino === 'Todos' 
    ? paquetes 
    : paquetes.filter(p => p.categoria === filtroDestino);

  const telefonoWhatsApp = '5492236080835'; // Actualizar con el número real de la agencia

  const handleConsultarWhatsApp = (tituloPaquete) => {
    const mensaje = encodeURIComponent(`Hola Flysoon Viajes! 👋 Me interesa recibir más información y asesoramiento sobre el paquete: *${tituloPaquete}*. ¿Me podrían dar detalles?`);
    window.open(`https://wa.me/${telefonoWhatsApp}?text=${mensaje}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* HEADER / BARRA DE NAVEGACIÓN */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logoig.png" alt="Flysoon Viajes" className="h-9 w-auto object-contain" />
            <div>
              <span className="text-xl font-bold tracking-tight text-white">Flysoon<span className="text-blue-500">Viajes</span></span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Sistema Integral de Turismo</p>
            </div>
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
            <a href="#inicio" className="hover:text-blue-400 transition-colors">Inicio</a>
            <a href="#paquetes" className="hover:text-blue-400 transition-colors">Paquetes</a>
            <a href="#servicios" className="hover:text-blue-400 transition-colors">Servicios & Visas</a>
            <a href="#contacto" className="hover:text-blue-400 transition-colors">Contacto</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a 
              href={`https://wa.me/${telefonoWhatsApp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-900/20 transition-all cursor-pointer"
            >
              <MessageCircle size={18} /> WhatsApp Directo
            </a>
          </div>

          {/* Botón Menú Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-300 p-2 cursor-pointer">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú Mobile desplegable */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-4 shadow-2xl">
            <a href="#inicio" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-300">Inicio</a>
            <a href="#paquetes" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-300">Paquetes</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-300">Servicios & Visas</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-300">Contacto</a>
            <a 
              href={`https://wa.me/${telefonoWhatsApp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white w-full py-3 rounded-xl font-semibold text-sm shadow-md"
            >
              <MessageCircle size={18} /> WhatsApp Directo
            </a>
          </div>
        )}
      </header>

      {/* SECCIÓN HERO / INICIO */}
      <section id="inicio" className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80" 
            alt="Viajes y Turismo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-3.5 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md">
            <Compass size={14} /> Gestión y Experiencias de Viaje Profesionales
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-2xl leading-tight">
            Tu próximo destino con <span className="text-blue-500">Flysoon Viajes</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            Planificamos cada detalle de tu viaje con el respaldo de un sistema profesional: vuelos, alojamientos, paquetes a medida y asesoramiento consular experto.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#paquetes" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30"
            >
              Ver Paquetes <ChevronRight size={18} />
            </a>
            <a 
              href={`https://wa.me/${telefonoWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-6 py-3.5 rounded-xl font-semibold backdrop-blur-md transition-all"
            >
              <MessageCircle size={18} /> Consultar Asesor
            </a>
          </div>
        </div>
      </section>

      {/* CATÁLOGO DINÁMICO DE PAQUETES */}
      <section id="paquetes" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Catálogo en línea</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Paquetes y Destinos Destacados</h2>
          </div>

          {/* Filtros de categoría */}
          <div className="flex gap-2">
            {['Todos', 'Internacional', 'Nacional'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroDestino(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filtroDestino === cat 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Paquetes Dinámicos */}
        {cargando ? (
          <div className="text-center py-20 text-slate-400 font-medium">Cargando destinos desde el sistema...</div>
        ) : paquetesFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-8 space-y-2">
            <p className="text-slate-300 font-semibold text-base">No hay paquetes publicados en esta categoría.</p>
            <p className="text-slate-400 text-xs">Carga nuevos paquetes desde la sección de Gestión Web en tu sistema interno para verlos reflejados aquí.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paquetesFiltrados.map((paquete) => (
              <div key={paquete.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/80 shadow-lg overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img 
                      src={paquete.imagen} 
                      alt={paquete.titulo} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800'; }}
                    />
                    <span className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                      {paquete.duracion}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">{paquete.categoria}</span>
                    <h3 className="font-bold text-white text-base leading-snug">{paquete.titulo}</h3>
                    <p className="text-xs text-slate-400 font-normal leading-relaxed">{paquete.descripcion}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-700/60 mt-4 pt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Precio final</span>
                    <span className="font-black text-white text-lg">
                      {paquete.precio} {paquete.categoria === 'Internacional' ? 'USD' : 'ARS'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleConsultarWhatsApp(paquete.titulo)}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle size={14} /> Consultar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section id="servicios" className="bg-slate-950 py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Soluciones Integrales</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Servicios Profesionales para Viajeros</h2>
            <p className="text-slate-400 text-sm font-normal">
              Contamos con un flujo de trabajo optimizado para gestionar cada aspecto de tu viaje con máxima seguridad y eficiencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold">
                ✈️
              </div>
              <h3 className="text-lg font-bold text-white">Vuelos y Alojamientos</h3>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                Emisión de pasajes aéreos nacionales e internacionales, reservas hoteleras y alquiler de vehículos con tarifas competitivas y confirmación inmediata.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold">
                🏛️
              </div>
              <h3 className="text-lg font-bold text-white">Gestión de Visas y Pasaportes</h3>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                Seguimiento exhaustivo de fechas de vencimiento, asesoramiento consular especializado para visas (como EE.UU. B1/B2) y control de documentación.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-white">Asistencia al Viajero</h3>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                Cobertura médica integral internacional y seguros de viaje para que cuentes con soporte y tranquilidad absoluta las 24 horas del día.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN CONTACTO */}
      <section id="contacto" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 border border-blue-700/50 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Atención personalizada</span>
            <h2 className="text-3xl font-black tracking-tight">¿Comenzamos a planificar tu viaje?</h2>
            <p className="text-blue-100 text-sm font-normal">
              Escríbenos directamente a nuestro canal de WhatsApp para recibir asesoramiento rápido y a medida.
            </p>
          </div>
          <a
            href={`https://wa.me/${telefonoWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <MessageCircle size={20} /> Abrir WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/logoig.png" alt="Flysoon Viajes" className="h-8 w-auto object-contain" />
            <span className="text-lg font-bold text-white">Flysoon<span className="text-blue-500">Viajes</span></span>
          </div>
          <p className="text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} Flysoon Viajes. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="#inicio" className="hover:text-slate-300 transition-colors">Términos</a>
            <a href="#inicio" className="hover:text-slate-300 transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
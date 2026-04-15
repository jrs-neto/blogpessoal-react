import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { House, Article, ListPlus, UserCircle, SignOut, Cube } from "@phosphor-icons/react";

function Navbar() {

  const navigate = useNavigate();

  const { handleLogout, usuario } = useContext(AuthContext);

  function logout() {
    handleLogout()
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'sucesso')
    navigate('/')
  }

  let component: ReactNode

  if (usuario.token !== "") {
    component = (
      <nav className='sticky top-0 z-50 w-full flex justify-center py-3 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'>
        <div className='container flex justify-between items-center px-6 lg:px-12'>
          
          <Link to='/home' className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
              <Cube size={24} weight="fill" className="text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight hidden sm:block">
              Blog<span className="text-indigo-600">Pessoal</span>
            </span>
          </Link>

          <div className='flex items-center gap-1 md:gap-4'>
            <Link to='/home' className='p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-semibold text-sm md:text-base'>
              <House size={20} weight="bold" />
              <span className="hidden md:inline">Home</span>
            </Link>
            
            <Link to='/postagens' className='p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-semibold text-sm md:text-base'>
              <Article size={20} weight="bold" />
              <span className="hidden md:inline">Postagens</span>
            </Link>
            
            <Link to='/temas' className='p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-semibold text-sm md:text-base'>
              <ListPlus size={20} weight="bold" />
              <span className="hidden md:inline">Temas</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 mx-1 md:mx-2"></div>

            <Link to='/perfil' className="p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-semibold text-sm md:text-base">
              <UserCircle size={22} weight="bold" />
              <span className="hidden md:inline">Perfil</span>
            </Link>

            <button 
              onClick={logout} 
              className="p-2 md:px-3 md:py-2 rounded-xl flex items-center gap-2 text-red-500 hover:bg-red-50 transition-all font-bold text-sm md:text-base cursor-pointer"
            >
              <SignOut size={22} weight="bold" />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </div>
      </nav >
    )
  }

  return (
    <>
      {component}
    </>
  )
}

export default Navbar;
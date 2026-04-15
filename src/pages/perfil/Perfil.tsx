import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { UserCircle, EnvelopeSimple, PencilSimple, Camera } from "@phosphor-icons/react"

function Perfil() {
  const navigate = useNavigate()

  const { usuario } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", 'info')
      navigate("/")
    }
  }, [token])

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">

        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">

          <div className="relative h-64 bg-indigo-600 overflow-hidden">
            <img
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
              alt="Capa do Perfil"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="relative px-8 pb-12">
            <div className="flex flex-col items-center -mt-24 sm:flex-row sm:items-end sm:gap-8">
              <div className="relative group">
                <img
                  className="w-48 h-48 rounded-[32px] border-8 border-white shadow-2xl object-cover bg-white"
                  src={usuario.foto || 'https://i.imgur.com/8RK9k6J.png'}
                  alt={`Foto de perfil de ${usuario.nome}`}
                />
                <button className="absolute bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg border-4 border-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <Camera size={20} weight="bold" />
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center sm:items-start flex-grow">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                  {usuario.nome}
                </h1>
                <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mt-1">
                  Autor Independente
                </p>
              </div>

              <div className="mt-8 sm:mt-0">
                <Link to={`/atualizarperfil`}>
                  <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200">
                    <PencilSimple size={20} weight="bold" />
                    <span>Editar Perfil</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-12 border-t border-slate-100">
              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <UserCircle size={28} weight="bold" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Nome Completo</p>
                  <p className="text-lg font-bold text-slate-800">{usuario.nome}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <EnvelopeSimple size={28} weight="bold" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email de Acesso</p>
                  <p className="text-lg font-bold text-slate-800">{usuario.usuario}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil;
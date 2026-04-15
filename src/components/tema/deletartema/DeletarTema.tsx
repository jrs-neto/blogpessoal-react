import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Trash, WarningCircle, ArrowLeft, Tag } from "@phosphor-icons/react";

function DeletarTema() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tema, setTema] = useState<Tema>({} as Tema);

  const { usuario, handleLogout } = useContext(AuthContext);

  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarTemaPorId() {
    try {
      setIsLoading(true)
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info');
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId()
    }
  }, [id])

  function retornar() {
    navigate('/temas')
  }

  async function deletarTema() {
    setIsLoading(true)
    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      })
      ToastAlerta('Tema deletado com sucesso!', 'sucesso')
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar o Tema.', 'erro')
      }
    }
    setIsLoading(false)
    retornar()
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center py-12 px-6 font-inter'>
      <div className='w-full max-w-xl bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden'>

        <div className="bg-red-50 p-10 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center text-red-600 shadow-inner">
            <WarningCircle size={48} weight="bold" />
          </div>
          <div className="space-y-2">
            <h1 className='text-3xl font-black text-slate-900 tracking-tight'>Deletar Categoria</h1>
            <p className='text-slate-500 font-medium max-w-xs mx-auto'>
              Atenção! Ao deletar um tema, todas as postagens atreladas a ele também podem ser afetadas.
            </p>
          </div>
        </div>

        <div className="p-10 space-y-8">
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center gap-3">
            <div className="flex items-center gap-2 text-indigo-600">
              <Tag size={20} weight="bold" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Tema a ser removido</span>
            </div>
            <p className="text-2xl font-black text-slate-800 tracking-tight">
              {tema.descricao}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={retornar}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl text-slate-600 font-black bg-slate-100 hover:bg-slate-200 transition-all uppercase tracking-widest text-sm"
            >
              <ArrowLeft size={20} weight="bold" />
              <span>Cancelar</span>
            </button>

            <button
              onClick={deletarTema}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl text-white font-black bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all shadow-xl shadow-red-100 uppercase tracking-widest text-sm"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <>
                  <Trash size={20} weight="bold" />
                  <span>Confirmar</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
export default DeletarTema;
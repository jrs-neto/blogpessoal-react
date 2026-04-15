import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [postagens, setPostagens] = useState<Postagem[]>([])

  const { usuario, handleLogout, isLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    if (token === '') {

      if (!isLogout) {
        ToastAlerta('Você precisa estar logado!', "info")
      }

      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarPostagens()
  }, [postagens.length])

  async function buscarPostagens() {
    try {

      setIsLoading(true)

      await buscar('/postagens', setPostagens, {
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

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center">
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <SyncLoader
            color="#4f46e5"
            size={18}
            margin={4}
          />
          <span className="text-indigo-600 font-black uppercase tracking-widest text-xs">Carregando Feed...</span>
        </div>
      )}

      {!isLoading && postagens.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 w-full max-w-2xl mx-auto shadow-sm">
          <span className="text-2xl font-black text-slate-800 tracking-tight">Feed Vazio</span>
          <p className="text-slate-500 font-medium">Seja o primeiro a compartilhar algo incrível!</p>
        </div>
      )}

      {!isLoading && postagens.length > 0 && (
        <div className="container mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postagens.map((postagem) => (
              <CardPostagem key={postagem.id} postagem={postagem} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default ListaPostagens;
import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Tag, ArrowLeft, FloppyDisk } from "@phosphor-icons/react";

function FormTema() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tema, setTema] = useState<Tema>({} as Tema)

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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    })
  }

  async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar('/temas', tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta('Tema atualizado com sucesso!', 'sucesso')
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao Atualizar o Tema!', 'erro')
        }
      }
    } else {
      try {
        await cadastrar('/temas', tema, setTema, {
          headers: { Authorization: token },
        })
        ToastAlerta('Tema cadastrado com sucesso!', 'sucesso')
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao Cadastrar o Tema!', 'erro')
        }
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate('/temas')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">

        <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex flex-col gap-2">
            <button
              onClick={retornar}
              className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors text-sm font-bold w-fit mb-2"
            >
              <ArrowLeft size={16} weight="bold" />
              <span>Voltar aos Temas</span>
            </button>
            <h1 className="text-3xl font-black tracking-tight uppercase">
              {id === undefined ? "Novo Tema" : "Editar Tema"}
            </h1>
            <p className="text-indigo-100/80 font-medium">
              Defina uma categoria clara para as postagens do seu blog.
            </p>
          </div>
        </div>

        <form className="p-8 space-y-8" onSubmit={gerarNovoTema}>
          <div className="space-y-2">
            <label htmlFor="descricao" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
              Descrição do Tema
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Tag size={22} weight="bold" />
              </div>
              <input
                type="text"
                placeholder="Ex: Tecnologia, Viagens, Saúde..."
                name="descricao"
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                value={tema.descricao}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-4 px-4 rounded-2xl text-white font-black bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed text-lg uppercase tracking-widest"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <div className="flex items-center gap-2">
                <span>{id === undefined ? 'Cadastrar Tema' : 'Salvar Alterações'}</span>
                <FloppyDisk size={24} weight="bold" />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormTema;
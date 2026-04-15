import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type Tema from "../../../models/Tema";
import type Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { TextT, Article, Tag, FloppyDisk, ArrowLeft } from "@phosphor-icons/react";

function FormPostagem() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [temas, setTemas] = useState<Tema[]>([])

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' })
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    buscarTemas()

    if (id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id])

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    })
  }, [tema])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    })
  }

  function retornar() {
    navigate('/postagens')
  }

  async function gerarNovaPostagem(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        },
        );
        ToastAlerta('Postagem atualizada com sucesso', 'sucesso')
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar a Postagem', 'erro')
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        },
        )
        ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrar a Postagem', 'erro')
        }
      }
    }

    setIsLoading(false)
    retornar()
  }

  const carregandoTema = tema.descricao === '';

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">

        <button
          onClick={retornar}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-bold mb-6 group w-fit cursor-pointer"
        >
          <ArrowLeft size={18} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar às Postagens</span>
        </button>

        <h1 className="text-4xl font-black text-slate-900 tracking-tight text-center mb-10">
          {id !== undefined ? 'Editar Postagem' : 'Criar Nova Postagem'}
        </h1>

        <form className="space-y-6" onSubmit={gerarNovaPostagem}>
          <div className="space-y-2">
            <label htmlFor="titulo" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
              Título
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <TextT size={22} weight="bold" />
              </div>
              <input
                type="text"
                placeholder="Dê um título atraente..."
                name="titulo"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                value={postagem.titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="texto" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
              Conteúdo
            </label>
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Article size={22} weight="bold" />
              </div>
              <textarea
                placeholder="Escreva seus pensamentos aqui..."
                name="texto"
                required
                rows={5}
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold min-h-[150px]"
                value={postagem.texto}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tema" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
              Tema
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Tag size={22} weight="bold" />
              </div>
              <select
                name="tema"
                id="tema"
                defaultValue=""
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold appearance-none"
                onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
              >
                <option value="" disabled>Escolha um tema para sua postagem</option>
                {temas.map((tema) => (
                  <option key={tema.id} value={tema.id}>{tema.descricao}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-4 rounded-2xl text-white font-black bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg uppercase tracking-widest"
              disabled={carregandoTema || isLoading}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <div className="flex items-center gap-2">
                  <span>{id === undefined ? 'Publicar Postagem' : 'Salvar Alterações'}</span>
                  <FloppyDisk size={24} weight="bold" />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormPostagem;
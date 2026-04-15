import { type ChangeEvent, type SyntheticEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Usuario from "../../models/Usuario"
import { atualizar, buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { User, EnvelopeSimple, Image, LockSimple, FloppyDisk, ArrowLeft } from "@phosphor-icons/react";

function AtualizarPerfil() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [user, setUser] = useState<Usuario>({} as Usuario)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const { usuario, handleLogout, isLogout } = useContext(AuthContext)
  const token = usuario.token
  const id: string = usuario.id.toString()

  async function buscarUsuarioPorId() {
    try {
      await buscar(`/usuarios/${id}`, setUser, {
        headers: {
          Authorization: token,
        },
      })

      setUser((user) => ({ ...user, senha: "" }))
      setConfirmarSenha("")

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      } else {
        ToastAlerta("Usuário não encontrado!", 'erro')
        retornar()
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      if (!isLogout) {
        ToastAlerta("Você precisa estar logado!", "info")
      }

      navigate("/")
    }
  }, [token])

  useEffect(() => {
    setUser({} as Usuario)
    setConfirmarSenha("")
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      buscarUsuarioPorId()
    }
  }, [id])

  function retornar() {
    navigate("/perfil")
  }

  function sucesso() {
    handleLogout()
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (confirmarSenha === user.senha && user.senha.length >= 8) {
      try {
        await atualizar(`/usuarios/atualizar`, user, setUser, {
          headers: {
            Authorization: token,
          },
        })
        ToastAlerta("Usuário atualizado com sucesso! \n Efetue o Login Novamente!", "sucesso")
        sucesso()
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout()
        } else {
          ToastAlerta("Erro ao atualizar o usuário!", 'erro')
          retornar()
        }
      }
    } else {
      ToastAlerta("Dados inconsistentes. Verifique a senha (min. 8 caracteres).", 'erro')
      setUser({ ...user, senha: "" })
      setConfirmarSenha("")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]">

            <div className="bg-indigo-600 p-12 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 text-center space-y-6">
                <div className="relative inline-block">
                  <img
                    src={user.foto || 'https://i.imgur.com/8RK9k6J.png'}
                    alt={user.nome}
                    className="w-48 h-48 object-cover rounded-[32px] border-8 border-white/20 shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg">
                    <User size={24} weight="bold" />
                  </div>
                </div>
                <div>
                  <h2 className="text-white text-3xl font-black tracking-tight">{user.nome || "Seu Nome"}</h2>
                  <p className="text-indigo-100 font-bold opacity-80 mt-1 uppercase tracking-widest text-xs">Pré-visualização do Perfil</p>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-16 space-y-10">
              <div className="space-y-2">
                <button
                  onClick={retornar}
                  className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors mb-2 group cursor-pointer"
                >
                  <ArrowLeft size={18} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                  Voltar ao Perfil
                </button>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Editar Perfil</h1>
                <p className="text-slate-500 font-medium">Mantenha seus dados sempre atualizados.</p>
              </div>

              <form onSubmit={atualizarUsuario} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="nome" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                    Nome Completo
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                      <User size={20} weight="bold" />
                    </div>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Seu nome"
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                      value={user.nome || ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="usuario" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                    E-mail (Não alterável)
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300">
                      <EnvelopeSimple size={20} weight="bold" />
                    </div>
                    <input
                      type="email"
                      id="usuario"
                      name="usuario"
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-100 border-2 border-slate-100 rounded-2xl text-slate-400 font-semibold cursor-not-allowed"
                      disabled
                      value={user.usuario || ""}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="foto" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                    URL da Foto
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                      <Image size={20} weight="bold" />
                    </div>
                    <input
                      type="url"
                      id="foto"
                      name="foto"
                      placeholder="Link da imagem"
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                      value={user.foto || ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="senha" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                      Nova Senha
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <LockSimple size={20} weight="bold" />
                      </div>
                      <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Mín. 8 caracteres"
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold italic"
                        value={user.senha || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                        minLength={8}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="confirmarSenha" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                      Confirmar Senha
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <LockSimple size={20} weight="bold" />
                      </div>
                      <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        placeholder="Repita a senha"
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold italic"
                        value={confirmarSenha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-4 px-4 rounded-2xl text-white font-black bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed text-lg uppercase tracking-widest"
                  >
                    {isLoading ? (
                      <ClipLoader color="#ffffff" size={24} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Atualizar Perfil</span>
                        <FloppyDisk size={24} weight="bold" />
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AtualizarPerfil;
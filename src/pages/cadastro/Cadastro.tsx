import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { User, EnvelopeSimple, Image, LockSimple, UserPlus, ArrowLeft } from "@phosphor-icons/react";
import cadastroBg from "../../assets/cadastro_bg.png";

function Cadastro() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsLoading(true)

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);
        ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso')
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!', 'erro');
      }
    } else {
      ToastAlerta('Dados inconsistentes. Verifique a senha (mínimo 8 caracteres).', 'info')
      setUsuario({ ...usuario, senha: '' })
      setConfirmarSenha('')
    }

    setIsLoading(false)
  }

  function retornar() {
    navigate('/')
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-inter bg-white">

      <div className="hidden lg:flex relative flex-col items-center justify-center p-12 text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 scale-100"
          style={{
            backgroundImage: `url(${cadastroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h2 className="text-5xl font-black leading-tight">
            Comece sua jornada <br />
            <span className="text-indigo-400">como autor.</span>
          </h2>
          <p className="text-slate-200 text-xl font-medium opacity-90 leading-relaxed">
            Crie sua conta em poucos segundos e junte-se à nossa comunidade de pensadores e escritores.
          </p>
          <div className="h-1.5 w-24 bg-indigo-500 rounded-full mt-8"></div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-8">

          <div className="space-y-2">
            <button
              onClick={retornar}
              className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors mb-4 group cursor-pointer"
            >
              <ArrowLeft size={18} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
              Voltar ao Login
            </button>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Criar Conta</h1>
            <p className="text-slate-500 text-lg">Faça parte da nossa rede de conhecimento.</p>
          </div>

          <form className="space-y-4" onSubmit={cadastrarNovoUsuario}>
            <div className="grid grid-cols-1 gap-4">

              <div className="space-y-1.5 transition-all">
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
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                    value={usuario.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="usuario" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                  Email / Usuário
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <EnvelopeSimple size={20} weight="bold" />
                  </div>
                  <input
                    type="email"
                    id="usuario"
                    name="usuario"
                    placeholder="exemplo@email.com"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                    value={usuario.usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="foto" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                  URL da Foto (Opcional)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Image size={20} weight="bold" />
                  </div>
                  <input
                    type="url"
                    id="foto"
                    name="foto"
                    placeholder="Link da sua imagem"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                    value={usuario.foto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="senha" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                    Senha
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                      <LockSimple size={20} weight="bold" />
                    </div>
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="Min. 8 chars"
                      className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold italic"
                      value={usuario.senha}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="confirmarSenha" className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">
                    Confirmar
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
                      className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold italic"
                      value={confirmarSenha}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-4 rounded-xl text-white font-black bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed text-lg uppercase tracking-widest"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={24} />
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Finalizar Cadastro</span>
                    <UserPlus size={24} weight="bold" />
                  </div>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-slate-500 font-medium">
            Já possui uma conta?{' '}
            <Link
              to="/"
              className="font-black text-indigo-600 hover:text-indigo-800 transition-colors border-b-2 border-indigo-100 hover:border-indigo-600"
            >
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro;
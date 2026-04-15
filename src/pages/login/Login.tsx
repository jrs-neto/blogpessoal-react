import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import { EnvelopeSimple, LockSimple, SignIn } from "@phosphor-icons/react";
import blogSide from "../../assets/blog_side.png";

function Login() {

  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-inter bg-white">

      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-10 group/form">

          <div className="space-y-3">
            <div className="w-12 h-1.5 bg-indigo-600 rounded-full mb-6"></div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
              Acesse seu Blog
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Entre para gerenciar suas publicações e ver as novidades.
            </p>
          </div>

          <form className="space-y-6" onSubmit={login}>
            <div className="space-y-2">
              <label htmlFor="usuario" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/form:text-indigo-500 transition-colors">
                  <EnvelopeSimple size={22} weight="bold" />
                </div>
                <input
                  type="email"
                  id="usuario"
                  name="usuario"
                  placeholder="seu_usuario"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                  value={usuarioLogin.usuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="senha" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Senha
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/form:text-indigo-500 transition-colors">
                  <LockSimple size={22} weight="bold" />
                </div>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                  value={usuarioLogin.senha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 rounded-2xl text-white font-black bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed text-lg uppercase tracking-widest mt-4"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <div className="flex items-center gap-2">
                  <span>Entrar</span>
                  <SignIn size={24} weight="bold" />
                </div>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 font-medium pt-2">
            Ainda não tem conta?{' '}
            <Link
              to="/cadastro"
              className="font-black text-indigo-600 hover:text-indigo-800 transition-colors border-b-2 border-indigo-100 hover:border-indigo-600"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden lg:flex relative flex-col items-center justify-end p-16 text-white overflow-hidden shadow-2xl"
      >
        <div
          className="absolute inset-0 z-0 scale-100"
          style={{
            backgroundImage: `url(${blogSide})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg space-y-6">
          <div className="p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 inline-block mb-2">
            <span className="px-4 py-1 text-sm font-bold uppercase tracking-widest">Inspiração Diária</span>
          </div>
          <h2 className="text-5xl font-black leading-tight">
            Seu próximo capítulo começa <span className="text-indigo-400">aqui.</span>
          </h2>
          <p className="text-slate-200 text-xl font-medium opacity-90 leading-relaxed">
            Personalize seu espaço, compartilhe suas histórias e conecte-se com leitores do mundo todo.
          </p>
          <div className="h-1.5 w-24 bg-indigo-500 rounded-full mt-8"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
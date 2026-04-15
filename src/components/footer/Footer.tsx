import { GithubLogo, GoogleChromeLogo, LinkedinLogo, Heart } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"

function Footer() {

  let data = new Date().getFullYear()

  const { usuario } = useContext(AuthContext)

  let component: ReactNode

  if (usuario.token !== "") {

    component = (
      <footer className="w-full bg-white border-t border-slate-100 mt-auto">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="flex flex-col items-center md:items-start space-y-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Blog<span className="text-indigo-600">Pessoal</span>
              </span>
              <p className="text-slate-500 font-medium text-sm text-center md:text-left">
                Copyright © {data} José Rodrigues. <br className="md:hidden" /> Todos os direitos reservados.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Siga-nos</p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/jrodrigues-neto/" target="_blank" className="p-3 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all shadow-sm">
                  <LinkedinLogo size={28} weight="bold" />
                </a>
                <a href="https://github.com/jrs-neto" target="_blank" className="p-3 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all shadow-sm">
                  <GithubLogo size={28} weight="bold" />
                </a>
                <a href="https://jrs-neto.github.io/portfolio/" target="_blank" className="p-3 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all shadow-sm">
                  <GoogleChromeLogo size={28} weight="bold" />
                </a>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-1">
              Desenvolvido com <Heart size={14} weight="fill" className="text-red-400" /> por José Rodrigues
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-indigo-600">Termos</a>
              <a href="#" className="hover:text-indigo-600">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <>
      {component}
    </>
  )
}

export default Footer
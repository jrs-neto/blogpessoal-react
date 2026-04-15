import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"
import homeLogo from "../../assets/home_hero.png";

function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left order-last lg:order-first">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wide uppercase">
                  Compartilhe seu Conhecimento
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Seja muito <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
                    Bem-vindo!
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-xl font-medium leading-relaxed">
                  Este é o seu espaço seguro para expressar pensamentos, opiniões e histórias. O que você vai criar hoje?
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <ModalPostagem />
              </div>
            </div>

            <div className="flex justify-center items-center order-first lg:order-last relative">
              <div className="absolute inset-0 bg-indigo-600/5 rounded-[40px] rotate-6 scale-95 blur-sm"></div>
              <div className="relative bg-white p-4 rounded-[40px] shadow-2xl shadow-indigo-100/50 border border-slate-100">
                <img
                  src={homeLogo}
                  alt="Ilustração Criativa de Blogging"
                  className="w-full max-w-md lg:max-w-lg rounded-[32px] hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Postagens Recentes</h3>
          <div className="h-1 flex-grow bg-slate-100 rounded-full"></div>
        </div>
        <ListaPostagens />
      </div>
    </div>
  )
}

export default Home;
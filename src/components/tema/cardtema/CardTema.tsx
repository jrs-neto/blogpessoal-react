import { Link } from "react-router-dom"
import type Tema from "../../../models/Tema"
import { PencilSimple, Trash, Tag } from "@phosphor-icons/react"

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className='bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-indigo-100 hover:-translate-y-1 group'>

      <div className="flex items-center gap-3 p-5 bg-indigo-600 text-white">
        <Tag size={24} weight="bold" />
        <span className='text-sm font-black uppercase tracking-widest'>Categoria</span>
      </div>

      <div className='p-8 flex flex-col flex-grow items-center justify-center text-center bg-slate-50/50'>
        <p className="text-2xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
          {tema.descricao}
        </p>
      </div>

      <div className="flex border-t border-slate-100">
        <Link
          to={`/editartema/${tema.id}`}
          className='w-full py-4 flex items-center justify-center gap-2 bg-white text-slate-600 font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all border-r border-slate-100'
        >
          <PencilSimple size={20} weight="bold" />
          <span>Editar</span>
        </Link>
        <Link
          to={`/deletartema/${tema.id}`}
          className='w-full py-4 flex items-center justify-center gap-2 bg-white text-slate-600 font-bold hover:bg-red-50 hover:text-red-500 transition-all'
        >
          <Trash size={20} weight="bold" />
          <span>Deletar</span>
        </Link>
      </div>
    </div>
  )
}

export default CardTema;
import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'
import { PencilSimple, Trash, CalendarBlank, BookmarkSimple } from '@phosphor-icons/react'

interface CardPostagensProps {
  postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <div className='bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-indigo-100 hover:-translate-y-1 group'>

      <div className="flex items-center gap-3 p-5 bg-slate-50/50 border-b border-slate-100">
        <img
          src={postagem.usuario?.foto || 'https://i.imgur.com/8RK9k6J.png'}
          className='h-10 w-10 rounded-full border-2 border-white shadow-sm object-cover'
          alt={postagem.usuario?.nome}
        />
        <div className="flex flex-col">
          <span className='text-sm font-black text-slate-800 tracking-tight'>
            {postagem.usuario?.nome}
          </span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <CalendarBlank size={14} />
            <span className="text-[10px] uppercase font-bold tracking-widest">
              {new Intl.DateTimeFormat("pt-BR", {
                dateStyle: 'medium',
              }).format(new Date(postagem.data))}
            </span>
          </div>
        </div>
      </div>

      <div className='p-6 flex flex-col flex-grow space-y-4'>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600">
            <BookmarkSimple size={18} weight="fill" />
            <span className="text-xs font-black uppercase tracking-widest">{postagem.tema?.descricao || 'Sem Tema'}</span>
          </div>
          <h4 className='text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors'>
            {postagem.titulo}
          </h4>
        </div>

        <p className="text-slate-600 font-medium leading-relaxed line-clamp-3">
          {postagem.texto}
        </p>
      </div>

      <div className="flex border-t border-slate-100">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className='w-full py-4 flex items-center justify-center gap-2 bg-white text-slate-600 font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all border-r border-slate-100'
        >
          <PencilSimple size={20} weight="bold" />
          <span>Editar</span>
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className='w-full py-4 flex items-center justify-center gap-2 bg-white text-slate-600 font-bold hover:bg-red-50 hover:text-red-500 transition-all'
        >
          <Trash size={20} weight="bold" />
          <span>Deletar</span>
        </Link>
      </div>
    </div>
  )
}

export default CardPostagem;
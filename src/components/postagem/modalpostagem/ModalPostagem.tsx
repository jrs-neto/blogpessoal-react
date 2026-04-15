import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';
import { PlusCircle } from '@phosphor-icons/react';

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button
            className='px-8 py-3.5 rounded-2xl text-white font-black bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-xl shadow-indigo-200 flex items-center gap-2 cursor-pointer'
          >
            <PlusCircle size={24} weight="bold" />
            <span>Nova Postagem</span>
          </button>
        }
        modal
        contentStyle={{
          borderRadius: '1.5rem',
          padding: '0',
          border: 'none',
          width: '90%',
          maxWidth: '600px'
        }}
      >
        <FormPostagem />
      </Popup>
    </>
  );
}

export default ModalPostagem;
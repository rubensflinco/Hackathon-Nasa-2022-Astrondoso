import Link from 'next/link'
import cssBtn from '../styles/btn.module.css'

export default function BtnResposta(props) {
    return (<>
        <div class={`${(props?.correta === true) && cssBtn?.btnRespostaCorreta} ${(props?.correta === false) && cssBtn?.btnRespostaErrada}  flex flex-row gap-11  items-center w-full p-2.5 rounded-[0.87rem] backdrop-blur-[13.8427734375px]`}>         
            <button onClick={props?.onClick} class="block w-full text-[0.87rem] text-white ">{props.descricao}</button>
        </div>
    </>)
}
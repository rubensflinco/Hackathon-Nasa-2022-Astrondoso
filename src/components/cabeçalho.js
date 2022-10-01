import Link from 'next/link'
import cssBtn from '../styles/btn.module.css'

export default function Cabecalho(props) {
    return (<>
        <div class="flex flex-col gap-[0.56rem] justify-center items-center w-full">
            <div class="flex flex-row gap-[0.56rem] justify-center items-center w-full">
                <button>
                <i class={props.icone}></i>
                </button>
                <div class="flex flex-col justify-center items-end w-full">
                    <p class="block w-full text-right text-xl text-white ">Giulia Amaral</p>
                    <p class="block w-full text-right text-xl text-white ">100pts</p>
                </div>
                <div>
                    <img class="block" src="/img/avatar/astrocat.png" />
                </div>
            </div>
            <p class="block text-[1.04rem] text-white ">{props?.tituloPagina}</p>
        </div>

    </>)
}
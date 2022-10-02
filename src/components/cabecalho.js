import Link from 'next/link'
import cssCabecalho from '../styles/cabecalho.module.css'

export default function Cabecalho(props) {
    return (<>
        <div class={cssCabecalho?.navbar}>
            <div class="flex flex-row gap-[0.56rem] justify-center items-center w-full">
                <button onClick={props?.iconClick}>
                    <i class={props.icone}></i>
                </button>
                <div class="flex flex-col justify-center items-end w-full">
                    <p class="block w-full text-right text-xl text-white ">{props?.usuarioLogadoDados?.nome}</p>
                    <p class="block w-full text-right text-xl text-white ">{props?.usuarioLogadoDados?.pontos} pts</p>
                </div>
                <div style={{cursor:"pointer"}}>
                    <Link href={`/cadastro/avatar`}>
                        <img class="block" src={props?.usuarioLogadoDados?.avatar} />
                    </Link>
                </div>
            </div>
            <p class="block text-[1.04rem] text-white text-center">{props?.tituloPagina}</p>
        </div>
        <div style={{ marginBottom: "10rem" }}></div>
    </>)
}
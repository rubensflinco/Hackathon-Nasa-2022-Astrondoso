import Link from 'next/link'
import cssCabecalho from '../styles/cabecalho.module.css'

export default function Cabecalho(props) {
    return (<>
        <div className={cssCabecalho?.navbar}>
            <div className="flex flex-row gap-[0.56rem] justify-center items-center w-full">
                <button onClick={props?.iconClick}>
                    <i className={props.icone}></i>
                </button>
                <div className="flex flex-col justify-center items-end w-full">
                    <p className="block w-full text-right text-xl text-white ">{props?.usuarioLogadoDados?.nome}</p>
                    <p className="block w-full text-right text-xl text-white ">{props?.usuarioLogadoDados?.pontos} pts</p>
                </div>
                <div style={{cursor:"pointer"}}>
                    <Link href={`/cadastro/avatar`}>
                        <img className="block" src={props?.usuarioLogadoDados?.avatarUrl} />
                    </Link>
                </div>
            </div>
            <p className="block text-[1.04rem] text-white text-center">{props?.tituloPagina}</p>
            <p className="block text-[0.74rem] text-white text-center">{props?.subTitulo}</p>
        </div>
        <div style={{ marginBottom: "10rem" }}></div>
    </>)
}
export default function Msg(props) {
    return (
        <center class="text-white">
            {props?.icone}
            <h1>{props?.titulo}</h1>
            <p>{props?.descricao}</p>


            {props?.children}


            {(props.btnTentarNovamente) && (
                <button onClick={() => { window.location.reload(); }}>
                    Tentar novamente!
                </button>
            )}

            {(props.btnInicio) && (
                <button onClick={() => { window.location.href = "/" }}>
                    Voltar ao Inicio
                </button>
            )}
        </center>
    )
}
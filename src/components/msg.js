export default function Msg(props) {
    return (
        <center class="text-white">
            {props?.icone}
            <br/>
            <br/>
            
            <h1>{props?.titulo}</h1>
            <p>{props?.descricao}</p>


            {props?.children}


            {(props.btnTentarNovamente) && (
                <button className="btn btn-dark mt-3" onClick={() => { window.location.reload(); }}>
                    Tentar novamente!
                </button>
            )}

            {(props.btnInicio) && (
                <button className="btn btn-dark mt-3" onClick={() => { window.location.href = "/" }}>
                    Voltar ao Inicio
                </button>
            )}
        </center>
    )
}
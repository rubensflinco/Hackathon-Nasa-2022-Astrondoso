import * as React from 'react';
import BtnPrincipal from '../../components/btnPrincipal';
import InputPrincipal from '../../components/input';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';
import request from '../../functions/request';
import { setCookies } from 'cookies-next';
import Router from 'next/router';
import convertWwwFormInJson from '../../functions/convertWwwFormInJson';



// Função executada no servidor antes da pagina ir para o navegador
export async function getServerSideProps(context) {
    let req = context.req;

    if (req.method == "POST") {
        try {
            let body = await convertWwwFormInJson(req);
            let respostaApi = await request("POST", `${process.env.API_PUBLICA_BASE_URL}/usuario/criar`, {}, { dados: body });
 
            setCookies('token_sessao_usuario', respostaApi.token, { secure: true, httpOnly: true, overwrite: true, req: context.req, res: context.res });
            
            return {
                props: { token_sessao_usuario: respostaApi.token }
            }

        } catch (error) {
            return {
                props: { erro: String(error) }
            }
        }

    } else {
        return {
            redirect: { destination: '/cadastro', permanent: false }
        }
    }

}


export default function PagesCadastroAction(props) {


    React.useEffect(() => {
        (async () => {

            if (props.token_sessao_usuario) {
                setCookies('token_sessao_usuario_cliente', props.token_sessao_usuario, { secure: true, overwrite: true });
                Router.push("/cadastro/avatar");
            }

        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Cadastrando..."
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i className="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
            </>)
            }
        </>)
        }
    </>)
}



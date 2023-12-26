import * as React from 'react';
import BtnPrincipal from '../../../components/btnPrincipal';
import InputPrincipal from '../../../components/input';
import Msg from '../../../components/msg';
import TituloPagina from '../../../components/titulo-pagina';
import request from '../../../functions/request';
import { setCookies } from 'cookies-next';
import Router from 'next/router';
import convertWwwFormInJson from '../../../functions/convertWwwFormInJson';
import getUsuarioPorTokenCookies from '../../../functions/getUsuarioPorTokenCookies';



// Função executada no servidor antes da pagina ir para o navegador
export async function getServerSideProps(context) {
    let req = context.req;

    if (req.method == "POST") {
        try {
            let usuarioLogado = await getUsuarioPorTokenCookies(context);
            let body = await convertWwwFormInJson(req);
            let respostaApi = await request("PUT", `${process.env.API_PUBLICA_BASE_URL}/usuario/editar`, {}, { dados: body, condicoes: { _id: usuarioLogado?.id } });
            
            return {
                props: { }
            }

        } catch (error) {
            return {
                props: { erro: String(error) }
            }
        }

    } else {
        return {
            redirect: { destination: '/cadastro/avatar', permanent: false }
        }
    }

}


export default function PagesCadastroAvatarAction(props) {


    React.useEffect(() => {
        (async () => {

            Router.push("/menu");

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



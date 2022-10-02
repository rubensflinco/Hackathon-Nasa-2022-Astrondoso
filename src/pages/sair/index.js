import * as React from 'react';
import BtnPrincipal from '../../components/btnPrincipal';
import InputPrincipal from '../../components/input';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';
import request from '../../functions/request';
import { setCookies } from 'cookies-next';
import Router from 'next/router';
import convertWwwFormInJson from '../../functions/convertWwwFormInJson';
import deslogarUser from '../../functions/deslogarUser';



// Função executada no servidor antes da pagina ir para o navegador
export async function getServerSideProps(context) {

    try {

        deslogarUser(context);

        return {
            props: { token_sessao_usuario: respostaApi.token }
        }

    } catch (error) {
        return {
            props: { erro: String(error) }
        }
    }

}


export default function PagesLogandoAction(props) {


    React.useEffect(() => {
        (async () => {

            deslogarUser("CLIENTE");

        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Saindo..."
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i class="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
            </>)
            }
        </>)
        }
    </>)
}



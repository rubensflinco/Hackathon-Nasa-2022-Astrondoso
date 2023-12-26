import * as React from 'react';
import Cabecalho from '../../components/cabecalho';
import CardPrincipal from '../../components/cardPrincipal';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';
import deslogarUser from '../../functions/deslogarUser';
import encontrarEtapasDoQuiz from '../../functions/encontrarEtapasDoQuiz';
import getUsuarioPorTokenCookies from '../../functions/getUsuarioPorTokenCookies';
import request from '../../functions/request';




// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {


    // [INICIO] checando se o usuario esta autenticado
    try {
        let usuarioLogado = await getUsuarioPorTokenCookies(context);
        if (usuarioLogado?.token) {
            let perguntas = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/perguntas/obter`, {}, { condicoes: { limite: 99 } });
            let etapasQuiz = await encontrarEtapasDoQuiz(perguntas);

            return {
                redirect: {
                    destination: `/quiz/${etapasQuiz?.primeiroPergunta}`, permanent: false
                }
            }
        } else {
            deslogarUser(context);
            return {
                redirect: {
                    destination: '/logando', permanent: false
                }
            }
        }
    } catch (error) {
        return {
            props: {
                erro: String(error)
            }
        }

    }
    // [FIM] checando se o usuario esta autenticado


}


export default function PagesQuiz(props) {


    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Quiz carregando perguntas..."
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



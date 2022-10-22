import Router from 'next/router';
import * as React from 'react';
import BtnResposta from '../../../components/btnRespostas';
import Cabecalho from '../../../components/cabecalho';
import CardQuiz from '../../../components/cardQuiz';
import LinkPrincipal from '../../../components/linkPrincipal';
import Msg from '../../../components/msg';
import TituloPagina from '../../../components/titulo-pagina';
import deslogarUser from '../../../functions/deslogarUser';
import encontrarEtapasDoQuiz from '../../../functions/encontrarEtapasDoQuiz';
import getUsuarioPorTokenCookies from '../../../functions/getUsuarioPorTokenCookies';
import request from '../../../functions/request';




// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {


    // [INICIO] checando se o usuario esta autenticado
    try {
        let usuarioLogado = await getUsuarioPorTokenCookies(context);
        if (usuarioLogado?.token) {
            let usuarioLogadoDados = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/usuario/obter`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id } });
            let pergunta = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/perguntas/obter`, {}, { condicoes: { limite: 1, _id: context.params.idPergunta } });


            if (!usuarioLogadoDados?.[0]?._id) {
                deslogarUser(context);
            }

            return {
                props: {
                    pergunta: pergunta?.[0] || {},
                    usuarioLogadoDados: usuarioLogadoDados?.[0] || null,
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


export default function PagesQuizPergunta(props) {


    React.useEffect(() => {
        (async () => {

            if (!props?.usuarioLogadoDados?._id) {
                deslogarUser("CLIENTE");
            }

        })()
    }, [])


    return (<>
        <TituloPagina
            nome="James Quiz"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i class="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <Cabecalho tituloPagina="James Quiz" iconClick={() => { Router.push(`/menu`) }} icone="fa-solid fa-angle-left fa-1x text-white" usuarioLogadoDados={props?.usuarioLogadoDados} />


                <div class="w-100 mx-auto">
                    <CardQuiz titulo={props?.pergunta?.titulo} conteudo={props?.pergunta?.subTitulo} img={(props?.pergunta?.idGaleria?.imgPathName) && props?.pergunta?.idGaleria?.imgUrl}>
                        {
                            props?.pergunta?.opcoes?.map((opcao) => (<>
                                <BtnResposta onClick={()=>{Router.push(`/quiz/${props?.pergunta?._id}/validar/${opcao?._id}`)}} descricao={opcao?.titulo} />
                            </>))
                        }
                    </CardQuiz>
                </div>

            </>)
            }
        </>)
        }
    </>)
}



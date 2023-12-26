import Router from 'next/router';
import * as React from 'react';
import BtnResposta from '../../../../components/btnRespostas';
import Cabecalho from '../../../../components/cabecalho';
import CardQuiz from '../../../../components/cardQuiz';
import LinkPrincipal from '../../../../components/linkPrincipal';
import Msg from '../../../../components/msg';
import TituloPagina from '../../../../components/titulo-pagina';
import deslogarUser from '../../../../functions/deslogarUser';
import encontrarEtapasDoQuiz from '../../../../functions/encontrarEtapasDoQuiz';
import getUsuarioPorTokenCookies from '../../../../functions/getUsuarioPorTokenCookies';
import request from '../../../../functions/request';




// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {


    // [INICIO] checando se o usuario esta autenticado
    try {
        let usuarioLogado = await getUsuarioPorTokenCookies(context);
        if (usuarioLogado?.token) {
            let usuarioLogadoDados = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/usuario/obter`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id } });
            let pergunta = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/perguntas/obter`, {}, { condicoes: { limite: 1, _id: context.params.idPergunta } });
            let perguntas = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/perguntas/obter`, {}, { condicoes: { limite: 99 } });
            let etapasQuiz = await encontrarEtapasDoQuiz(perguntas, pergunta?.[0]);
            let acertou = false;

            if (!usuarioLogadoDados?.[0]?._id) {
                deslogarUser(context);
            }

            if (pergunta?.[0]) {
                let p = pergunta?.[0];
                let opcao = p?.opcoes?.filter((op) => (op._id === context?.params?.idOpcao));
                opcao = opcao?.[0];
                if (opcao?.correta === true) {
                    let pontos = usuarioLogadoDados?.[0]?.pontos + 10;
                    acertou = true;
                    let usuarioEditado = await request("PUT", `${process.env.API_PUBLICA_BASE_URL}/usuario/editar`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id }, dados: { pontos } });
                    usuarioLogadoDados = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/usuario/obter`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id } });
                } else {
                    let pontos = usuarioLogadoDados?.[0]?.pontos - 3;
                    acertou = false;
                    let usuarioEditado = await request("PUT", `${process.env.API_PUBLICA_BASE_URL}/usuario/editar`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id }, dados: { pontos } });
                    usuarioLogadoDados = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/usuario/obter`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id } });
                }
            }

            if(etapasQuiz?.proximoPergunta){
            return {
                props: {
                    acertou,
                    etapasQuiz,
                    pergunta: pergunta?.[0] || {},
                    usuarioLogadoDados: usuarioLogadoDados?.[0] || null,
                }
            }  
        }else{
            return {
                props: {
                    erro: String("Chegamos ao fim, mas você ainda pode explorar outras parte do nosso app, volte a pagina Inicial!")
                }
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
                <Msg icone={(<i className="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnInicio={true} descricao={props.erro} />
            </>) : (<>
                <Cabecalho tituloPagina="James Quiz" iconClick={() => { Router.push(`/menu`) }} icone="fa-solid fa-angle-left fa-1x text-white" usuarioLogadoDados={props?.usuarioLogadoDados} />


                <div className="w-100 mx-auto">
                    <CardQuiz titulo={props?.pergunta?.titulo} acertou={props?.acertou} conteudo={props?.pergunta?.subTitulo} img={(props?.pergunta?.idGaleria?.imgPathName) && props?.pergunta?.idGaleria?.imgUrl}>
                        {
                            props?.pergunta?.opcoes?.map((opcao) => (<>
                                <BtnResposta correta={(props?.acertou === true) ? opcao?.correta : false} descricao={opcao?.titulo} />
                            </>))
                        }
                    </CardQuiz>

                    <LinkPrincipal className="mt-5" link={`/quiz/${props?.etapasQuiz?.proximoPergunta}`}>Próximo</LinkPrincipal>
                </div>

            </>)
            }
        </>)
        }
    </>)
}



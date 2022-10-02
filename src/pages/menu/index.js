import * as React from 'react';
import Cabecalho from '../../components/cabecalho';
import CardPrincipal from '../../components/cardPrincipal';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';
import deslogarUser from '../../functions/deslogarUser';
import getUsuarioPorTokenCookies from '../../functions/getUsuarioPorTokenCookies';
import request from '../../functions/request';




// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {


    // [INICIO] checando se o usuario esta autenticado
    try {
        let usuarioLogado = await getUsuarioPorTokenCookies(context);
        console.log("🚀 ~ file: index.js ~ line 20 ~ getServerSideProps ~ usuarioLogado", usuarioLogado)
        if (usuarioLogado?.token) {
            let usuarioLogadoDados = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/usuario/obter`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id } });
            let menus = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/menu/obter`, {}, { condicoes: { limite: 99 } });
            let artigos = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/artigo/obter`, {}, { condicoes: { limite: 10 } });

            // if(!usuarioLogadoDados?.[0]?.nome){
            //     deslogarUser(context);
            // }

            return {
                props: {
                    usuarioLogadoDados: usuarioLogadoDados?.[0] || null,
                    menus,
                    artigos
                }
            }
        } else {
            // deslogarUser(context);
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


export default function PagesMenu(props) {


    React.useEffect(() => {
        (async () => {

            if(!props?.usuarioLogadoDados?._id){
                deslogarUser("CLIENTE");
            }

        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Menu"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<p>icon carregando</p>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<p>icon erro</p>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <Cabecalho tituloPagina="Menu" usuarioLogadoDados={props?.usuarioLogadoDados} />


                {
                    props?.menus?.map((menu) => (<>
                        {(menu?.posicao === "cima") && (<>
                            <CardPrincipal titulo={menu?.titulo} descricao={menu?.subtitulo} img={menu?.imgIconPathName} link={menu?.click?.link} target={menu?.click?.target} />
                        </>)}
                    </>))
                }


                <h2 class="block text-[NaNrem] text-white mb-3" >Aprenda +</h2>
                {
                    props?.artigos?.map((artigo) => (<>
                        <CardPrincipal titulo={artigo?.titulo} descricao={artigo?.subtitulo} img={artigo?.imgIconPathName} link={`/artigo/${artigo?.slug}`} />
                    </>))
                }
                {
                    props?.menus?.map((menu) => (<>
                        {(menu?.posicao === "meio") && (<>
                            <CardPrincipal titulo={menu?.titulo} descricao={menu?.subtitulo} img={menu?.imgIconPathName} link={menu?.click?.link} target={menu?.click?.target} />
                        </>)}
                    </>))
                }


                <h2 class="block text-[NaNrem] text-white mb-3" >Explore +</h2>
                {
                    props?.menus?.map((menu) => (<>
                        {(menu?.posicao === "baixo") && (<>
                            <CardPrincipal titulo={menu?.titulo} descricao={menu?.subtitulo} img={menu?.imgIconPathName} link={menu?.click?.link} target={menu?.click?.target} />
                        </>)}
                    </>))
                }
            </>)
            }
        </>)
        }
    </>)
}



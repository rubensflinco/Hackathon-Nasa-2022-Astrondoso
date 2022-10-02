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
        if (usuarioLogado?.token) {
            let usuarioLogadoDados = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/usuario/obter`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id } });
            let menus = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/menu/obter`, {}, { condicoes: { limite: 99 } });
            let artigos = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/artigo/obter`, {}, { condicoes: { limite: 10 } });

            if(!usuarioLogadoDados?.[0]?._id){
                deslogarUser(context);
            }

            return {
                props: {
                    usuarioLogadoDados: usuarioLogadoDados?.[0] || null,
                    menus,
                    artigos
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
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i class="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <Cabecalho tituloPagina="" iconClick={()=>{window.location.href = "/sair"}} icone="fa-solid fa-right-from-bracket text-white" usuarioLogadoDados={props?.usuarioLogadoDados} />


                <h2 class="block text-[NaNrem] text-white mb-3" >Destaques</h2>
                {
                    props?.menus?.map((menu) => (<>
                        {(menu?.posicao === "cima") && (<>
                            <CardPrincipal titulo={menu?.titulo} descricao={menu?.subTitulo} img={menu?.imgIconPathName} link={menu?.click?.link} target={menu?.click?.target} />
                        </>)}
                    </>))
                }


                <h2 class="block text-[NaNrem] text-white mb-3 mt-3" >Aprenda +</h2>
                {
                    props?.artigos?.map((artigo) => (<>
                        <CardPrincipal titulo={artigo?.titulo} descricao={artigo?.subTitulo} img={artigo?.imgIconPathName} link={`/artigo/${artigo?.slug}`} />
                    </>))
                }
                {
                    props?.menus?.map((menu) => (<>
                        {(menu?.posicao === "meio") && (<>
                            <CardPrincipal titulo={menu?.titulo} descricao={menu?.subTitulo} img={menu?.imgIconPathName} link={menu?.click?.link} target={menu?.click?.target} />
                        </>)}
                    </>))
                }


                <h2 class="block text-[NaNrem] text-white mb-3 mt-3" >Explore +</h2>
                {
                    props?.menus?.map((menu) => (<>
                        {(menu?.posicao === "baixo") && (<>
                            <CardPrincipal titulo={menu?.titulo} descricao={menu?.subTitulo} img={menu?.imgIconPathName} link={menu?.click?.link} target={menu?.click?.target} />
                        </>)}
                    </>))
                }
            </>)
            }
        </>)
        }
    </>)
}



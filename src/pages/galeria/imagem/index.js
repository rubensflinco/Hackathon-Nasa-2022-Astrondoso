import * as React from 'react';
import Cabecalho from '../../../components/cabecalho';
import CardImagens from '../../../components/cardImagens';
import Msg from '../../../components/msg';
import TituloPagina from '../../../components/titulo-pagina';
import deslogarUser from '../../../functions/deslogarUser';
import getUsuarioPorTokenCookies from '../../../functions/getUsuarioPorTokenCookies';
import request from '../../../functions/request';





// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {


    // [INICIO] checando se o usuario esta autenticado
    try {
        let usuarioLogado = await getUsuarioPorTokenCookies(context);
        if (usuarioLogado?.token) {
            let usuarioLogadoDados = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/usuario/obter`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id } });
            let fotos = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/galeria/obter`, {}, { condicoes: { limite: 99 } });

            if(!usuarioLogadoDados?.[0]?._id){
                deslogarUser(context);
            }

            return {
                props: {
                    usuarioLogadoDados: usuarioLogadoDados?.[0] || null,
                    fotos,
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
            nome="Galeria de Imagens"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i class="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <Cabecalho tituloPagina="Galeria de Imagens" iconClick={()=>{window.history.back()}} icone="fa-solid fa-angle-left fa-1x text-white" usuarioLogadoDados={props?.usuarioLogadoDados} />

                {
                    props?.fotos?.map((foto)=>(<>
                        <CardImagens titulo={foto?.titulo} descricao={`<b>Data da foto: ${foto?.dataDivulgacao} </b><br/>${foto?.subTitulo || ""}`} img={foto?.imgPathName}/>
                    </>))
                }
            </>)
            }
        </>)
        }
    </>)
}



import * as React from 'react';
import LinkPrincipal from '../components/linkPrincipal';
import LinkSecundario from '../components/linkSecundario';
import Msg from '../components/msg';
import TituloPagina from '../components/titulo-pagina';
import getUsuarioPorTokenCookies from '../functions/getUsuarioPorTokenCookies';





// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {


    // [INICIO] checando se o usuario esta autenticado
    try {
        let usuarioLogado = await getUsuarioPorTokenCookies(context);
        if (usuarioLogado?.token) {
            return {
                redirect: {
                    destination: '/menu', permanent: false
                }
            }
        } else {
            return {
                props: {}
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



export default function PagesInicio(props) {


    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Inicio"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i class="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <div class="flex flex-col gap-[1.94rem] justify-center items-center max-w-[24.38rem] mx-auto p-5">
                    <img class="block" src="/img/logo-james-webb.png" />
                    <p class={props?.cssGlobal?.tituloLogo}>james webb</p>
                    <p class={props?.cssGlobal?.subTituloLogo}>aprendizagem divertida</p>

                    <LinkPrincipal link={`/cadastro`}>
                        Cadastre-se
                    </LinkPrincipal>
                    <LinkSecundario link={`/logando`}>
                        Logar-se
                    </LinkSecundario>
                </div>
            </>)
            }
        </>)
        }
    </>)
}



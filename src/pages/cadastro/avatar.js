import * as React from 'react';
import LinkPrincipal from '../../components/linkPrincipal';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';





// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {
    try {

        return {
            props: {

            }
        }

    } catch (error) {

        return {
            props: {
                erro: String(error)
            }
        }

    }
}


export default function PagesCadastroAvatar(props) {


    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Escolha o seu avatar"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<p>icon carregando</p>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<p>icon erro</p>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <div class="flex flex-col gap-[0.94rem] justify-center items-center max-w-[24.38rem] mx-auto p-5">
                    <p class="block w-full text-center text-xl text-white ">Escolha o seu avatar</p>
                    <div class="flex flex-col gap-[-1.25rem] justify-center items-center w-full">
                        <button>
                            <img class="block" src="/img/avatar/babyet.png" />
                        </button>
                        <button>
                        <img class="block" src="/img/avatar/astrocat.png" />
                        </button>
                    </div>
                    <LinkPrincipal link={`/boasVindas/cadastroNome`}>
                        Próximo
                    </LinkPrincipal>
                </div>
            </>)
            }
        </>)
        }
    </>)
}



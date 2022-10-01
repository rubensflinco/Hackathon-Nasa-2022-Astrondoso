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


export default function PagesLogando(props) {


    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Logando"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<p>icon carregando</p>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<p>icon erro</p>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <div class="flex flex-col gap-[1.94rem] justify-center items-center max-w-[24.38rem] mx-auto p-5">
                    <img class="block" src="/img/logo-james-webb.png" />

                    <LinkPrincipal link={`/boasVindas/cadastroAvatar`}>
                        Usar senha do celular
                    </LinkPrincipal>
                </div>
            </>)
            }
        </>)
        }
    </>)
}


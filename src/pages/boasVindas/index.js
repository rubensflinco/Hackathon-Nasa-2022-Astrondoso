import * as React from 'react';
import BtnPrincipal from '../../components/btnPrincipal';
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


export default function PagesBoasVindasInicio(props) {


    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Inicio"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<p>icon carregando</p>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<p>icon erro</p>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <div class="flex flex-col gap-[1.94rem] justify-center items-center max-w-[24.38rem] mx-auto p-5">
                    <img class="block" src="/img/logo-james-webb.png" />
                    <p class={props?.cssGlobal?.tituloLogo}>james webb</p>
                    <p class={props?.cssGlobal?.subtituloLogo}>aprendizagem divertida</p>

                    <BtnPrincipal link={`/boasVindas/cadastroAvatar`}>
                        Começar
                    </BtnPrincipal>
                </div>
            </>)
            }
        </>)
        }
    </>)
}



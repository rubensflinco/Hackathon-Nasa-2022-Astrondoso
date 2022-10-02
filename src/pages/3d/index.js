import * as React from 'react';
import LinkPrincipal from '../../components/linkPrincipal';
import Cabecalho from '../../components/cabecalho';
import CardAccordion from '../../components/cardAccordion';
import CardPrincipal from '../../components/cardPrincipal';
import CardSecundario from '../../components/cardSecundario';
import InputPrincipal from '../../components/input';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';





// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {
    try {

        // context.params.slug;


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


export default function Pages3d(props) {


    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="James Webb 3D"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<p>icon carregando</p>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<p>icon erro</p>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <div class="flex flex-col gap-[0.94rem] justify-start items-center max-w-[24.38rem] mx-auto p-5">

                    <Cabecalho tituloPagina="James Webb 3D" icone="fa-solid fa-angle-left fa-1x text-white">

                    </Cabecalho>


                </div>



            </>)
            }
        </>)
        }
    </>)
}



import * as React from 'react';
import BtnPrincipal from '../../components/btnPrincipal';
import Cabecalho from '../../components/cabeçalho';
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


export default function PagesArtigo(props) {


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
                <div class="flex flex-col gap-[0.94rem] justify-start items-center max-w-[24.38rem] mx-auto p-5">

                    <Cabecalho tituloPagina="Sobre Webb" icone="fa-solid fa-angle-left fa-1x text-white">

                    </Cabecalho>


                </div>

                

                <CardAccordion titulo="Objetivo da Missão" conteudo="lorem ipsum"/>

                <CardAccordion titulo="Objetivo da Missão" conteudo="lorem ipsum"/>

                <CardAccordion titulo="Objetivo da Missão" conteudo="lorem ipsum"/>

                <CardAccordion titulo="Objetivo da Missão" conteudo="lorem ipsum"/>

                <CardAccordion titulo="Objetivo da Missão" conteudo="lorem ipsum"/>



            

            </>)
            }
        </>)
        }
    </>)
}



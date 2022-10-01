import * as React from 'react';
import LinkPrincipal from '../../components/linkPrincipal';
import Cabecalho from '../../components/cabeçalho';
import CardPrincipal from '../../components/cardPrincipal';
import CardSecundario from '../../components/cardSecundario';
import InputPrincipal from '../../components/input';
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


export default function PagesInicio(props) {


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

                    <Cabecalho tituloPagina="Menu">

                    </Cabecalho>


                </div>

                <CardPrincipal titulo="James Quiz" descricao="Teste os seus conhecimentos do telescópio James Webb" img="/img/icon/game-3d.png" />
                <CardPrincipal titulo="James Quiz" descricao="Teste os seus conhecimentos do telescópio James Webb" img="/img/icon/game-3d.png" />

                <h2 class="block text-[NaNrem] text-white mb-3" >Aprenda +</h2>
                <CardSecundario titulo="Sobre James Webb" descricao="Objetivos da missão, como funciona, e muito mais" />

                <CardSecundario titulo="Sobre James Webb" descricao="Objetivos da missão, como funciona, e muito mais" />
                
                <CardSecundario titulo="Sobre James Webb" descricao="Objetivos da missão, como funciona, e muito mais" />

            </>)
            }
        </>)
        }
    </>)
}



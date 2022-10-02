import * as React from 'react';
import BtnPrincipal from '../../components/btnPrincipal';
import BtnResposta from '../../components/btnRespostas';
import Cabecalho from '../../components/cabecalho';
import CardQuiz from '../../components/cardQuiz';
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
            nome="James Quiz"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i class="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <div class="flex flex-col gap-[0.94rem] justify-start items-center max-w-[24.38rem] mx-auto p-5">

                    <Cabecalho tituloPagina="James Quiz" icone="fa-solid fa-angle-left fa-1x text-white">

                    </Cabecalho>


                </div>
                
                
                <CardQuiz titulo="Qual foi a data do lançamento do James Webb?" conteudo="lorem ipsum" img="/img/foto-james-webb.png">
                    <BtnResposta descricao="resposta 1"/>
                    <BtnResposta descricao="resposta 1"/>
                    <BtnResposta descricao="resposta 1"/>
                    <BtnResposta descricao="resposta 1"/>
                </CardQuiz>
                
 
                <BtnPrincipal link="/">Próximo</BtnPrincipal>

            </>)
            }
        </>)
        }
    </>)
}



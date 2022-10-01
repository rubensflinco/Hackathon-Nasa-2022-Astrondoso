import * as React from 'react';
import Msg from '../components/msg';
import TituloPagina from '../components/titulo-pagina';





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
            nome="Home em construção"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<p>icon carregando</p>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<p>icon erro</p>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>


                <Msg
                    icone={(<>Icone</>)}
                    titulo={`Em Construção`}
                    descricao={`Estamos trabalhando duro para tudo funcionar`}
                />

            </>)
            }
        </>)
        }
    </>)
}



import * as React from 'react';
import BtnPrincipal from '../../components/btnPrincipal';
import InputPrincipal from '../../components/input';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';
import WebAuthUtil from '../../functions/webauth/util';





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


export default function PagesCadastroNome(props) {


    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Cadastro"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<p>icon carregando</p>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<p>icon erro</p>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <form action="/cadastro/action" method="POST" enctype="application/x-www-form-urlencoded">
                    <div class="flex flex-col gap-[0.94rem] justify-center items-center max-w-[24.38rem] mx-auto p-5">
                        <InputPrincipal titulo="Qual seu e-mail?" name="email" type="email">
                            Digite o seu endereço de e-mail
                        </InputPrincipal>
                        <InputPrincipal titulo="Qual o seu nome?" name="nome">
                            Digite o seu primeiro nome
                        </InputPrincipal>

                        <BtnPrincipal type="submit">
                            Próximo
                        </BtnPrincipal>
                    </div>
                </form>
            </>)
            }
        </>)
        }
    </>)
}



import * as React from 'react';
import BtnPrincipal from '../../components/btnPrincipal';
import InputPrincipal from '../../components/input';
import LinkPrincipal from '../../components/linkPrincipal';
import LinkSecundario from '../../components/linkSecundario';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';
import getUsuarioPorTokenCookies from '../../functions/getUsuarioPorTokenCookies';




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


export default function PagesLogando(props) {


    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Logar-se"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i class="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <form action="/logando/action" method="POST" enctype="application/x-www-form-urlencoded">
                    <div class="flex flex-col gap-[0.94rem] justify-center items-center max-w-[24.38rem] mx-auto p-5">
                        <InputPrincipal titulo="Qual seu e-mail?" name="email" type="email">
                            Digite o seu endereço de e-mail
                        </InputPrincipal>
                        <InputPrincipal titulo="Senha" name="senha" type="password">
                            Digite sua senha
                        </InputPrincipal>

                        <BtnPrincipal type="submit">
                            Próximo
                        </BtnPrincipal>
                        <LinkSecundario link={`/cadastro`}>
                            Ainda não tem conta? Cadastre-se
                        </LinkSecundario>
                    </div>
                </form>
            </>)
            }
        </>)
        }
    </>)
}



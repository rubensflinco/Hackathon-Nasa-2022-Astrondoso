import * as React from 'react';
import BtnPrincipal from '../../../components/btnPrincipal';
import Msg from '../../../components/msg';
import TituloPagina from '../../../components/titulo-pagina';
import getUsuarioPorTokenCookies from '../../../functions/getUsuarioPorTokenCookies';





// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {


    // [INICIO] checando se o usuario esta autenticado
    try {
        let usuarioLogado = await getUsuarioPorTokenCookies(context);
        if (usuarioLogado?.token) {
            return {
                props: {}
            }
        } else {
            return {
                redirect: {
                    destination: '/logando', permanent: false
                }
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


export default function PagesCadastroAvatar(props) {

    let [avatar, setAvatar] = React.useState("");

    React.useEffect(() => {
        (async () => {


        })()
    }, [])



    return (<>
        <TituloPagina
            nome="Escolha o seu avatar"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i className="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <form action="/cadastro/avatar/action" method="POST" enctype="application/x-www-form-urlencoded">
                    <div className="flex flex-col gap-[0.94rem] justify-center items-center max-w-[24.38rem] mx-auto p-5">
                        <p className="block w-full text-center text-xl text-white ">Escolha o seu avatar</p>
                        <div className="flex flex-col gap-[-1.25rem] justify-center items-center w-full">

                            <input value={avatar} name="avatar" type="hidden" />

                            <button type="button" onClick={() => { setAvatar("babyet.png") }}>
                                <img className={`block selecionado-${(avatar === "babyet.png")}`} src="/img/avatar/babyet.png" />
                            </button>

                            <button type="button" onClick={() => { setAvatar("astrocat.png") }}>
                                <img className={`block selecionado-${(avatar === "astrocat.png")}`} src="/img/avatar/astrocat.png" />
                            </button>

                        </div>
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



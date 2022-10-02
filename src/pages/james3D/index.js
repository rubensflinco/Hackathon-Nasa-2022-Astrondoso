import * as React from 'react';
import Cabecalho from '../../components/cabecalho';
import Msg from '../../components/msg';
import TituloPagina from '../../components/titulo-pagina';
import dynamic from 'next/dynamic';
import getUsuarioPorTokenCookies from '../../functions/getUsuarioPorTokenCookies';
import deslogarUser from '../../functions/deslogarUser';
import request from '../../functions/request';
const AmbientLight = dynamic(() =>
    import('react-3d-viewer').then((mod) => mod.AmbientLight), { ssr: false }
)
const GLTFModel = dynamic(() =>
    import('react-3d-viewer').then((mod) => mod.GLTFModel), { ssr: false }
)
const DirectionLight = dynamic(() =>
    import('react-3d-viewer').then((mod) => mod.DirectionLight), { ssr: false }
)



// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {


    // [INICIO] checando se o usuario esta autenticado
    try {
        let usuarioLogado = await getUsuarioPorTokenCookies(context);
        if (usuarioLogado?.token) {
            let usuarioLogadoDados = await request("PROPFIND", `${process.env.API_PUBLICA_BASE_URL}/usuario/obter`, {}, { condicoes: { limite: 1, _id: usuarioLogado?.id } });

            if(!usuarioLogadoDados?.[0]?._id){
                deslogarUser(context);
            }

            return {
                props: {
                    usuarioLogadoDados: usuarioLogadoDados?.[0] || null,
                }
            }
        } else {
            deslogarUser(context);
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


export default function PagesJames3D(props) {

    let [rotation, setRotation] = React.useState({ x: 0, y: 0, z: 0 });

    React.useEffect(() => {
        (async () => {

        })()
    }, [])

    React.useEffect(() => {
        setInterval(() => {
            rotation.y += 0.005;
            setRotation(rotation);
        }, 30);
    })



    return (<>
        <TituloPagina
            nome="James Webb 3D"
        />

        {(props.carregando) ? (<>
            <Msg icone={(<i className="spinner-grow text-secondary"></i>)} titulo={`Carregando...`} />
        </>) : (<>
            {(props.erro) ? (<>
                <Msg icone={(<i class="fa-regular fa-circle-xmark fa-2x"></i>)} titulo={`Erro`} btnTentarNovamente={true} descricao={props.erro} />
            </>) : (<>
                <Cabecalho tituloPagina="James Webb 3D" iconClick={() => { window.history.back() }} icone="fa-solid fa-angle-left fa-1x text-white" usuarioLogadoDados={props?.usuarioLogadoDados} />

                <div className={props?.cssGlobal?.container3D}>
                    <GLTFModel src="/james3d.gltf" rotation={rotation}>
                        <AmbientLight color={0xffffff} />
                        <DirectionLight color={0xffffff} position={{ x: 100, y: 200, z: 100 }} />
                        <DirectionLight color={0xff00ff} position={{ x: -100, y: 200, z: -100 }} />
                    </GLTFModel>
                </div>

            </>)
            }
        </>)
        }
    </>)
}



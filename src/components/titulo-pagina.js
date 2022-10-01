import Head from 'next/head';


export default function TituloPagina(props) {
    return (<>
        {
            props.nome && (
                <Head>
                    <title>{props?.nome} - {process.env.NEXT_PUBLIC_TITULO_SITE || `James Webb - Aprendizagem Divertida`}</title>
                </Head>
            )
        }
    </>)
}
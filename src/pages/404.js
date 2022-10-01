import * as React from 'react';
import TituloPagina from '../components/titulo-pagina';
import Msg from '../components/msg';



export default function Pages404(props) {


  React.useEffect(() => {
    (async () => {


    })()
  }, [])



  return (<>

    <TituloPagina
      nome="404"
    />

    <Msg 
    icone={(<>Icone de erro</>)} 
    titulo={`404`} 
    descricao={`Pagina não encontrada`} 
    btnInicio={true}
    />

  </>)
}



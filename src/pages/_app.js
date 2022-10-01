import * as React from 'react'
import cssGlobal from '../styles/global.module.css'
import Router from 'next/router'


export default function App({ Component, pageProps }) {

  const [carregando, setCarregando] = React.useState(true);


  React.useEffect(() => {
    if (Router.isFallback === false) {
      if (typeof window !== "undefined") {
        window.addEventListener("loadstart", function () { setCarregando(true); });
        window.addEventListener("loadstop", function () { setCarregando(false); });
      }
    }
  });

  React.useEffect(() => {
    if (Router.isFallback === false) {
      Router.events.on("routeChangeStart", () => setCarregando(true));
      Router.events.on("routeChangeComplete", () => setCarregando(false));
      Router.events.on("routeChangeError", () => setCarregando(false));
      setCarregando(false);
    } else {
      setCarregando(true);
    }
  }, [Router]);


  return (<>
    <div className={cssGlobal.fundoEscuro}>
      <div className={cssGlobal.espacamentoMenuCima}></div>
      <Component {...pageProps} carregando={carregando} cssGlobal={cssGlobal} />
      <div className={cssGlobal.espacamentoMenuBaixo}></div>
    </div>
  </>)
}

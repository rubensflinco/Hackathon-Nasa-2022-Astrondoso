import * as React from 'react'
import cssGlobal from '../styles/global.module.css'
import Router from 'next/router'


export default function App({ Component, pageProps }) {

  const [carregando, setCarregando] = React.useState(true);


  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (Router.isFallback === false) {
        window.addEventListener("loadstart", function () { setCarregando(true); });
        window.addEventListener("loadstop", function () { setCarregando(false); });
      }
      window.addEventListener("beforeunload", function () { setCarregando(true); });
      document.querySelectorAll('img').forEach(function (img) {
        img.onerror = function () { this.style.display = 'none'; };
      });
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

  React.useEffect(() => {
    if (typeof navigator.serviceWorker !== 'undefined') {
      navigator.serviceWorker.register('pwabuilder-sw.js')
    }
  }, []);


  return (<>
    <div className={cssGlobal.fundoEscuro}>
      <div className={cssGlobal.espacamentoMenuCima}></div>
      <Component {...pageProps} carregando={carregando} cssGlobal={cssGlobal} />
      <div className={cssGlobal.espacamentoMenuBaixo}></div>
    </div>
  </>)
}

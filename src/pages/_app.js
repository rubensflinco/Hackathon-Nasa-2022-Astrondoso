import * as React from 'react'
import cssGlobal from '../styles/global.module.css'
import Router from 'next/router'
import Head from 'next/head';


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


  return (<>
    <Head>
      <Script id="google-tag-manager">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WQPVCXV8');
      `}
      </Script>
    </Head>
    <div className={cssGlobal.fundoEscuro}>
      <div className={cssGlobal.espacamentoMenuCima}></div>
      <Component {...pageProps} carregando={carregando} cssGlobal={cssGlobal} />
      <div className={cssGlobal.espacamentoMenuBaixo}></div>
    </div>
    
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQPVCXV8"
        height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
  </>)
}

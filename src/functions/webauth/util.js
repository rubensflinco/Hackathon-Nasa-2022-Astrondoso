import config from "./config";

export default class WebAuthUtil {

    // static async logar() {
    //     return new Promise(async (sucesso, erro) => {
    //         let publicKeyCredentialRequestOptions = config().publicKeyCredentialRequestOptions;
    //         // if (String(this.isMobile()) === String(false)) {
    //         //     publicKeyCredentialRequestOptions.allowCredentials[0].transports = [''];
    //         // }

    //         navigator.credentials.get({
    //             publicKey: publicKeyCredentialRequestOptions
    //         }).then((res) => {
    //             let response = {
    //                 id: res.id,
    //                 clientDataJSONparse: JSON.parse(this.ab2str(res.response.clientDataJSON))
    //             };
    //             if (response.id === JSON.parse(atob(window.localStorage.getItem("chaveLoginWebAuthn"))).id) {
    //                 sucesso(response);
    //             } else {
    //                 localStorage.removeItem("chaveLoginWebAuthn");
    //                 erro("Impressão digital inválida!");
    //             }
    //         }).catch(async (err) => {
    //             console.error(err);
    //             erro(err);
    //         });
    //     });
    // }


    static async cadastrar(dadosUser) {
        return new Promise(async (resolve, reject) => {
            let numberRandom = Math.random();
            let publicKeyCredentialCreationOptions = {
                challenge: Uint8Array.from(String(numberRandom), c => c.charCodeAt(0)),
                rp: {
                    name: "Astrondoso",
                },
                user: {
                    id: Uint8Array.from(String(numberRandom+dadosUser.email), c => c.charCodeAt(0)),
                    name: dadosUser.email,
                    displayName: dadosUser.nome,
                },
                authenticatorSelection: {
                    authenticatorAttachment: "cross-platform",
                },
                pubKeyCredParams: [{ alg: -7, type: "public-key" }],
                timeout: 60000,
                attestation: "direct"
            }

            let res = await navigator.credentials.create({ publicKey: publicKeyCredentialCreationOptions });
            console.log("🚀 ~ file: util.js ~ line 54 ~ WebAuthUtil ~ returnnewPromise ~ res", res)

            // let chaveLoginWebAuthn = {
            //     id: res.id,
            //     rawId: this.ab2str(res.rawId)
            // }

            // resolve(chaveLoginWebAuthn);
        });
    }



    // static str2ab(str) {
    //     var buf = new ArrayBuffer(str.length * 1); // 2 bytes for each char
    //     var bufView = new Uint8Array(buf);
    //     for (var i = 0, strLen = str.length; i < strLen; i++) {
    //         bufView[i] = str.charCodeAt(i);
    //     }
    //     return buf;
    // }

    // static ab2str(buf) {
    //     return String.fromCharCode.apply(null, new Uint8Array(buf));
    // }
}
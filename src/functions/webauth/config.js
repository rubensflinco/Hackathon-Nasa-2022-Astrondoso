import Util from "./util";

let config = () => {
    return ({
        publicKeyCredentialRequestOptions: {
            challenge: Uint8Array.from(String(window.localStorage.getItem("emailWebAuthn")), c => c.charCodeAt(0)),
            allowCredentials: [{
                id: Util.str2ab( String(JSON.parse(atob(window.localStorage.getItem("chaveLoginWebAuthn") || "Int9Ig==")).rawId) ),
                type: 'public-key',
                transports: ['internal'],
            }],
            timeout: 60000,
        },
        publicKeyCredentialCreationOptions: {
            challenge: Uint8Array.from(String(window.localStorage.getItem("emailWebAuthn")), c => c.charCodeAt(0)),
            rp: {
                name: "Astrondoso",
            },
            user: {
                id: Uint8Array.from(String(window.localStorage.getItem("emailWebAuthn")), c => c.charCodeAt(0)),
                name: window.localStorage.getItem("emailWebAuthn"),
                displayName: window.localStorage.getItem("contaSelecionadaNome"),
            },
            authenticatorSelection: {
                authenticatorAttachment: "platform",
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            timeout: 60000,
            attestation: "direct"
        }
    })
};

export default config;
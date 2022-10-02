import jwt from "jsonwebtoken";
import { getCookie } from 'cookies-next';
import deslogarUser from "./deslogarUser";

export default async function getUsuarioPorTokenCookies(context) {
    return new Promise(async (resolve, reject) => {
        if (context === "CLIENTE") {
            try {
                let token_sessao_usuario = await getCookie('token_sessao_usuario_cliente');

                if (token_sessao_usuario) {
                    let resJwt = await jwt.decode(token_sessao_usuario);
                    resJwt.token = token_sessao_usuario;
                    resolve(resJwt);
                } else {
                    resolve(null);
                }


            } catch (error) {
                console.error("error", error);
                // deslogarUser(context);
                reject(error);
            }
        } else {
            try {
                let token_sessao_usuario = await getCookie('token_sessao_usuario', { req: context.req, res: context.res });

                if (token_sessao_usuario) {
                    let resJwt = await jwt.verify(token_sessao_usuario, process.env.JWT_CHAVE_PRIVADA_TOKEN_USUARIO);
                    resJwt.token = token_sessao_usuario;
                    resolve(resJwt);
                } else {
                    resolve(null);
                }


            } catch (error) {
                console.error("error", error);
                // deslogarUser(context);
                reject(error);
            }
        }
    });
}
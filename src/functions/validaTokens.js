import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';


export default async function validaTokens(tokenAmbiente = false, tokenUsuario = false) {
    return new Promise(async (resolve, reject) => {

        let ambiente = await validaAmbiente(tokenAmbiente);
        if (tokenAmbiente === false) { ambiente = true };

        if (tokenUsuario !== false) {
            let usuario = await validaUsuario(tokenUsuario);
            if (ambiente === true && usuario !== false) {
                resolve(usuario);
                return;
            } else {
                reject(new Error(`Tokens enviados para API são inválidos.`));
            }
        } else {

            if (ambiente === true) {
                resolve(true);
                return;
            } else {
                reject(new Error(`Tokens enviados para API são inválidos.`));
            }

        }
    });



    async function validaAmbiente(tokenAmbiente) {
        return new Promise(async (resolve, reject) => {
            if (tokenAmbiente) {
                try {
                    if (String(tokenAmbiente) === String(process.env.API_PRIVADA_TOKEN_AMBIENTE)) {
                        resolve(true);
                        return;
                    } else {
                        resolve(false);
                        return;
                    }
                } catch (error) {
                    resolve(false);
                    return;
                }
            } else {
                resolve(null);
            }
        });
    }



    async function validaUsuario(tokenUsuario) {
        return new Promise(async (resolve, reject) => {
            if (tokenUsuario) {
                try {
                    let resJwt = jwt.verify(tokenUsuario, String(process.env.JWT_CHAVE_PRIVADA_TOKEN_USUARIO));
                    let resBanco = await Usuario.findOne({ _id: resJwt.id });
                    if (resBanco) {
                        resolve(resBanco);
                        return;
                    } else {
                        resolve(false);
                        return false;
                    }
                } catch (error) {
                    resolve(false);
                    return false;
                }
            } else {
                resolve(false);
            }
        });
    }



}
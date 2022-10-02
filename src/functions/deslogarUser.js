import jwt from "jsonwebtoken";
import { deleteCookie } from 'cookies-next';

export default async function deslogarUser(context) {
    return new Promise(async (resolve, reject) => {
            try {
                await deleteCookie('token_sessao_usuario', {req: context.req, res: context.res});
            } catch (error) {}
            try {
                await deleteCookie('token_sessao_usuario_cliente');
            } catch (error) {}
            try {
                window.location.href = '/logando';
            } catch (error) {}
    });
}
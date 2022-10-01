import NextCors from 'nextjs-cors';
import bcryptjs from 'bcryptjs'
import apiResponse from "../../../../functions/apiResponse";
import databaseConnect from "../../../../functions/databaseConnect";
import validaTokens from "../../../../functions/validaTokens";
import Usuario from '../../../../models/usuario';
import replaceAll from '../../../../functions/replaceAll';
import jwt from 'jsonwebtoken';

export default async function apiPrivadaUsuarioLogar(req, res) {
  if (res !== null) {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    });
  }



  if (req?.method === "POST") {
    try {
      let body = req.body;
      let dados = body?.dados;
      let condicoes = body?.condicoes;
      let tokenAmbiente = req.headers.token_ambiente;
      let resValidacao = await validaTokens(tokenAmbiente || true, false);
      await databaseConnect();




      if (!condicoes?.email) {
        throw new Error(`ValidationError: Campo 'condicoes.email' é obrigatório.`);
      }



      let resBancoDeDados = await Usuario.findOne({ email: condicoes?.email }, { runValidators: true }).select('+senha status statusMotivo');
      if(resBancoDeDados?.status === "verificado"){

        let dadosToken = { id: String(resBancoDeDados?._id) }
        let token = jwt.sign(dadosToken, String(process.env.JWT_CHAVE_PRIVADA_TOKEN_USUARIO), { expiresIn: '7d' });
        if (bcryptjs.compareSync(condicoes?.senha, resBancoDeDados?.senha)) {
          return apiResponse(res, 400, "ERRO", "Dados obtidos token do usuario na resposta.", {tokenUsuario: token});
        } else {
          throw new Error(`ValidationError: Dados não existe ou senha está inválida.`);
        }
      }else{
        throw new Error(`ValidationError: Usuario com status '${resBancoDeDados?.status}' pelo motivo: ${resBancoDeDados?.statusMotivo} .`);
      }



    } catch (error) {
      if (String(error).includes(`email_1 dup key`)) {
        return apiResponse(res, 400, "ERRO", "Endereço de email já cadastrado.", String(error));
      }
      if (String(error).includes(`ValidationError:`)) {
        return apiResponse(res, 400, "ERRO", replaceAll((String(error).replace("ValidationError: ", "")), ":", ""), String(error));
      }


      console.error(error);
      return apiResponse(res, 500, "ERRO", "Tivemos um problema tente novamente mais tarde, caso persistir contate nossa equipe de atendimento via email.", String(error));
    }
  } else {
    return apiResponse(res, 404, "ERRO", "404 endpoint não existe.", "");
  }
}

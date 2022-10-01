import NextCors from 'nextjs-cors';
import bcryptjs from 'bcryptjs'
import apiResponse from "../../../../functions/apiResponse";
import criarSlug from "../../../../functions/criarSlug";
import databaseConnect from "../../../../functions/databaseConnect";
import validaTokens from "../../../../functions/validaTokens";
import Usuario from '../../../../models/usuario';
import replaceAll from '../../../../functions/replaceAll';

export default async function apiPrivadaUsuarioCriar(req, res) {
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




      if (!dados.slug) {
        dados.slug = criarSlug(dados.nome);
      }
      if (dados.senha) {
        dados.senha = bcryptjs.hashSync(dados.senha, bcryptjs.genSaltSync(10));
      }



      let resBancoDeDados = await Usuario.create(dados);
      return apiResponse(res, 200, "OK", "Dados criados e listados na resposta.", resBancoDeDados);



    } catch (error) {
      if (String(error).includes(`email_1 dup key`)) {
        return apiResponse(res, 400, "ERRO", "Error endereço de email já cadastrado.", String(error));
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

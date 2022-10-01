import NextCors from 'nextjs-cors';
import apiResponse from "../../../../functions/apiResponse";
import criarSlug from "../../../../functions/criarSlug";
import databaseConnect from "../../../../functions/databaseConnect";
import Usuario from '../../../../models/usuario';
import replaceAll from '../../../../functions/replaceAll';
import jwt from 'jsonwebtoken';

export default async function apiPublicaUsuarioCriar(req, res) {
  let method = 'POST'

  if (res !== null) {
    await NextCors(req, res, {
      methods: ['HEAD', 'OPTIONS', method],
      origin: '*',
      optionsSuccessStatus: 200,
    });
  }



  if (req?.method === method) {
    try {
      let body = req.body;
      let dados = body?.dados;
      let condicoes = body?.condicoes;
      await databaseConnect();




      if (!dados.slug) {
        dados.slug = criarSlug(dados.nome);
      }


      let resBancoDeDados = await Usuario.create(dados);
      let dadosToken = { id: String(resBancoDeDados?._id) }
      let token = jwt.sign(dadosToken, String(process.env.JWT_CHAVE_PRIVADA_TOKEN_USUARIO), { expiresIn: '7d' });
      resBancoDeDados.token = token;

      return apiResponse(res, 200, "OK", "Dados criados e listados na resposta.", resBancoDeDados);



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

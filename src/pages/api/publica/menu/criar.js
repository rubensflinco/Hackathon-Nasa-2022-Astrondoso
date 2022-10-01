import NextCors from 'nextjs-cors';
import apiResponse from "../../../../functions/apiResponse";
import databaseConnect from "../../../../functions/databaseConnect";
import Menu from '../../../../models/menu';
import replaceAll from '../../../../functions/replaceAll';

export default async function apiPublicaMenuCriar(req, res) {
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



      let resBancoDeDados = await Menu.create(dados);
      return apiResponse(res, 200, "OK", "Dados criados e listados na resposta.", resBancoDeDados);



    } catch (error) {
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

import NextCors from 'nextjs-cors';
import apiResponse from "../../../../functions/apiResponse";
import databaseConnect from "../../../../functions/databaseConnect";
import validaTokens from "../../../../functions/validaTokens";
import Usuario from '../../../../models/usuario';
import replaceAll from '../../../../functions/replaceAll';
import '../../../../models/empresa';

export default async function apiPrivadaUsuarioObter(req, res) {
  if (res !== null) {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    });
  }



  if (req?.method === "GET") {
    try {
      let body = req.body;
      let dados = body?.dados;
      let condicoes = body?.condicoes;
      let tokenAmbiente = req.headers.token_ambiente;
      let resValidacao = await validaTokens(tokenAmbiente || true, false);
      let parametrosBusca = {};
      await databaseConnect();




      if(condicoes?.slug){
        parametrosBusca.slug = condicoes?.slug;
      }
      if(condicoes?.email){
        parametrosBusca.email = condicoes?.email;
      }
      if(condicoes?.id){
        parametrosBusca.id = condicoes?.id;
      }
      if (!condicoes?.limite) {
        condicoes.limite = 1;
      }
      if(Object.keys(parametrosBusca).length == 0){
        throw new Error(`ValidationError: Você não informou nenhuma condição de filtro para conseguirmos obter um usuario no banco de dados.`);
      }



      let resBancoDeDados = await Usuario.find(parametrosBusca).populate({ path: "empresas.id" }).sort({ createdAt: 'desc' }).limit(parseInt(condicoes.limite));
      return apiResponse(res, 200, "OK", "Dados obtidos e listados na resposta.", resBancoDeDados);



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

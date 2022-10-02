import NextCors from 'nextjs-cors';
import apiResponse from "../../../../functions/apiResponse";
import databaseConnect from "../../../../functions/databaseConnect";
import Artigo from '../../../../models/artigo';
import replaceAll from '../../../../functions/replaceAll';

export default async function apiPublicaArtigoObter(req, res) {
  let method = 'PROPFIND'
  
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
      let parametrosBusca = {};
      await databaseConnect();




      if(condicoes?.slug){
        parametrosBusca.slug = condicoes?.slug;
      }
      if(condicoes?._id){
        parametrosBusca._id = condicoes?._id;
      }
      if (!condicoes?.limite) {
        condicoes.limite = 1;
      }
      

      let resBancoDeDados = await Artigo.find(parametrosBusca).sort({ createdAt: 'desc' }).limit(parseInt(condicoes.limite));
      return apiResponse(res, 200, "OK", "Dados obtidos e listados na resposta.", resBancoDeDados);



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

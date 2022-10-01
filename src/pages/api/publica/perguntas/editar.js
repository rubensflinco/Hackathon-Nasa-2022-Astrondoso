import NextCors from 'nextjs-cors';
import apiResponse from "../../../../functions/apiResponse";
import databaseConnect from "../../../../functions/databaseConnect";
import Perguntas from '../../../../models/perguntas';
import replaceAll from '../../../../functions/replaceAll';

export default async function apiPublicaPerguntasEditar(req, res) {
  let method = 'PUT';
  
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

      if (Object.keys(dados).length == 0) {
        throw new Error(`ValidationError: Você não informou nenhum dado a ser editado.`);
      }

      let resBancoDeDados = await Perguntas.findOneAndUpdate({ _id: condicoes._id }, dados, { runValidators: true });
      if(resBancoDeDados){
        return apiResponse(res, 200, "OK", "Dados atualizados com sucesso.", resBancoDeDados);
      }else{
        throw new Error(`ValidationError: Dado não encontrado.`);
      }

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
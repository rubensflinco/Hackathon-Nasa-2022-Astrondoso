import NextCors from 'nextjs-cors';
import apiResponse from "../../../../functions/apiResponse";
import databaseConnect from "../../../../functions/databaseConnect";
import validaTokens from "../../../../functions/validaTokens";
import replaceAll from '../../../../functions/replaceAll';
import apiPrivadaUsuarioEditar from './editar';

export default async function apiPrivadaUsuarioArquivar(req, res) {
  if (res !== null) {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    });
  }



  if (req?.method === "DELETE") {
    try {
      let body = req.body;
      let dados = body?.dados;
      let condicoes = body?.condicoes;
      let tokenAmbiente = req.headers.token_ambiente;
      let tokenUsuario = req.headers.token_usuario;
      let resValidacao = await validaTokens(tokenAmbiente || true, tokenUsuario || null);
      let editarDados = {};
      await databaseConnect();




      if (!dados.statusMotivo) {
        throw new Error(`ValidationError: Campo 'dados.statusMotivo' é obrigatório.`);
      }
      if(dados?.statusMotivo){
        editarDados.status = "desativado";
        editarDados.statusMotivo = dados?.statusMotivo;
      }


      let resFunction = await apiPrivadaUsuarioEditar({ ...req, body: { dados: editarDados }, method: `PUT` }, null);
      if(resFunction?.status === "OK"){
        return apiResponse(res, 200, "OK", "Usuario arquivado com sucesso, para remoção dos dados completa contate nossa equipe de atendimento via email.", resFunction?.resposta);
      }else{
        throw new Error(`ValidationError: ${resFunction?.statusMotivo?.replace("Error", "")}`);
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

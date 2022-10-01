import NextCors from 'nextjs-cors';
import bcryptjs from 'bcryptjs'
import apiResponse from "../../../../functions/apiResponse";
import databaseConnect from "../../../../functions/databaseConnect";
import validaTokens from "../../../../functions/validaTokens";
import Usuario from '../../../../models/usuario';
import replaceAll from '../../../../functions/replaceAll';

export default async function apiPrivadaUsuarioEditar(req, res) {
  if (res !== null) {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    });
  }



  if (req?.method === "PUT") {
    try {
      let body = req.body;
      let dados = body?.dados;
      let condicoes = body?.condicoes;
      let tokenAmbiente = req.headers.token_ambiente;
      let tokenUsuario = req.headers.token_usuario;
      let resValidacao = await validaTokens(tokenAmbiente || true, tokenUsuario || null);
      let editarDados = dados ? dados : {};
      let dadosTokenUsuario = {};
      await databaseConnect();


      if (typeof resValidacao === 'object') {
        dadosTokenUsuario = resValidacao;
      }
      if (!dadosTokenUsuario?._id) {
        throw new Error(`ValidationError: Usuario não encontrato pelo token.`);
      }
      if (dados?._id) {
        delete editarDados._id;
      }
      if (dados.senha) {
        editarDados.senha = bcryptjs.hashSync(dados.senha, bcryptjs.genSaltSync(10));
      }
      if (Object.keys(editarDados).length == 0) {
        throw new Error(`ValidationError: Você não informou nenhum dado a ser editado.`);
      }



      let resBancoDeDados = await Usuario.findOneAndUpdate({ _id: dadosTokenUsuario?._id }, editarDados, { runValidators: true });
      if(resBancoDeDados){
        return apiResponse(res, 200, "OK", "Dados atualizados com sucesso.", resBancoDeDados);
      }else{
        throw new Error(`ValidationError: Usuario não encontrado.`);
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

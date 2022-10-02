export default async function encontrarEtapasDoQuiz(perguntas, pergunta = null) {
  if (pergunta === null) {

    return {
      primeiroPergunta: perguntas?.[0]?._id,
      ultimoPergunta: perguntas?.[perguntas?.length - 1]?._id,
    }

    
  } else {
    let indexPerguntaAtual = await perguntas?.findIndex((v) => { return v._id === pergunta._id; });

    return {
      primeiroPergunta: perguntas?.[0]?._id,
      ultimoPergunta: perguntas?.[perguntas?.length - 1]?._id,
      perguntaAtual: pergunta?._id,
      proximoPergunta: perguntas?.[indexPerguntaAtual + 1]?._id || null,
      perguntaAnterior: perguntas?.[indexPerguntaAtual - 1]?._id || null,
    }

  }
}
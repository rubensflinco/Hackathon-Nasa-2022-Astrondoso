export default async function request(metodo, url,  headers = {}, body = {}) {
    return new Promise(async (sucesso, erro) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token_ambiente", process.env.TOKEN_AMBIENTE);
        for (var key in headers) {
           let value = headers[key];
           myHeaders.append(key, value);
        }

        var requestOptions = {
            method: metodo,
            headers: myHeaders,
            body: JSON?.stringify(body),
            redirect: 'follow'
        };

        try {
            let respostaApi = await fetch(url, requestOptions);
            respostaApi = await respostaApi.json();
            if (respostaApi.status === "OK") {
                sucesso(respostaApi?.resposta);
            } else {
                console.error(respostaApi);
                erro(respostaApi?.statusMotivo);
            }
        } catch (error) {
            console.error(error);
            erro(String(error));
        }
    })
}
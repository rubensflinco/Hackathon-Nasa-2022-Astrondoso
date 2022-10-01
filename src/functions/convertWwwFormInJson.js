import qs from 'qs';

export default async function convertWwwFormInJson(req) {
    return new Promise(async (sucesso, erro) => {
        let body = '';
        let jsonBody = {};
        req.on('data', (chunk) => { body += chunk });
        req.on('end', () => {
            jsonBody = qs.parse(body);
            sucesso(jsonBody);
        });
    })
}
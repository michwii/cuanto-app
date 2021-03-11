const got = require("got");
var FormData = require("form-data");
var console;

module.exports = async function (context, req) {
    console = context;

    const jwtToken = extractToken(req.headers['authorization']);
    const tenantId = '323d9c5b-c193-4c4f-8fb6-a029b2a10ca3';
   
    var bodyFormData = new FormData();
    bodyFormData.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
    bodyFormData.append('client_id', '08bbbb87-f561-49c5-b8b7-f9cbd2a096ed');
    bodyFormData.append('client_secret', 'B.ZhLFFQViSF22-3nH_kpM8Lmx1SZIZ~~8');
    bodyFormData.append('assertion', jwtToken);
    bodyFormData.append('scope', 'openid');
    bodyFormData.append('requested_token_use', 'on_behalf_of');

    const url = 'https://login.microsoftonline.com/'+tenantId+'/oauth2/v2.0/token';
    
    try{
        
        const {body} = await got(url, {
            method: 'POST',
            headers: bodyFormData.getHeaders(),
            body: bodyFormData
        });
        
        context.res = {
            body: body
        };
    }catch(e){
        console.log('Erreur détectée');
        context.res = {
            body: e.response.body
        };
    }
    
}

extractToken = function(header){
    const split = header.split(' ');
    return split[1];
}
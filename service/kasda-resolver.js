const axios = require('axios');
module.exports = async (proxy, current_useragent) => {
    try {
        let response = await axios.post('https://api.capsolver.com/kasada/invoke', {
            "clientKey": process.env.CapSolverKey,
            "appId": 'B278567A-C94E-457E-B419-F1D6A5D1AA6D',
            "task": {
                "type": "AntiKasadaTask",
                "pageURL": "https://gql.twitch.tv/",
                "proxy": proxy.proxy.href,
                "cd": true,
                "onlyCD": false,
                "userAgent": current_useragent
            }
        }, {
            headers: { 'content-type': 'text/json' }
        });
        if (response.data.success) {
            current_useragent = response.data.solution['user-agent']; // ДОБАВИТЬ ВОЗВРАТ юзерагента 
            KasdaResponse = {};
            KasdaResponse.original = response.data.solution;
            KasdaResponse.useragent = response.data.solution['user-agent'];
            KasdaResponse.kpsdkcd = response.data.solution['x-kpsdk-cd'];
            KasdaResponse.kpsdkct = response.data.solution['x-kpsdk-ct'];
            console.log(KasdaResponse);
        }
        
        return KasdaResponse;
    } catch (e) {
        console.log(e);
    }
};
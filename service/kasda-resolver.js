const axios = require('axios');
module.exports = async (proxy, current_useragent) => {
    try {
        let response = await axios.post('https://api.capsolver.com/kasada/invoke', {
            "clientKey": process.env.CapSolverKey,
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
            current_useragent = response.data.solution['user-agent'];
            KasdaResponse = {};
            KasdaResponse.original = response.data.solution;
            KasdaResponse.useragent = response.data.solution['user-agent'];
            KasdaResponse.kpsdkcd = response.data.solution['x-kpsdk-cd'];
            KasdaResponse.kpsdkct = response.data.solution['x-kpsdk-ct'];
        }
        return KasdaResponse;
    } catch (e) {
        //console.log(e);
    }
};
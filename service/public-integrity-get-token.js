const axios = require('axios');
module.exports = async (TwitchClinetID, XDeviceId, ClientRequestId, ClientSessionId, ClientVersion, kpsdkct, kpsdkcd, accesstoken, Useragent, currennt_porxy) => {
    try {
        let options = currennt_porxy;
        options.headers = {
            'User-Agent': Useragent,
            Accept: 'application/json',
            'Accept-Language': 'en-US',
            'Accept-Encoding': 'identity',
            Authorization: "OAuth " + accesstoken,
            'Referer': 'https://www.twitch.tv/',
            'Client-Id': TwitchClinetID,
            'X-Device-Id': XDeviceId,
            'Client-Request-Id': ClientRequestId,
            'Client-Session-Id': ClientSessionId,
            'Client-Version': ClientVersion,
            'x-kpsdk-ct': kpsdkct,
            'x-kpsdk-cd': kpsdkcd,
            'Origin': 'https://www.twitch.tv',
            'DNT': 1,
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'Content-Length': 0,
        };

        let response = await axios.post('https://gql.twitch.tv/integrity', {}, options);
        if (response.data.token) {
            cookies = '';
            response.headers['set-cookie'].forEach(element => {
                let p1 = element.split(';')[0];
                cookies = cookies + p1 + '; ';
            });

            let result = [];
            result['token'] = response.data.token;
            result['cookies'] = cookies;
            return result;
        }
    } catch (e) {
        console.log(e);
    }

    return false;
};
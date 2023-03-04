const axios = require('axios');
module.exports = async (FollowUserID, ClientID, XDeviceId, ClientVersion, ClientSessionId, accessToken, ClientIntegrity, Useragent, currennt_porxy) => {
    let query = `[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"${FollowUserID}"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"800e7346bdf7e5278a3c1d3f21b2b56e2639928f86815677a7126b093b2fdd08"}}}]`;
    try {
        let options = currennt_porxy;
        options.headers = { 
            'User-Agent': Useragent,
            Accept: 'application/json',
            'Accept-Language': 'en-US',
            'Accept-Encoding': 'identity',
            Referer: 'https://www.twitch.tv/',
            'Client-Id': ClientID,
            'X-Device-Id': XDeviceId,
            'Client-Version': ClientVersion,
            'Client-Session': ClientSessionId,
            Authorization: "OAuth " + accessToken,
            'Client-Integrity': ClientIntegrity,
            'Content-Type': 'text/plain;charset=UTF-8',
            Origin: 'https://www.twitch.tv',
            DNT: 1,
            Connection: 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site'
        };
       
        let response = await axios.post('https://gql.twitch.tv/gql#origin=twilight', query, options);
        return response.data;
    } catch (e) {
        console.log(e);
        return {};
    }
};
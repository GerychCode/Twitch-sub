const axios = require('axios');
require('dotenv').config();
module.exports = async (uname) => {
    json = {"operationName": "ChannelShell",
        "variables": {
            "login": uname
        },
        "extensions": {
            "persistedQuery": {
                "version": 1,
                "sha256Hash": "580ab410bcd0c1ad194224957ae2241e5d252b2c5173d8e0cce9d32d5bb14efe"
            }
        }
    }
    headers = {
        headers : {'Client-ID': process.env.TwitchClinetID}
    }
    response = await axios.post('https://gql.twitch.tv/gql', json, headers);
    if(response.data.data.userOrError != undefined && response.data.data.userOrError.id != undefined)
    {
        return response.data.data.userOrError.id;
    } else {
        return false;
    }
}
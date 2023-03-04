const getTwitchCookies = require('./service/get-twitch-cookies.js');
const getUserAgent = require('./service/utils/get-user-agent.js');
const getUserId = require('./service/get-user-id.js');
const KasdaResolver = require('./service/kasda-resolver.js');
const generateRandomId = require('./service/utils/generate-random-id.js');
const PublicIntegrityGetToken = require('./service/public-integrity-get-token.js');
const FollowRequest = require('./service/follow-request.js');
const getProxy = require('./service/utils/get-proxy.js');

const followFunc = async (access_token, username, proxyType = process.env.proxyType, clientId = process.env.TwitchClinetID, clientVersion = process.env.ClientV) => {
  try {
    const currentProxy = getProxy(proxyType);
    const userAgent = getUserAgent();
    const [userId, cookies, kasdaRes] = await Promise.all([
      getUserId(username),
      getTwitchCookies(userAgent),
      KasdaResolver(currentProxy, userAgent),
    ]);
    if (!cookies) {
      throw new Error('Error getting Twitch cookies');
    }
    if (!kasdaRes) {
      throw new Error('Error resolving Kasda');
    }
    const clientSessionId = generateRandomId(16).toLowerCase();
    const xDeviceId = cookies['unique_id'];
    const clientRequestId = generateRandomId(32);
    const publicInter = await PublicIntegrityGetToken(clientId, xDeviceId, clientRequestId, clientSessionId, clientVersion, kasdaRes.kpsdkct, kasdaRes.kpsdkcd, access_token, userAgent, currentProxy);
    await FollowRequest(userId, clientId, xDeviceId, clientVersion, clientSessionId, access_token, publicInter.token, userAgent, currentProxy);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// setInterval(() => {
//   try {
//     followFunc('w1vhai1nu9ixrqbzpnqei8exige0il', 'place');
//   } catch (error) {
//     console.error(error);
//   }
// }, 20000);
followFunc('w1vhai1nu9ixrqbzpnqei8exige0il', 'gaechkatm');


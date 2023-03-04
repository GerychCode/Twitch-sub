const getTwitchCookies = require('./service/get-twitch-cookies.js');
const getUserAgent = require('./service/utils/get-user-agent.js');
const getUserId = require('./service/get-user-id.js');
const KasdaResolver = require('./service/kasda-resolver.js');
const generateRandomId = require('./service/utils/generate-random-id.js');
const PublicIntegrityGetToken = require('./service/public-integrity-get-token.js');
const FollowRequest = require('./service/follow-request.js');
const getProxy = require('./service/utils/get-proxy.js');
// (async () => {
//     try {
//         const UserId = await getUserId('thekolkhoznik');
//         const cookies = await getTwitchCookies(userAgent);
//     } catch (error) {
//       console.error(error);
//     }
//   })();
let currennt_porxy = {};

const followFunc = async (access_token) => {
  try {
    currennt_porxy = getProxy(process.env.proxyType);
    const UserId = await getUserId('mihalina_');
    let userAgent = getUserAgent();
    //Добавить прокси - не забыть про валидацию 
    const cookies = await getTwitchCookies(userAgent);
    if (!cookies) return false; // Ошибка кукисов
    const KasdaRes = await KasdaResolver(currennt_porxy, userAgent);
    if (!KasdaRes) return false; // ошипка запроса к касадре

    let ClientID = process.env.TwitchClinetID;
    let ClientSessionId = generateRandomId(16).toLowerCase(); // Почему нельзя подсосаться к сесии из переменной cookies??
    let XDeviceId = cookies['unique_id'];
    let ClientVersion = process.env.ClientV; // Поменять (В идеале тоже спиздить с cookies)
    let ClientRequestID = generateRandomId(32);
    let PublicInter = await PublicIntegrityGetToken(ClientID, XDeviceId, ClientRequestID, ClientSessionId, ClientVersion, KasdaRes?.kpsdkct, KasdaRes?.kpsdkcd, access_token, userAgent, currennt_porxy);
    await FollowRequest(UserId, ClientID, XDeviceId, ClientVersion, ClientSessionId, access_token, PublicInter['token'], userAgent, currennt_porxy);
    return true;

  } catch (error) {
    console.error(error);
  }
}

followFunc("w1vhai1nu9ixrqbzpnqei8exige0il")




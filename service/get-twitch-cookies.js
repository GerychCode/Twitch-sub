const axios = require('axios');

async function getCookies(userAgent) {
  const options = {
    headers: {
      'User-Agent': userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': 1,
    },
  };

  const response = await axios.get('https://twitch.tv', options);
  const cookies = response.headers['set-cookie'].map(cookie => cookie.split(';')[0])
    .reduce((obj, cookie) => {
      const [key, value] = cookie.split('=');
      obj[key] = value;
      return obj;
    }, {});

  return cookies;
}

module.exports = () => {
  return getCookies();
};
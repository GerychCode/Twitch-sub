const fs = require('fs');
let proxies = fs.readFileSync('./data/proxy.txt').toString().replace(/\r/g, '').split("\n");
module.exports = (ptype) => {
    if(proxies.length == 0) return {};
    let proxy = proxies[Math.floor(Math.random() * proxies.length)];
    let proxy_arry = proxy.split(':');
    if(proxy_arry.length == 2)
    {
        return {
            timeout: null,
            maxFreeSockets: 1,
            maxSockets: 1,
            maxTotalSockets: Infinity,
            sockets: {},
            freeSockets: {},
            requests: {},
            options: {},
            secureProxy: false,
            proxy: {
                protocol: ptype + ':',
                slashes: true,
                auth: null,
                host: proxy_arry[0],
                port: proxy_arry[1],
                hostname: proxy_arry[0],
                hash: null,
                search: null,
                query: null,
                href: ptype + '://' + proxy_arry[0] + ':' + proxy_arry[1]
            }
        };
    } else if(proxy_arry.length == 4) {
        return {
            timeout: null,
            maxFreeSockets: 1,
            maxSockets: 1,
            maxTotalSockets: Infinity,
            sockets: {},
            freeSockets: {},
            requests: {},
            options: {},
            secureProxy: false,
            proxy: {
                protocol: ptype + ':',
                slashes: true,
                auth: {
                    username: proxy_arry[2],
                    password: proxy_arry[3]
                },
                host: proxy_arry[0],
                port: proxy_arry[1],
                hostname: proxy_arry[0],
                hash: null,
                search: null,
                query: null,
                href: ptype + '://' + proxy_arry[2] + ':' + proxy_arry[3] + '@' + proxy_arry[0] + ':' + proxy_arry[1]
            }
        };
    } else {
        console.log("Proxy is not valid!");
        return {};
    }
};
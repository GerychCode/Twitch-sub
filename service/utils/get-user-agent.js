const fs = require('fs');

let useragents = fs.readFileSync('./data/useragents.txt').toString().replace(/\r/g, '').split("\n");
module.exports = () => {
    if (useragents.length == 0) {
        return {};
    }
    let useragent = useragents[Math.floor(Math.random() * useragents.length)];
    return useragent;
};
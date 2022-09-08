
let geoip = require('geoip-lite');
async function parseLine(line, arr, cloneUAParser){

    let doubleQuoteRegex = /(?!^)".*?"/g;
    let ipAddressRegex = /^\S*/;
    let string = line;
    let ipAddress = string.match(ipAddressRegex)[0];
    let userAgentString = string.match(doubleQuoteRegex)[2];
    
    cloneUAParser.setUA(userAgentString);
    
    try{
        let result = cloneUAParser.getResult();
        let geo = await geoip.lookup(ipAddress);

        let deviceType = result.device.type ? result.device.type : 'Desktop'
        let browser = result.browser.name ? result.browser.name : 'unknown'

        arr.push([`${string}`,`${deviceType}`, `${browser}`, `${geo.country}`,`${geo.region}`])

    } catch (e){
        // arr.push([`${string}`,`${result.device.type ? result.device.type : 'browser'}`, `yes`])
    }
}
module.exports = {
    parseLine,
}
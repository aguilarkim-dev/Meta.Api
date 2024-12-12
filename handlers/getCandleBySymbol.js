const MetaApi = require('metaapi.cloud-sdk').default;

async function getCandleBySymbol(token, accountId, symbol, timeframe){
    const api = new MetaApi(token);
    const account = await api.metatraderAccountApi.getAccount(accountId);
    const connection = account.getRPCConnection();

    await connection.connect();
    await connection.waitSynchronized();

    const result = await connection.getCandle(symbol.toUpperCase(), timeframe, true);

    await connection.close();

    return result;
}

module.exports = getCandleBySymbol;
const MetaApi = require('metaapi.cloud-sdk').default;
const { SynchronizationListener } = require('metaapi.cloud-sdk');

class QuoteListener extends SynchronizationListener {
    constructor(io, symbol){
        super();
        this.symbol = symbol;
        this.io = io
    }
    async onSymbolPriceUpdated(instanceIndex, price) {
      if(price.symbol === this.symbol) {
        //Logic here..
      }
    }
    async onCandlesUpdated(instanceIndex, candles) {
      for (const candle of candles) {
        if (candle.symbol === this.symbol) {
          //console.log(candle);
          this.io.emit(candle.symbol, candle);
        }
      }
    }
    async onTicksUpdated(instanceIndex, ticks) {
      for (const tick of ticks) {
        if (tick.symbol === this.symbol) {
          //Logic here..
        }
      }
    }
    async onBooksUpdated(instanceIndex, books) {
      for (const book of books) {
        if (book.symbol === this.symbol) {
          //Logic here..
        }
      }
    }
    async onSubscriptionDowngraded(instanceIndex, _symbol, updates, unsubscriptions) {
      console.log('Market data subscriptions for ' + _symbol + ' were downgraded by the server due to rate limits');
    }
}

async function subscribePriceBySymbol(io, token, accountId, symbol, timeframe, intervalInMilliseconds){
    const api = new MetaApi(token);
    const account = await api.metatraderAccountApi.getAccount(accountId);
    const connection = account.getStreamingConnection();

    const quoteListener = new QuoteListener(io, symbol);
    connection.addSynchronizationListener(quoteListener);

    await connection.connect();
    await connection.waitSynchronized();

    await connection.subscribeToMarketData(
        symbol, 
        [
            {type: 'candles', timeframe: timeframe, intervalInMilliseconds: intervalInMilliseconds}
        ]
    );

    connection.terminalState.price(symbol)
}

module.exports = subscribePriceBySymbol;
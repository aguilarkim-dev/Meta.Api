const express = require('express');
const getCandleBySymbol = require('../handlers/getCandleBySymbol');
const subscribePriceBySymbol = require('../handlers/subscribePriceBySymbol');
const router = express.Router();

router.get('/:symbol', async (req, res, next) => {

    try {
        const token = req.headers['metaapi-token'];
        const accountId = req.headers['metaapi-id'];
        const symbol = req.params.symbol;
        const { timeframe } = req.query;

        if(!timeframe){
            throw "timeframe param is required!"
        }

        const result = await getCandleBySymbol(token, accountId, symbol.toUpperCase(), timeframe)
        res.status(200).json(result);

    } catch (error) {

        next(error);

    }
    
});

router.post('/subscribe', async (req, res, next) => {

    try {
        const token = req.headers['metaapi-token'];
        const accountId = req.headers['metaapi-id'];
        const { symbol, timeframe, interval } = req.body;

        if(!timeframe){
            throw "timeframe param is required!"
        }

        await subscribePriceBySymbol(req.io, token, accountId, symbol.toUpperCase(), timeframe, interval);
        res.status(202).json({ status: "Subscribed! waiting for connections."});

    } catch (error) {

        next(error);

    }

});

module.exports = router;

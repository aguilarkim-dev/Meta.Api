const express = require('express');
const getCandleBySymbol = require('../handlers/getCandleBySymbol');
const router = express.Router();

router.get('/:symbol', async (req, res) => {

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

        const status = error.status ?? 500;
        res.status(status).json(error);

    }
    
});

module.exports = router;

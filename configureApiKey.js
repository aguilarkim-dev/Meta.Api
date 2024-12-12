require('dotenv').config();
const API_KEY = process.env.API_KEY;

function configureApiKey(req, res, next){
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== API_KEY) {
        return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
    
    next();
}

module.exports = configureApiKey;
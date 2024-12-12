require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const configureApiKey = require('./configureApiKey');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(configureApiKey);
app.use('/metaapi/forex', routes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
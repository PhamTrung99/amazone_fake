const express = require('express')
require('dotenv').config();
const path = require('path');

const app = express();

const index_path = path.join(__dirname,'/Template/index.html');

app.use(express.static('Template'));

app.get('/', (req, res) => {
    res.sendFile(index_path);
})

app.get('/err', (req, res) => {
    throw new Error('Error!');
})

app.use((req, res, next) => {
    res.status(404).json({
        error_message: 'Endpoint not found'
    });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Something broke!'
    });
})

app.listen(process.env.LOCAL_PORT, () => {
    console.log('App running on Port: ' + process.env.LOCAL_PORT);
})
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/resources', (req,res) => {
    const {url, title, notes} = req.body;

    console.log('Incoming packet...');
    console.log(`Title: ${title}`);
    console.log(`URL: ${url}`);
    console.log(`Notes: ${notes || 'None provided'}`);
    console.log('End of packet.');

    res.status(200).json({
        sucess: true,
        message: 'Data recieved by backend.'
    });
})

app.listen(5000, () => {
        console.log(`OpenAtlas server is actively listening on http://localhost:5000`);
    });
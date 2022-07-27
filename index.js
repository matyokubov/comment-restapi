const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors())

const fs = require('fs');
const path = require('path');

const getBodyData = require('./util');
const body = require("./comments.json")

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    fs.readFile('comments.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.end(data);
    })
})

app.post('/send', async(req, res) => {
    const data = await getBodyData(req);
    const {name, comment} = JSON.parse(data);
    const newData = {
        name, comment
    }
    body.push(newData);
    console.log(typeof(body), body, JSON.stringify(body))
    fs.writeFile(path.join(__dirname, "comments.json"), JSON.stringify(body), err => {
        if (err) throw err;
        let responseData = {
            status: 200,
            message: "Comment added successfully",
            data: newData
        }
        res.end(JSON.stringify(responseData));
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
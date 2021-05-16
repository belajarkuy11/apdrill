var pg_cfg = require('./pg-cfg');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())

const pool = pg_cfg.cfgDB;

app.get('/get/:id', (req, res) => {    
    ; (async () => {
        const client = await pool.connect()
        try {
            let id = req.params.id;
            console.log('get id '+id)
            const {rows} = await client.query('select * from app where id = $1', [id]);
            console.log('RESP '+rows[0].name);
            res.send(rows[0])
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.            
            console.log("finally release")            
            client.release()
            
        }   
        
        console.log('send response')
    })().catch(err => console.log(err.stack))
})

app.post('/save', (req, res) => {

    ; (async () => {
        const client = await pool.connect()
        try {
            let id = req.body.id;
            console.log('insert id '+id)
            const res = await client.query('insert into tbl values($1)', [id]);
            console.log('save success!!');
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.            
            console.log("finally release")            
            client.release()
            
        }
        res.send("return : success")
        console.log('send response')
    })().catch(err => console.log(err.stack))

});

app.listen(3111, () => {
    console.log("server is listening!!");
})
const express = require('express')
const app = express()

const mysql = require('mysql')
// const mybatisMapper = require('mybatis-mapper')
const pool = mysql.createPool({
    connectionLimit : 10,
    host : '0.0.0.0',
    user : 'root',
    password : '1234',
    database : 'lolapp'
})


const server = app.listen(4000, ()=>{
    console.log('Start Server : localhost : 4000')
})

app.set('views',__dirname + '/view')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.get('/',(req, res)=>{
    res.render('index.html')
})

app.get('/about', (req, res)=>{
    res.render('about.html');
})

app.get('/db', (req, res)=>{
    pool.getConnection( (err, connection)=> {
        if( err ) throw err; 
        connection.query('select * from member', (error, results, fields)=>{
            res.send(JSON.stringify(results))
            console.log('results', results)
            connection.release();
            if(error) throw error;
        })
    })
})
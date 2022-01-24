const express = require('express')
const app = express()

const mysql = require('mysql')
const mybatisMapper = require('mybatis-mapper')

const connection = mysql.createConnection({
    connectionLimit : 10,
    host : '0.0.0.0',
    user : 'root',
    password : '1234',
    database : 'lolapp',
})

mybatisMapper.createMapper(['./xml/testMapper.xml'])

let param = {
    test_id : 1234
}

let format = {language : 'sql', indent : '  '}

let query = mybatisMapper.getStatement('testMapper', 'testBasic', param, format)

console.log(query)

connection.connect();

connection.query(query, (error, results, fields)=>{
    if( error ) console.log(error)
    console.log(results)
})
connection.end();

// const pool = mysql.createPool({
//     connectionLimit : 10,
//     host : '0.0.0.0',
//     user : 'root',
//     password : '1234',
//     database : 'lolapp'
// })


const server = app.listen(4000, ()=>{
    console.log('Start Server : localhost : 4000')
})

app.set('views',__dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.get('/',(req, res)=>{
    res.render('index.html')
})

app.get('/about', (req, res)=>{
    res.render('about.html');
})

app.get('/db', (req, res)=>{
    res.render('about.html');
    // pool.getConnection( (err, connection)=> {
    //     if( err ) throw err; 
    //     connection.query('select * from member', (error, results, fields)=>{
    //         res.send(JSON.stringify(results))
    //         console.log('results', results)
    //         connection.release();
    //         if(error) throw error;
    //     })
    // })
})
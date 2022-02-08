var express = require('express');
var router = express.Router();/*
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cloudcomputing'
});

connection.connect((err) => {
    if(err){
      console.log(err.code);
      console.log(err.fatal);
    }
});

let query = "";

/* GET algos page. */
/*
router.get('/', (req, res, next) => {
  res.send('Base user page');
});

router.get('/get', (req, res, next) => {
    query = 'SELECT * FROM user';
    
    connection.query(query, function(err, result, fields){
        if(err)
        {
            console.log(err.code);
            console.log(err.message);
        }
        res.send(result);
        console.log("Getting info from DB.")
    });
    
});

router.post('/new', (req, res, next) => {
    console.log(req.body);
    query = `INSERT INTO user (name, username, password) VALUES ('${req.body.name}', '${req.body.username}', '${req.body.password}')`;
    connection.query(query, (err) => {
        if(err)
        {
            console.log(err.code);
            console.log(err.message);
        }
        else
        { 
            console.log("Added default user to DB.")
        }
    });
});

router.put('/update/:id', (req, res) => {
    console.log(req.params.id);
    let id = req.params.id;
    let user =  req.body;
    query = `UPDATE user SET name = '${req.body.name}', username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${id}`;
    connection.query(query, (err) => {
    if(err)
    {
        console.log(err.code);
        console.log(err.message);
    }
    else
    {
        console.log("Updated user");
        res.send(`User updated with the following info: \n${JSON.stringify(user)}`);
    }
    });
    
});

router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    let id = req.params.id;
    let user =  req.body;
    query = `DELETE FROM user WHERE id = ${id}`;
    connection.query(query, (err) => {
    if(err)
    {
        console.log(err.code);
        console.log(err.message);
    }
    else
    {
        console.log("Deleted user");
        res.send(`User deleted with the following info: \n${JSON.stringify(user)}`);
    }
    });
    
});
*/
module.exports = router;

var mysql = require("mysql");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "inventory"
    
    });
    
    db.connect(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("connected to database inventory");
        }
    })
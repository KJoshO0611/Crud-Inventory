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
    });

    exports.getItem = function(id, callback){
        let sql = `SELECT * From items`;
        db.query(sql, function(err, data){
            if(err){
                callback(err);
            }else{
                callback(null,data);
            }
        })
    }
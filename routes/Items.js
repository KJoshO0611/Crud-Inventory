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

    exports.getoneItem = function(id, callback){
        let sql = `SELECT * From items WHERE id = ?`;
        db.query(sql,[id] ,function(err, data){
            if(err){
                callback(err);
            }else{
                callback(null,data);
            }
        })
    }

    exports.insertItem = function(data, callback){
        let sql = "INSERT into items set ?";
    
        db.query(sql, [data], function(err, result){
            if(err){
                callback(err);
            }else{
                callback(null, result);
            }
        })
    }

    exports.updateItem = function(id, data, callback){
        let sql = "update items set ? where id = ?";
        db.query(sql, [data, id], function(err, data){
            if(err){
                callback(err);
            }else{
                callback(null, data);
            }
        })
    }

    exports.deleteItem = function(id, callback){
    let sql = "DELETE from items where id = ?";
    db.query(sql, [id],function(err, data){
        if(err){
            callback(err);
        }else{
            callback(null, data);
        }
    })
}

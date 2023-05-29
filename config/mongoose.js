const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

const db = mongoose.connection;

db.on('error',function(err){
    console.log(`error in connecting to database: ${err}`);
});

db.once('open',function(){
    console.log("Succesfully connected to database");
})
const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    lastname : {type:String, required : true},
    firstname : {type:String, required : true},
    email : {type:String, required : true},
    rdvDate : {type:Date, required : true},
    rdvHeure : {type:String, required : true},

});

module.exports = mongoose.model('Model', ModelSchema);
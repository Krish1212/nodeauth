var mongoose = require('mongoose');
var db = mongoose.connection;

//Set the connection here
mongoose.connect('mongodb://localhost/nodeauth');

var userSchema = mongoose.Schema({
    username : {
        type: String,
        index: true
    },
    password : {
        type: String
    },
    name : {
        type: String
    },
    email : {
        type : String
    },
    profileImage : {
        type : String
    }
});

var User = module.exports = mongoose.model('User',userSchema);

module.exports.createUser = function(newUser,callback){
    newUser.save(callback);
};
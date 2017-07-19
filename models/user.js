var mongoose = require('mongoose');
var crypto = require('crypto');
var db = mongoose.connection;

//sub function hash to encrypt the entered password
function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000", salt, hashed.toString('hex')].join('$');
}

//Set the connection here
mongoose.connect('mongodb://localhost/nodeauth');

var userSchema = mongoose.Schema({
    username : {
        type: String,
        index: true
    },
    password : {
        type: String,
        required:true
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

module.exports.getUserByUsername = function(username,callback){
    var query = {username: username};
    User.findOne(query,callback);
};

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

module.exports.comparePassword = function(userpassword,dbpassword,callback){
    var salt = dbpassword.split('$')[2];
    var hashedPassword = hash(userpassword,salt);
    var isMatch = false;
    var err;
    try {
        if (userpassword === hashedPassword) {
            console.log('Valid password');
            isMatch = true;
            return callback(null,isMatch);
        }
    } catch (error) {
        console.log(error);
        err = error;
    }
    if (err) callback(err,isMatch);
};

module.exports.createUser = function(newUser,callback){
    //set a salt variable to append to the entered password
    var salt = crypto.randomBytes(128).toString('hex');
    //Now hash the entered password
    //and replace in the same variable
    newUser.password = hash(newUser.password,salt);
    newUser.save(callback);
};
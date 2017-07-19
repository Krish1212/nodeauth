var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Create the model object
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{title : 'Register'});
});

router.get('/login',function(req,res,next){
  res.render('login',{title: 'Login'});
});

router.post('/register',function(req,res,next){
  //Get the form values
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.files.profileImage){
  console.log('Uploading...');
    //Uploaded file information
    var profileImageOriginalName = req.files.profileImage.originalname;
    var profileImageName = req.files.profileImage.name;
    var profileImageMime = req.files.profileImage.mimetype;
    var profileImagePath = req.files.profileImage.path;
    var profileImageExt  = req.files.profileImage.extension;
    var profileImageSize = req.files.profileImage.size;
  } else {
    var profileImageName = 'noimage.png';
  }

  //Form Validation
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  //Error handling
  var errors = req.validationErrors();
  if(errors){
    res.render('register',{
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileImage: profileImageName
    });
    //Create the new user here
    User.createUser(newUser,function(err,user){
      if (err) throw err;
      console.log(user);
    });
    //Success
    req.flash('success','Registration Successfull...Login Now');
    res.location('/');
    res.redirect('/');
  }
});
//Passport serialize user
passport.serializeUser(function(user,done){
  done(null,user.id);
});

//Passport deserialize user
passport.deserializeUser(function(id,done){
  User.getUserById(id,function(err,user){
    done(err,user);
  });
});

//Passport authentication function
passport.use(new LocalStrategy(
  function(username,password,done){
    User.getUserByUsername(username,function(err,user){
      if (err) throw err;
      if (!user){
        console.log('Unknown User');
        return done(null, false, {message:'Unknown User'});
      }
      User.comparePassword(password,user.password,function(err,isMatch){
        if (err) throw err;
        if (isMatch){
          return done(null, user);
        } else {
          console.log('Invalid Password');
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }
));


//Login router
router.post('/login',passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Invalid Username or Password'}),function(req,res,next){
  console.log('Authentication Successfull');
  req.flash('success','You are now logged in');
  res.redirect('/');
})

module.exports = router;

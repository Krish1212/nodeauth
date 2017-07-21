var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', checkLogin, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

function checkLogin(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  req.flash('error','Please login using valid credentials');
  res.redirect('/users/login');
}

module.exports = router;

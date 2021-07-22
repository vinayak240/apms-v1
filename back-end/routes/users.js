const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');



router.get('/', (req, res) => {
  User.find((err, list) => {
    if(err){
      res.json({success:false, msg: 'Cannot fetch student list ...'});
    } else {
      res.json({success:true, list: list});
    }
  });
});

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    sem: req.body.sem,
    dept: req.body.dept
  });

  User.getUserByUsername(req.body.username, (err, user) => {
    if(err) throw err;
    if(user) {
      res.json({success: false, msg: 'USN already exists, Try logging in..'});
    }else{
        User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      const token = jwt.sign({data: user}, config.secret, {
        expiresIn: 604800 // 1 week
      });

      res.json({
        success: true,
        token: `Bearer ${token}`,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          dept:user.dept,
          sem:user.sem            
        }
      });
    }
  });
    }
  });


});

// Authenticate
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            dept:user.dept,
            sem:user.sem            
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  User.findById(req.user._id).populate('activities').exec((err, user) => {
    if(err){
      res.json({success: false, msg: "Cannot find User"});
    } else {
      res.json({success: true, user: user});
    }
  });
});


router.get('/:id', (req, res) => {
  User.findOne({_id: req.params.id}, (err, user) => {
      if(err){
        res.json({success: false, msg: "Cannot find User"});
      } else {
        res.json({success: true, user: user});
      }
  });
});

module.exports = router;

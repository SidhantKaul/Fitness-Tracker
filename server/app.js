require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app =express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
let image = "";
let user_id = "";
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect('mongodb://localhost:27017/FitnessUsers', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
const {Schema} = mongoose;
const exerciseSchema = new Schema({
  time: String,
  rep: String,
  name: String,
  cardio:Number,
  lift:Number
});
const userSchema = new Schema({
  date: String,
  name: String,
  email: String,
  img: String,
  googleId:String,
  exercises:[exerciseSchema]
});
userSchema.plugin(findOrCreate);
const User = mongoose.model("User",userSchema);
const Exercise = mongoose.model("Exercise",exerciseSchema);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:9000/auth/google/fitness",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile+"goggle");

    User.findOrCreate({ googleId: profile.id,name:profile.displayName,img:profile._json.picture }, function (err, user) {
      return cb(err, user);
    });
  }
));
app.post("/selectType",async function(req,res){
  console.log(req.user+"chuchuchuchuchuchuhc");
  if(req.isAuthenticated()) {
    console.log(req.body);

    const date = req.body.date;
    let test = true;
    let num1 = 1, num2 = 0;
    if(req.body.type=="cardio") {
      num1 = 0;
      num2  = 1;
    }
    // if()
    const exercise = new Exercise({
      time: req.body.time,
      rep: req.body.rep,
      name: req.body.exercise,
      cardio:num1,
      lift:num2
    });
    let arr = [exercise];
    await User.findOne({date: date,googleId:req.user.googleId},function(err,result) {
      if(err)
      console.log(err);
      else {
        console.log("????");
        if(!result) {
          test = false;
          const user = new User({
            date: date,
            exercises: exercise,
            googleId:req.user.googleId
          });
          user.save(function(err){
            if(!err) {
              console.log("Successful");
              console.log(arr+"!!!!!!!!!!!..................");
              res.send(arr);
            }
          });
        }
        else {
          result.exercises.push(exercise);
          result.save(err => {
            if(!err) {
                console.log("Sucess 2");
                arr = result.exercises;
                res.send(arr);
            }
          });
        }
      }
    });
  }
  else {
    console.log("13ebd3b"+image);
    res.send("*")
  }
});
// Catch get req for exercises of dates
app.get("/getExercises/:date", function(req,res){
  if(req.isAuthenticated()) {
    console.log(req.user+"yupppyyuppyy");
    const date = ""+req.params.date;
    console.log(date+"herehere"+req.user);
    let arr = [];
    User.findOne({date:date,googleId:req.user.googleId},function(err,result){
      if(err)
      console.log(err);
      else {
        if(result) {
          console.log(result+",.,.,.,.,.,.,.,.,.,.");
          arr = result.exercises;
          res.send(arr);
        }
        else
        res.send(null);
      }
    });
  }
  else
  res.send([]);
});
// to filter users exercies
app.get("/gettable/:type",function(req,res){
  const id = req.params.type;
  let lift = 0;
  if(id==="cardio")
  lift = 1;
  // add user to quer when oauth is added
  User.find({googleId:req.user.googleId},function(err,result){
    if(err)
    console.log(err);
    else {
      // res.send(""+result[0].exercises[0].lift);
      let arr1 = [];
      let i = 0;
      result.forEach(function(days,index,array){
        days.exercises.forEach(function(exercise){
          if(exercise.lift===lift)
          arr1.push(exercise.name);
        });
        ++i;
        if(i===array.length) {
            arr1 = [...new Set(arr1)];
            res.send(arr1);
        }
      });
    }
  });
});
// del ex
app.get("/delex/:details", function(req,res){
  const arr = req.params.details.split("@");
  const date = arr[0];
  const id = arr[1];
  console.log(date+"#####"+user_id);
  User.findOneAndUpdate({date:date,googleId:req.user.googleId},{$pull:{exercises:{_id:id}}},function(err,result){
    if(err)
    console.log(err);
    else {
      res.send(result)
    }
  });
});
app.get("/",function(req,res) {

});
app.get("/logout",function(req,res){
  console.log("inside LOgin"+req.user);
  req.logout();
  res.send("done");
});
app.get("/img",function(req,res){
  console.log("???????");
  if(req.isAuthenticated())
  res.send(""+req.user.img)
  else
  res.send();
});
app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);
app.get("/auth/google/fitness",
  passport.authenticate('google'),
  async function(req, res) {
    // Successful authentication, redirect to secrets.
    console.log(req.user);
     image = await req.user.img;
     user_id = await req.user.googleId;
    console.log(user_id+"<<<>>>>>>"+req.user.googleId);
    res.redirect("http://localhost:3000");
  });
app.listen(9000,function() {
  console.log("Server has Started");
});

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const {strategy,serializer,deserializer }= require('./passport');
const path = require('path');
const dbController = require('./controller');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const {SECRET} = process.env
const {register,login,sequelize,getModules,getLessons,getQuiz} = dbController;
const publicPath = path.join(__dirname, "..", "build");
const PORT = process.env.PORT || 3000;

const mojoMath = new SequelizeStore({
        db: sequelize
    })


const app = express();

app.use(express.json());
app.use(express.static(publicPath));


//middlewares
app.use(cors({
    origin: ['http://localhost:4000','http://localhost:3000'],
    credentials:true,
}));

app.use(session({
    secret: SECRET,
    store: mojoMath,
    resave: false,
    proxy: false,
    saveUninitialized: true,
    cookie :{
        maxAge: 900000
    }
}))
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(serializer);
passport.deserializeUser(deserializer);

app.post('/register', register)

app.post('/login',passport.authenticate('local',{ failureRedirect: '/login',failureMessage:true,
session: true }), login)


app.use((req,res,next) =>{
    if (req.isAuthenticated()) {
        next();
    } else res.sendStatus(401);
})



app.get('/auth', function(req,res){
    
    if(req.isAuthenticated()){
        res.status(200).send(req.user);
    }else res.status(200).send('redirect')
})
app.get('/logout',(req,res)=>{
    req.logOut();
    res.sendStatus(200);
})
app.get('/modules',getModules);
app.post('/retrievelessons',getLessons);
app.get('/retrieve-quiz/:lessonId',getQuiz)


mojoMath.sync();

app.get("/*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => console.log('Port',PORT));
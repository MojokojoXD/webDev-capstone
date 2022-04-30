// @ts-nocheck
const LocalStrategy=require('passport-local')
const {sequelize} = require('./controller');
const bcrypt = require('bcrypt');



const verify = (username,password,done) => {
    sequelize.query(`
        
        SELECT username,passcode,user_id
        FROM credentials
        WHERE username = lower('${username}');


    `).then(dbres=>{
        //if no user name
        if(dbres[0].length === 0)return done(null, false,{message: 'Incorrect username or password.'});
        
        //password check
        if(bcrypt.compareSync(password,dbres[0][0].passcode)){
            return done(null,dbres[0][0].user_id)
        }else{
            return done(null,false,{message : 'Incorrect username or password.'})
            
        }

    }).catch(err => {
        console.log(err)
        if(err)return done(err)
    })
}



const strategy = new LocalStrategy(verify)



module.exports= {
    strategy,
    serializer: (user,done) => {
        done(null,user);
    },
    deserializer: (user,done) => {
        sequelize.query(`
            SELECT * 
            FROM users
            WHERE user_id = '${user}'
        `).then(dbres=>{
            done(null,dbres[0][0])
        }).catch(err => done(err))
    }
}
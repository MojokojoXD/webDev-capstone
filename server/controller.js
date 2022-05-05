// @ts-nocheck
require("dotenv").config();
const Sequelize = require("sequelize");

//Destructure environment variable
const { CONNECTION_STRING } = process.env;

//Sequelize config
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

//Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  register: (req, res) => {
    const { body } = req;
    const {
      password,
      fname,
      lname,
      city,
      state,
      email,
      username,
      fractions,
      decimals,
      percentages,
    } = body;
    sequelize
      .query(
        `
            SELECT EXISTS(
            SELECT * 
            FROM credentials 
            WHERE username = lower('${username}'));
        `
      )
      .then((dbres) => {
        if (dbres[0][0].exists) {
          res.status(200).send("Username taken");
        } else {
          bcrypt.hash(password, saltRounds, function (err, hash) {
            sequelize
              .query(
                `INSERT INTO users(fname,lname,email,city,state)
                VALUES(lower('${fname}'),lower('${lname}'),'${email}','${city}','${state}');

                INSERT INTO credentials(user_id,username,passcode)
                SELECT user_id, lower('${username}'),'${hash}'
                FROM users
                WHERE fname = lower('${fname}')
                AND email = '${email}';

                INSERT INTO
                lessons(user_id,fractions,decimals,percentages)
                SELECT user_id,${fractions},${decimals},${percentages}
                FROM users
                WHERE lname = lower('${lname}')
                AND fname = lower('${fname}');
            `
              )
              .then((dbres) => {
                res.status(200).send("done");
              })
              .catch((err) => {
                res.status(500).send(err);
              });
          });
        }
      })
      .catch((err) => console.log(err));
  },
  login: (req, res) => {
    res.status(200).send("redirect");
  },

  sequelize,

  getModules: (req, res) => {

    const { user_id } = req.query;

    sequelize
      .query(
        `
            SELECT *
            FROM lessons
            WHERE user_id = ${user_id};
        `
      )
      .then((dbres) => {
        res.status(200).send(dbres[0]);
      })
      .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
  },

  getLessons: (req, res) => {
    const { lesson } = req.body;

    const json = JSON.stringify({ ...lesson });

    sequelize.query(`
        SELECT *
        FROM lesson_content
        WHERE lesson_name = '${json}'::json->> '0'
        OR lesson_name = '${json}'::json->> '1'
        OR lesson_name = '${json}'::json->> '2';
    `).then(dbres=>{
        res.status(200).send(dbres[0])
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
  },

  getQuiz: (req,res) => {
    const {lessonId} = req.params;
    sequelize.query(`
        SELECT *
        FROM assessments
        WHERE lesson_id = '${parseInt(lessonId)}';
    `).then(dbres=> {

      if(dbres[0][0].length === 0){
        res.sendStatus(404);
      }else res.status(200).send(dbres[0]);
    }).catch(err => {
      console.log(err);
      res.sendStatus(404);
    })
  }
};

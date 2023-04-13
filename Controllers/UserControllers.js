const db = require("../System/db");
const connection = require('../System/db')
const bcrypt = require("bcrypt");
const session = require("../config/session");

exports.connect = async (req, res) => {
  if (!req.body.email) {
    return;
  }

  try {
    
    const SQL = `SELECT * FROM user WHERE email = "${req.body.email}"`;
    const result = await db.awaitQuery(SQL);
   
    if (!result || result.length === 0) {
      res.redirect("/user/login");
      return;
    }

    const [user] = result;

    if (!user.password) {
      res.redirect("/user/login");
      return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      res.redirect("/user/login");
      return;
    }

    req.session.regenerate((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur de serveur");
      }

      req.session.userID = user.id;
      req.session.username = user.username;
      req.session.email = user.email;
      req.session.role = user.role;
      req.session.isLoged = true;

      res.redirect("/profil");
    });
  } catch (error) {
    console.log("NEW ERROR USERCONTROLLER: " + error + error.stack);
    res.redirect("/user/login");
  }
};




exports.create = (req, res) => {
  bcrypt.hash(req.body.password, session.saltRounds, (err, hash) => {
    if (err) {
    }
    let data = {
      email: req.body.email,
      username: req.body.username,
      password: hash,
    };
    console.log(data);
    let SQL = `SELECT * FROM user WHERE email="${data.email}"`;
    db.query(SQL, (err, result) => {
      let formi = JSON.stringify(result);
      let formed = JSON.parse(formi);
      if (data.email === formed.email) {
      } else {
        db.query("INSERT INTO user SET ? ", data, (error, resultat) => {
          if (error) {
            console.log("NEW DATABASE ERROR : " + error);
          }
          if (resultat) {
            res.redirect("/user/login");
          }
        });
      }
    });
  });
};

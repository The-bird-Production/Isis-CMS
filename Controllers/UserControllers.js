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




exports.create = async (req, res) => {
  try {
  const hash = await bcrypt.hash(req.body.password, session.saltRounds);
  const data = {
  email: req.body.email,
  username: req.body.username,
  password: hash,
  };
  const SQL = `SELECT email FROM user WHERE email="${data.email}";`
  const result = await db.awaitQuery(SQL);
  const formed = JSON.parse(JSON.stringify(result));
  if (formed.length > 0) {
  // Email already exists
  return;
  }
  await db.awaitQuery("INSERT INTO user SET ? ", data);
  res.redirect("/user/login");
  } catch (error) {
  console.log("NEW DATABASE ERROR : " + error);
  }
  };


  exports.password_modify =  async (req,res) => {
    if (req.session.isLoged === true) {

      let apassword = req.body.apassword
      let npassword = req.body.npassword

      try {
        const [result] = await db.awaitQuery('SELECT * FROM user WHERE username = ' + `"${req.session.username}"`)
        
        const isMatch = await bcrypt.compare(apassword, result.password)
        if (!isMatch) {

          return;
        }

       const password = await bcrypt.hash(npassword, 10)

       let SQL = `UPDATE user SET password = "${password}" WHERE username = "${req.session.username}" `
        await db.awaitQuery(SQL); 
        res.redirect('/user/profil')

      } catch (error) {
        console.log('NEW PASSWORD MODIFY ERROR' + error + error.stack)
      }
    }
    



  }

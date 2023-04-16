const db = require("../System/db");
const connection = require('../System/db')
const bcrypt = require("bcrypt");
const session = require("../config/session");
const fs = require('fs')
const fspromise = require('fs').promises

const env = require('../var')
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
    const ip = req.socket.remoteAddress;
    const update_sql = `UPDATE user SET last_ip = "${ip}" WHERE id = "${user.id}"`; 
    await db.awaitQuery(update_sql)
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
      req.session.ppfile = user.ppfile

      res.redirect("/user/profil");
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

  exports.pp_modify = async(req,res) => {
    try {
      if (!req.file.filename) {
        return;
      }
      const [result] = await db.awaitQuery('SELECT * FROM user WHERE username = ' + `"${req.session.username}"`)
      if (result.ppfile === '/asset/nopp.png') {
        let SQL = `UPDATE user SET ppfile = "/public/upload/image/pp/${req.file.filename}.png" WHERE username = "${req.session.username}"`
          await fspromise.rename(env.dirname +`/public/upload/image/pp/${req.file.filename}`,env.dirname +`/public/upload/image/pp/${req.file.filename}.png`)
          await db.awaitQuery(SQL)
          req.session.ppfile = `/public/upload/image/pp/${req.file.filename}.png`
          res.redirect('/user/profil')
         

      } else {
        const fileExists = async path => !!(await fspromise.stat(path).catch(e => false));
        const isExist = await fileExists( env.dirname + result.ppfile)
        if (!isExist) {
          let SQL = `UPDATE user SET ppfile = "/public/upload/image/pp/${req.file.filename}.png" WHERE username = "${req.session.username}"`
          await fspromise.rename(env.dirname +`/public/upload/image/pp/${req.file.filename}`,env.dirname +`/public/upload/image/pp/${req.file.filename}.png`)
          await db.awaitQuery(SQL)
          req.session.ppfile = `/public/upload/image/pp/${req.file.filename}.png`
          res.redirect('/user/profil')
          
        }
        await fspromise.unlink(env.dirname + `${result.ppfile}`)
        let SQL = `UPDATE user SET ppfile = "/public/upload/image/pp/${req.file.filename}.png" WHERE username = "${req.session.username}"`
       
          await fspromise.rename(env.dirname +`/public/upload/image/pp/${req.file.filename}`,env.dirname +`/public/upload/image/pp/${req.file.filename}.png`)
          await db.awaitQuery(SQL)
          req.session.ppfile = `/public/upload/image/pp/${req.file.filename}.png`
          res.redirect('/user/profil')
          

      }
      console.log(req.session)
      

    } catch (error) {
      console.error('New error at modify PP ' +error + error.stack)
      res.redirect('/user/profil')
    }
  }


  exports.pseudo_modify = async (req,res) => {
    try {
      if (req.session.isLoged !== true) {
        return
      }

      let npseudo = req.body.username 

      let SQL = `UPDATE user SET username = "${npseudo}" WHERE username = "${req.session.username}"`
      await db.awaitQuery(SQL)
      req.session.username = npseudo
      res.redirect('/user/profil')


    } catch (error) {
      console.log('New error '+ error + error.stack)
      res.redirect('/user/profil')
    }

  }


const config = require("../config.json");
const env = require("../var");
const db = require('../System/db');
const themes = require(`../Themes/${config.theme}/theme.js`);


exports.sucess = (req, res) => {
  res.render(env.dirname + "/app/sucess/sucess", {
    msg: req.query.msg,
    redirect: req.query.redirect,
    theme_header: themes.header,
    theme_asset: themes.asset_path,
  });
};


exports.redirect = (req, res) => {
  const url = req.params.url;
  const formed_url = url;
  if (req.params.url === "undefined") {
    res.redirect("/");
  } else {
    db.query(
      "SELECT * FROM redirect WHERE url =" + `"${formed_url}"`,
      (err, result) => {
        if (err) {
          res.status(404).render(env.dirname + "/app/error/404", {
            theme_header: themes.header,
          });
        }
        if (result) {
          let formi = JSON.stringify(result);
          let formed = JSON.parse(formi);

          res.redirect(formed[0].redirect);
        }
      }
    );
  }
};

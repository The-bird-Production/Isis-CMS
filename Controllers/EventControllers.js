const env = require("../var");
const config = require("../config.json");

const themes = require(`../Themes/${config.theme}/theme.js`);

exports.success = (req, res) => {
  const msg = req.query.msg;
  const title = req.query.title 


  //Check if the theme file exist

  if (typeof themes.sucess !== "undefined") {
    res.render(themes.sucess, {
      msg: msg,
      title: title,
    });

  } else {
    
    res.render(env.dirname + "/App/Success/success", {
      msg: msg,
      title: title,
    });
  }
};

exports.error = (req, res) => {
  const msg = req.query.msg;
  const title = req.query.title;

  //Check if the theme file exist

  if (typeof themes.error_path !== "undefined") {
    res.render(themes.error_path, {
      msg: msg,
      title: title,
      theme_header : themes.header
    });
  } else {
    res.render(env.dirname + "/App/error/error", {
      msg: msg,
      title: title,
    });
  }
};

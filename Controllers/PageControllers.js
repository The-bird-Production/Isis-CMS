const db = require("../System/db");
const config = require("../config.json");
const env = require("../var");

const themes = require(`../Themes/${config.theme}/theme.js`);

exports.index = async (req, res) => {
  let lang = req.langage;

  const [result] = await db.awaitQuery(
    'SELECT * FROM page WHERE url = "/index" AND lang = "' +
      config.locales +
      '"'
  );
  if (!result) {
    //Verifiy if the theme file exist
    if (typeof themes.index !== "undefined") {
      res.render(themes.index, {
        theme_header: themes.header,
      });
    } else {
      res.render(env.dirname + "/App/error/404", {
        theme_header: themes.header,
      });
    }
  } else {
    //Check if index page exist in database
    try {
      const [result] = await db.awaitQuery(
        'SELECT * FROM page WHERE url = "/index" AND lang = "' + lang + '"'
      );

      if (result) {
        res.render(themes.view_path + ".ejs", {
          page: formed,
          theme_header: themes.header,
        });
      } else {
        res.status(404).render(env.dirname + "/App/error/404", {
          theme_header: themes.header,
        });
      }
    } catch (error) {
      res
        .render(503)
        .send("Une erreur est survenue veuillez contater l'administrateur");
    }
  }
};

exports.page = (req, res) => {
  let page = req.params.page;
  let lang = req.langage;

  db.query(
    "SELECT * FROM page WHERE url = " + `"/${page}" AND lang = "${lang}"`,
    (err, result) => {
      if (err) {
        res.status(503).send("Erreur du serveur");
      }
      if (result) {
        let formi = JSON.stringify(result);
        let formed = JSON.parse(formi);
        if (
          typeof formed !== "undefined" &&
          formed.length > 0 &&
          typeof formed[0].title !== "undefined"
        ) {
          res.render(themes.view_path + ".ejs", {
            page: formed,
            theme_header: themes.header,
          });
        } else {
          res.status(404).render(themes.error_path, {
            theme_header: themes.header,
          });
        }
      } else {
        res.status(404).render(themes.error_path, {
          theme_header: themes.header,
        });
      }
    }
  );
};

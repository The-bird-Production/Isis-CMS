const db = require("../System/db");
const config = require("../config.json");
const env = require("../var");
const fs = require("fs");
const themes = require(`../Themes/${config.theme}/theme.js`);

exports.index = async (req, res) => {
  const lang = req.langage;
  const url = '/index';

  try {
    const [result] = await db.awaitQuery(
      'SELECT * FROM page WHERE url = ? AND lang = ?',
      [url, lang]
    );

    if (!result) {
      const themeFile = themes.index ? themes.index : env.dirname + '/App/error/404';

      res.render(themeFile, {
        theme_header: themes.header,
      });
    } else {
      const viewPath = result ? themes.view_path + '.ejs' : env.dirname + '/App/error/404';

      res.render(viewPath, {
        page: result,
        theme_header: themes.header,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(503).send("Une erreur est survenue veuillez contacter l'administrateur");
  }
};

exports.page = async (req, res) => {
  const page = req.params.page;
  const lang = req.langage;

  console.log(`is on the way ${page} ${lang}`);

  try {
    const [result] = await db.awaitQuery(
      'SELECT * FROM page WHERE url = ? AND lang = ?',
      [`/${page}`, lang]
    );

    if (result) {
      if (result.is_static === 'false') {
        res.render(themes.view_path + '.ejs', {
          page: result,
          theme_header: themes.header,
        });
      } else {
        const file = env.dirname + '/public/pages/' + result.url + '.html';
        res.sendFile(file);
      }
    } else {
      res.redirect('/error/?title=404 : La page n\'existe pas&msg=Nous sommes désolés, la page n\'existe pas');
    }
  } catch (error) {
    console.error('NEW ERROR IN PAGE CONTROLLER:', error);
    res.redirect('/error/?title=503 : Service non disponible&msg=Une erreur est survenue, veuillez réessayer plus tard');
  }
};


exports.robotDotTxt = (req, res) => {
  if (fs.existsSync(env.dirname + "/robots.txt")) {
    res.sendFile(env.dirname + "/robots.txt");
  } else {
    res.send("Error No robot.txt").status(404);
  }
};
exports.sitemapDotXml = (req, res) => {
  if (fs.existsSync(env.dirname + "/sitemap.xml")) {
    res.sendFile(env.dirname + "/sitemap.xml");
  } else {
    res.send("Error No Sitemap.xml").status(404);
  }
};

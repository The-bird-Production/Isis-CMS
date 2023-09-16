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

exports.page = async (req, res) => {
  let page = req.params.page;
  let lang = req.langage;
  
  console.log('is on the way ' + page + ' ' + lang  )


  try {
    
    const [result] = await db.awaitQuery(
      "SELECT * FROM page WHERE url = " + `"/${page}" AND lang = "${lang}"`
    );
    if (result) {
      
          if (result.is_static === "false" ) {
            console.log([result])

            res.render(themes.view_path + ".ejs", {
              page: result,
              theme_header: themes.header,
            });

          } else {

            var file = env.dirname+"/public/pages/"+result.url+".html";
            
            res.sendFile(file); 
          }
        

    }
  } catch (error) {
    console.log('NEW ERROR IN PAGE CONTROLLER ' + error + error.stack )
    res.redirect('/error/?title=404 : La page n\'existe pas&msg=Nous sommes désolés la page n\'existe pas  ')
  }

};

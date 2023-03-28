const express = require("express");
const router = express.Router();
const config = require("../config.json");
const env = require("../var");
const PageControllers = require("../Controllers/PageControllers");
const fs = require("fs");

const MainControllers = require("../Controllers/MainControllers");

const themes = require(`../Themes/${config.theme}/theme.js`);

router.get("/:page([a-z]+)", PageControllers.page);
router.use((req, res, next) => {
  if (req.url.startsWith("/asset")) {
    const filePath = env.dirname + `/Themes/${config.theme}/` + req.url;
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).render(env.dirname + "/app/error/404", {
        theme_header: themes.header,
      });
    }
  } else {
    next();
  }
});
router.get('/test', (req,res) => {
  res.status(200)
})
router.get('/r/:url', MainControllers.redirect)
router.get("/sucess", MainControllers.sucess);


router.get("/", PageControllers.index);



module.exports = router;

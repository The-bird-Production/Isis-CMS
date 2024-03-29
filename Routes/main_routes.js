const express = require("express");
const router = express.Router();
const config = require("../config.json");
const env = require("../var");
const PageControllers = require("../Controllers/PageControllers");
const fs = require("fs");

const MainControllers = require("../Controllers/MainControllers");
const EventControllers = require("../Controllers/EventControllers");

const themes = require(`../Themes/${config.theme}/theme.js`);

router.get("/error", EventControllers.error);
router.get("/success", EventControllers.success);

router.get("/:page([a-z]+)", PageControllers.page);

//Asset
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

//Testing
router.get("/test", (req, res) => {
  res.status(200);
});

router.get("/robot.txt", PageControllers.robotDotTxt);
router.get("/sitemap.xml", PageControllers.sitemapDotXml);

//Redirect
router.get("/r/:url", MainControllers.redirect);

//Main Page
router.get("/", PageControllers.index);

module.exports = router;

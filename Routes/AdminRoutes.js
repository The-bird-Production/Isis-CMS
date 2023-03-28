const express = require("express");
const router = express.Router();
const AdminControllers = require("../Controllers/AdminControllers");
const securite = require("../System/RoleCheking.js");
const fs = require("fs");
var colors = require('colors/safe');

const multer = require("multer");
const env = require("../var");
const config = require("../config.json");

const upload = multer({ dest: env.dirname + "/public/upload/" });

router.get("/", securite, AdminControllers.admin);

router.get("/user", securite, AdminControllers.user);

//Gestion des pages 
router.get('/my-page/', securite, AdminControllers.user_page)
router.get('/my-page/new', securite, AdminControllers.new_page)
router.post('/my-page/new', securite, AdminControllers.new_page_post)
router.get('/my-page/modify/:url', securite, AdminControllers.view_modify_user_page)
router.post('/my-page/modify/:url', securite, AdminControllers.modify_user_page)
router.get('/my-page/delete/:url', securite, AdminControllers.delete_user_page)


//Gestion images
router.get("/pics", securite, AdminControllers.pics);

router.post(
  "/pics.send",
  securite,
  upload.single("pics"),
  AdminControllers.pics_send
);
router.get("/pics.delete", securite, AdminControllers.pics_delete);

//Gestion des documents

router.get("/docs", securite, AdminControllers.docs);

router.post(
  "/file.send",
  securite,
  upload.single("file"),
  AdminControllers.docs_send
);
router.get("/file.delete", securite, AdminControllers.docs_delete);

//Gestion redirection

router.get("/redirect", securite, AdminControllers.redirect);
router.post("/redirect/send", securite, AdminControllers.redirect_send);
router.get("/redirect/remove", securite, AdminControllers.redirect_remove);

//Upload TinyMCE

router.post("/upload", securite, upload.single("file"), (req, res) => {
  // Traitez l'image et renvoyez la réponse à TinyMCE
  const imageUrl = "/public/upload/" + req.file.filename;
  res.json({ location: imageUrl });
});

//Updater 
router.get('/update', securite, AdminControllers.update); 
router.get('/update/start', securite, AdminControllers.update_start)
//Plugin

const pluginsPath = "./Plugins";
fs.readdirSync(pluginsPath).forEach((file) => {
  const plugin = require(`${env.dirname}/Plugins/${file}/Admin/`);

  router.use(plugin.route, plugin.router);
  console.log( colors.green(" [ok] Admin of " + plugin.info.name + " loaded"));
});

module.exports = router;

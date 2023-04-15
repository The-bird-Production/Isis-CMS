const env = require("../var");
const theme = require("../themes.json");
const config = require("../config.json");
const db = require("../System/db");
const get = require("../System/getdata");
const system_data = require("../System/ControlData");
const plugins = get.plugins;
const path = require("path");
const package = require("../package.json");
const axios = require('axios')

exports.admin = (req, res) => {
  get.get_number_of_docs((docs) => {
    get.get_number_of_user((user) => {
      res.render(env.dirname + "/Admin/index", {
        title: "Isis CMS",
        req: req,
        user: user,
        docs: docs,
        plugins: plugins,
      });
    });
  });
};

exports.pics = (req, res) => {
  get.get_admin_img((img) => {
    res.render(env.dirname + "/Admin/pics", {
      img_data: img,
      url: config.website_url,
      plugins: plugins,
    });
  });
};

exports.pics_send = (req, res) => {
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  let data = {
    path: "/public/upload/" + req.body.pic_name + ".png",
    title: req.body.title,
    alt: req.body.alt,
    date: year + "-" + month + "-" + date,
  };

  db.query("INSERT INTO img SET ? ", data, (err, result) => {
    if (err) {
      res.send("Une erreur est survenue");
      console.log(err);
    }
    if (result) {
      res.redirect("/admin/pics");
    }
  });
  let name = req.body.pic_name;
  console.log(req.file);
  let file = req.file.filename;

  system_data.Rename_file(file, name + ".png");
};

exports.pics_delete = (req, res) => {
  db.query(
    `DELETE FROM img WHERE path = "${req.query.path}"`,
    (err, result) => {
      if (err) {
        res.send("Une erreur est survenue");
        console.log(err);
      }
      if (result) {
        system_data.Delete_file("./" + req.query.path);
        res.redirect("/admin/pics");
      }
    }
  );
};

exports.docs = (req, res) => {
  get.get_all_docs((docs) => {
    res.render(env.dirname + "/Admin/docs", {
      docs: docs,
      url: config.website_url,
      plugins: plugins,
    });
  });
};
exports.docs_send = (req, res) => {
  const extension = path.extname(req.file.originalname);

  let data = {
    file: req.body.file_name,
    url: "/public/upload/" + req.body.file_name + extension,
  };
  db.query("INSERT INTO file SET ? ", data, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Une erreur c'est produite");
    }
    if (result) {
      res.redirect("/admin/docs");
      system_data.Rename_file(
        req.file.filename,
        req.body.file_name + extension
      );
    }
  });
};

exports.docs_delete = (req, res) => {
  system_data.Delete_file(env.dirname + "/" + req.query.path);
  db.query(
    "DELETE FROM file WHERE url=" + `"${req.query.path}"`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Une erreur c'est produite ");
      }
      if (result) {
        res.redirect("/admin/docs");
      }
    }
  );
};

exports.user = (req, res) => {
  get.get_admin_user((user) => {
    res.render(env.dirname + "/Admin/user", {
      user: user,
      plugins: plugins,
    });
  });
};

exports.page = (req, res) => {
  get.get_all_page((page) => {
    res.render(env.dirname + "/Admin/page", {
      page: page,
      plugins: plugins,
    });
  });
};

//Gestion des rédirections
exports.redirect = (req, res) => {
  get.get_all_redirect((redirect) => {
    res.render(env.dirname + "/Admin/redirect", {
      redirect: redirect,
      plugins: plugins,
    });
  });
};
exports.redirect_send = (req, res) => {
  let data = {
    url: req.body.url,
    redirect: req.body.redirect,
  };

  db.query("INSERT INTO redirect SET ? ", data, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Une erreur c'est produite");
    }
    if (result) {
      res.redirect("/admin/redirect");
    }
  });
};
exports.redirect_remove = (req, res) => {
  db.query(
    "DELETE FROM redirect WHERE url=" + `"${req.query.url}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        res.redirect("/admin/redirect");
      }
    }
  );
};

//Gestion des pages
exports.user_page = (req, res) => {
  get.get_user_page((page) => {
    res.render(env.dirname + "/Admin/page", {
      page: page,
      plugins: plugins,
    });
  });
};
exports.new_page = (req, res) => {
  res.render(env.dirname + "/Admin/newpage", {
    plugins: plugins,
  });
};

exports.new_page_post = (req, res) => {
  let data = {
    url: req.body.url,
    title: req.body.title,
    body: req.body.body,
    type: "user_page",
  };

  db.query("INSERT INTO page SET ? ", data, (err, result) => {
    if (err) {
      res.send("Une erreur est survenue");
      console.log("NEW ERROR AT INSERT PAGE : " + err);
    }
    if (result) {
      res.redirect(req.body.url);
    }
  });
};

exports.view_modify_user_page = (req, res) => {
  db.query(
    "SELECT * FROM page WHERE url = " + `"/${req.params.url}"`,
    (err, result) => {
      if (err) {
        console.log("NEW ERROR AT VIEW MODIFIED PAGE");
        res.send("Une erreur est survenue");
      }
      if (result) {
        let formi = JSON.stringify(result);
        let formed = JSON.parse(formi);
        let content = formed[0];
        res.render(env.dirname + "/Admin/modify_page", {
          content: content,
          plugins: plugins,
        });
      }
    }
  );
};

exports.modify_user_page = (req, res) => {
  let data = {
    title: req.body.title,
    body: req.body.body,
    url: req.body.url,
  };

  db.query(
    "UPDATE page SET ? WHERE url = " + `"/${req.params.url}"`,
    data,
    (err, result) => {
      if (err) {
        console.log("NEW ERROR AT MODIFY PAGE" + err);
        res.send("Une erreur est survenue");
      }
      if (result) {
        res.redirect("/admin/my-page/");
      }
    }
  );
};

exports.delete_user_page = (req, res) => {
  db.query(
    "DELETE FROM page WHERE url =" + `"/${req.params.url}"`,
    (err, result) => {
      if (err) {
        console.log("CAN'T DELETE PAGE " + err);
        res.send("Une erreur est survenue");
      }
      if (result) {
        res.redirect("/admin/my-page/");
      }
    }
  );
};

exports.theme_modify = (req, res) => {};

//Gestion de la mis à jour

exports.update = (req, res) => {
  axios.get('https://update.isis-cms.thebirdproduction.fr/update/version')
  .then(response => {
    const version = response.data.version;
    
    
    res.render(env.dirname + "/Admin/update", {
      current_version: package.version,
      update_version: version,
      plugins: plugins
    });
  })
  .catch(error => {
    console.error(error);
  });
 
      
    
};

exports.update_start = (req,res) => {
  const update = require('../System/update')
  
  update.update()
  .then()
  .catch(res.send('Une erreur c\'est produite lors de la mis à jour '))


}

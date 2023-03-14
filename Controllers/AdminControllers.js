const env = require("../var");
const theme = require("../themes.json");
const config = require('../config.json')
const db = require("../system/db");
const get = require("../system/getdata");
const system_data = require('../system/ControlData');

const path = require("path");

exports.admin = (req, res) => {
  get.get_number_of_docs((docs) => {
    get.get_number_of_user((user) => {
      res.render(env.dirname + "/Admin/index", {
        title: "Isis CMS",
        req: req,
        user: user,
         docs: docs
      });

    })

  })
  
};


exports.pics = (req, res) => {
  get.get_admin_img((img) => {
    res.render(env.dirname + "/Admin/pics", {
      img_data: img,
      url: config.website_url 
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
      url: config.website_url 
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
    });
  });
};

exports.page = (req, res) => {
  get.get_all_page((page) => {
    res.render(env.dirname + "/Admin/page", {
      page: page,
    });
  });
};
exports.redirect = (req, res) => {
  get.get_all_redirect((redirect) => {
    res.render(env.dirname + "/Admin/redirect", {
      redirect: redirect,
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

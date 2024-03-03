const { exec }  = require("child_process");
const env = require("../var");
const config = require("../config.json");
const colors = require("colors/safe");
colors.enable();
const AdmZip = require("adm-zip");

//Database Migration
const knex = require("knex");
const knex_conf = require("../knexfile");
const migrate_knex = knex(knex_conf.production);

const downloadFile = require('../Functions/Download')

//Process manager

const restart = require("../Functions/RestartApp");

async function migrate_db() {
  console.log(colors.green(" Start migrating Database..."));

  try {
    await migrate_knex.migrate.latest({
      directory: "../migrations",
    });
    console.log(colors.green(" Database migrated successfully!"));
  } catch (error) {
    console.error(colors.red("Error during database migration" + error));
  } finally {
    await migrate_knex.destroy();
  }
}

async function updateFiles() {
  try {
    const url =
      "https://update.isis-cms.thebirdproduction.fr/manager/version/download/" +
      config.update_key;
  
    console.log("Downloading File");
  
    await downloadFile(url, env.dirname + "/update/temp.zip", "temp.zip");
  
    const zip = new AdmZip(env.dirname + "/update/temp.zip");
    zip.extractAllTo(env.dirname, true);
  
    console.log("Files updated successfully");
  } catch (error) {
    console.error("Error updating files:", error);
    
    throw error;
  }
}

function restart_app() {
  return new Promise((resolve, reject) => {
    exec("npm install", (error, stdout, stderr) => {
      if (error) {
        console.error("Erreur lors de l'installation des dépendances", error);
        reject(error + "\n" + stderr);
      } else {
        restart()
          .then(() => resolve())
          .catch(reject());
        console.log("Dependencies installed"+ stdout)
      }
    });
  });
}

async function update() {
  try {
    await updateFiles();
    await migrate_db();
    await restart_app();
  } catch (error) {
    console.error("New error during update", error);
  }
}

update();

exports.update = update;

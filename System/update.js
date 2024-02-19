const { exec } = require("child_process");
const env = require("../var");
const config = require("../config.json");
const colors = require("colors/safe");
colors.enable();
const request = require("request");
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");
const knex = require("knex");
const knex_conf = require("../knexfile");
const migrate_knex = knex(knex_conf.production);

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
      "https://update.isis-cms.thebirdproduction.fr/update/latest/" +
      config.update_key;
    const response = await fetch(url);
    if (response.status === 200) {
      const arrayBuffer = await response.arrayBuffer();
      const zip = new AdmZip(arrayBuffer);
      zip.extractAllTo(env.dirname, true);
      return;
    } else {
      throw new Error(
        "Erreur lors du téléchargement du fichier de mise à jour : " +
          response.statusText
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function restart_app() {
  return new Promise((resolve, reject) => {
    exec("npm install", (error, stdout, stderr) => {
      if (error) {
        console.error("Erreur lors de l'installation des dépendances", error);
      }
      reject(error);
    });

    exec("pm2 restart " + config["pm2 name app"], (error, stdout, stderr) => {
      if (error) {
        console.error("Erreur lors du redémarrage de l'application :", error);

        reject(error);
        return;
      }

      console.log("Application redémarrée avec succès");
      resolve();
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

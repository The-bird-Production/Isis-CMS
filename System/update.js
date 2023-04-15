const mysql = require("mysql");
const { exec } = require("child_process");
const env = require("../var");
const config = require("../config.json");
const colors = require("colors/safe");
colors.enable();
const request = require("request");
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require('path')

//Db identifier
const host = config.db_host;
const user = config.db_user;
const password = config.db_password;
const database = config.db_name;
//Connect to db
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});
//Mysql file importer
const Importer = require("mysql-import");
const modele_importer = new Importer({ host, user, password, database });
const backup_importer = new Importer({ host, user, password, database });
const plugin_importer = new Importer({host, user, password, database})

async function backupDatabase() {
  return new Promise((resolve, reject) => {
    const backupQuery =
      "mysqldump -u " +
      config.db_user +
      " -p" +
      config.db_password +
      " " +
      config.db_name +
      " > backup.sql -t";
    exec(backupQuery, (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Erreur lors de la sauvegarde de la base de données: ${error.message}`
        );
        reject(error);
      }

      console.log(`Base de données sauvegardée dans backup.sql`);
      resolve();
    });
  });
}

async function deleteOldDatabase() {
  return new Promise((resolve, reject) => {
    const dropQuery = "DROP DATABASE " + config.db_name;
    connection.query(dropQuery, (error, results, fields) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log(`Ancienne base de données supprimée`);
      resolve();
    });
  });
}

async function createNewDatabase() {
  return new Promise((resolve, reject) => {
    const createQuery = "CREATE DATABASE " + config.db_name + " ;";
    connection.query(createQuery, (error, results, fields) => {
      if (error) {
        console.log(error);
        reject(error);
        console.log(error);
      }
      console.log(`Nouvelle base de données créée`);
      resolve();
    });
  });
}

async function updateModele() {
  return new Promise((resolve, reject) => {
    modele_importer.onProgress((progress) => {
      var percent =
        Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) /
        100;
      console.log(`${percent}% Completed`);
    });
    modele_importer
      .import("./update/modele.sql")
      .then(() => {
        var files_imported = modele_importer.getImported();
        console.log(`${files_imported.length} NEW MODELE file imported.`);
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
// Chemin du dossier contenant les fichiers SQL
const pluginDir = env.dirname + '/Plugins'

// Fonction pour exécuter les requêtes SQL
function runSqlQuery(sql) {
  return new Promise((resolve, reject) => {
    plugin_importer.onProgress((progress) => {
      var percent =
        Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) /
        100;
      console.log(`${percent}% Completed`);
    });
    plugin_importer
      .import(sql)
      .then(() => {
        var files_imported = modele_importer.getImported();
        console.log(`${files_imported.length} NEW MODELE PLUGIN file imported.`);
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

// Fonction pour lire un fichier SQL et l'exécuter
async function importPluginSqlFile(pluginName, fileName) {
  try {
    const filePath = path.join(pluginDir, pluginName, fileName);
    const sql = filePath
    await runSqlQuery(sql);
    console.log(`Fichier ${fileName} importé pour le plugin ${pluginName}`);
  } catch (err) {
    console.error(`Erreur lors de l'importation du fichier ${fileName} pour le plugin ${pluginName}`, err);
  }
}

// Fonction pour parcourir les fichiers SQL d'un plugin
async function importPluginSqlFiles(pluginName) {
  const pluginDirPath = path.join(pluginDir, pluginName);
  const files = fs.readdirSync(pluginDirPath);
  for (const file of files) {
    if (path.extname(file).toLowerCase() === '.sql') {
      await importPluginSqlFile(pluginName, file);
    }
  }
}

// Fonction principale pour parcourir les plugins
async function importPluginsSql() {
  const plugins = fs.readdirSync(pluginDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const plugin of plugins) {
    await importPluginSqlFiles(plugin);
  }

}

async function restoreBackup() {
  return new Promise((resolve, reject) => {
    backup_importer.onProgress((progress) => {
      var percent =
        Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) /
        100;
      console.log(`${percent}% Completed`);
    });
    backup_importer
      .import("./backup.sql")
      .then(() => {
        var files_imported = backup_importer.getImported();
        console.log(`${files_imported.length} backup file imported.`);
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

async function sucess_message() {
  return new Promise((resolve, reject) => {
    let clever = 1;

    console.log(colors.green.underline("[v] Sucess database updated "));
    resolve();
    if (clever === "2") {
      reject();
    }
  });
}

async function update_db() {
  try {
    await backupDatabase();
    await deleteOldDatabase();
    await createNewDatabase();
    await updateModele();
    await importPluginsSql();
    await restoreBackup();
    await sucess_message();
  } catch (error) {
    console.error(`Une erreur s'est produite : ${error}`);
  }
}

function update_files() {
  

  return new Promise((resolve, reject) => {

    const url = 'https://update.isis-cms.thebirdproduction.fr/update/latest/' + config.update_key;
    request.get(url, { encoding: null }, (error, response, body) => {
      if (error) {
        console.error('Erreur lors du téléchargement du fichier de mise à jour :', error);
        reject(error)
        return;
      }
  
      // Extraire le contenu du fichier ZIP dans le répertoire de l'application
      const zip = new AdmZip(body);
      zip.extractAllTo(env.dirname, true);
      resolve()

    })
  

    


  });
}

function  restart_app() {
  return new Promise((resolve, reject) => {

    exec("npm install", (error, stdout, stderr) => {
      if (error) {
        console.error(
          "Erreur lors de l'installation des dépendances",
          error
        );
      }
      reject(error);
    });

    exec("pm2 restart " + config["pm2 name app"], (error, stdout, stderr) => {
      if (error) {
        console.error(
          "Erreur lors du redémarrage de l'application :",
          error
        );

        reject(error);
        return;
      }

      console.log("Application redémarrée avec succès");
      resolve();
    });


  })
}


 async function update()  {
  try {
    await update_files()
    await update_db()
    await restart_app()
  } catch (error) {
    console.error('New error during update', error)
  }

}

exports.update = update



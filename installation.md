# Installation

{% hint style="info" %}
**Bon à savoir :** Pour tout problème sur l'installation de notre projet merci de bien vouloir ouvrir une isssue sur github&#x20;
{% endhint %}

## Cloner le repo Github&#x20;

```
git clone https://github.com/The-bird-Production/Isis-CMS.git
```

## Installer les dépendances&#x20;

Installer via npm les dépendances du CMS

{% tabs %}
{% tab title="Node" %}
```
# Install via NPM
npm install 
```
{% endtab %}
{% endtabs %}

### PM2

L'utilisation de pm2 est recommandé afin de mettre à jour le CMS ou bien de le laisser tourner sur votre machine.&#x20;

{% tabs %}
{% tab title="Node" %}
```
npm install --g pm2
```
{% endtab %}
{% endtabs %}



## Configuration

Configurer les différentes instances pour profiter du bon fonctionnement du CMS



{% tabs %}
{% tab title="config.json" %}
Le fichier config.json se trouve directement à la racine de votre application. Il se présente comme cela :&#x20;

```json
{
    "pm2 name app": "isis",

    
    "app_port": 3000,
    "db_host": "localhost",
    "db_user": "",
    "db_password": "",
    "db_name": "isis",

    
    "theme": "Isis2k23",
    "website_url": "http://localhost:3000" ,
    "locales" : "fr",

    "update_key": "c73a3747-70d6-4461-90f8-fad72ac3ffc3"
}
```



<table><thead><tr><th width="341.66666666666663">Nom</th><th>Valeur</th></tr></thead><tbody><tr><td>pm2 name app </td><td>Entrez le noms de l'application une fois lancé sur pm2 </td></tr><tr><td>app_port</td><td>Le port d'écoute de l'application (3000 par défaut</td></tr><tr><td>db_user</td><td>Nom de l'utilisateur pour la connexion de l'application à la base de données </td></tr><tr><td>db_password</td><td>Mot de passe de l'utilisateur pour la connexion de l'application à la base de données </td></tr><tr><td>db_name</td><td>Le nom de la base de données utilisée par l'application </td></tr><tr><td>theme</td><td>Thème utilisé par votre application ( Front-End) </td></tr><tr><td>website_url</td><td>L'url utilisé par votre site web lors de sa mise en ligne</td></tr><tr><td>locales</td><td>La langue utilisé par votre application </td></tr><tr><td>update_key</td><td>Ne pas y toucher pour l'instant </td></tr></tbody></table>
{% endtab %}

{% tab title="/Config/db.js" %}
Ce fichier demande encore une fois par soucis de sécurité et de redondance une configuration pour la base de donnée.&#x20;

```javascript
exports.db_host= "localhost"
exports.db_username = "root"
exports.db_password = ""
exports.db_name = "isis"

exports.option = option = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'isis'
}
    

```



<table><thead><tr><th width="341.66666666666663">Nom</th><th>Valeur</th></tr></thead><tbody><tr><td>db_user</td><td>Nom de l'utilisateur pour la connexion de l'application à la base de données </td></tr><tr><td>db_password</td><td>Mot de passe de l'utilisateur pour la connexion de l'application à la base de données </td></tr><tr><td>db_name</td><td>Le nom de la base de données utilisée par l'application </td></tr><tr><td>db_host / host</td><td>L'url / ip d'où se trouve votre base de donées</td></tr></tbody></table>
{% endtab %}

{% tab title="/Config/session.js" %}
Les configurations présentent dans se fichier vous permettront de générer la puissance du hachage des mots de passe&#x20;

```javascript
exports.saltRounds = 10;  
```

| Nom        | Valeur                            |
| ---------- | --------------------------------- |
| saltRounds | Puissance du hachage des données  |
{% endtab %}
{% endtabs %}





## Commencer à utiliser le CMS

Isis CMS possède un thème par défaut qui peut être utiliser. Pour l'instant ce thème n'est pas totalement complet et nous vous recommandons d'utiliser votre propre thème afin de profiter de l'ensembles des fonctionnalités d'isis cms.&#x20;

### Compte administrateur

Pour vous connecter à l'interface administrateur veuillez d'abord vous créer un compte en suivant l'url suivante :&#x20;

```
http://yourserver/user/create
```

Une fois cette étape terminé, trouvez dans votre base de donnée l'utilisateur nouvellement créé et changer la ligne role (par defaut null) avec admin.

Ensuite connectez vous en suivant l'url suivante :&#x20;

```
http://yourserver/user/login
```

Puis rendez vous sur l'espace administration :&#x20;

```
http://yourserver/admin
```

&#x20;

## Création de thèmes et plugin :&#x20;


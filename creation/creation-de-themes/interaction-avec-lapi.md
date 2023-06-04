# Interaction avec l'api

Afin de pouvoir interagir avec le site depuis votre thème nous vous fournissons ici tout les éléments disponibles de base sur le cms afin d'interagir avec celui ci.&#x20;

## Interaction avec les utilisateurs&#x20;



### Formulaire de connexion&#x20;

{% swagger method="post" path="/user/create" baseUrl="http://yourserveur" summary="Create a new user " %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" required="true" %}
email of user 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="username" required="true" %}
username of new account
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" required="true" %}
Password of user (no hash) 
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}

{% endswagger-response %}

{% swagger-response status="308: Permanent Redirect" description="Redirect to /user/login" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/user/login" baseUrl="http://yourserveur" summary="Generate a session for an existing user " %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="email" required="true" %}
Email of user 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" required="true" %}
Password of user (No hash) 
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="308: Permanent Redirect" description="Redirect to /user/profil" %}

{% endswagger-response %}
{% endswagger %}

### Modification des infos de l'utilisateur&#x20;

{% swagger method="post" path="/user/modify/pasword " baseUrl="http://yourserveur" summary="Modify the password " %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="apassword" required="true" %}
Ancient password
{% endswagger-parameter %}

{% swagger-parameter in="body" name="npassword" required="true" %}
 New password
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="308: Permanent Redirect" description="Redirect to /user/profil" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/user/modify/pp" baseUrl="http://yourserveur" summary="Modify the profile picture" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="file" type="file" required="true" %}
file type image 
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="308: Permanent Redirect" description="redirect to /user/profil" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/user/modify/username" baseUrl="http://yourserveur" summary="Modify the username" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="username" %}
The new pseudo of user 
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}

{% swagger-response status="308: Permanent Redirect" description="Redirect to /user/login" %}

{% endswagger-response %}
{% endswagger %}

## Autres API

D'autres plugin peuvent avoir leur propre API afin d'interagir avec Isis CMS. Pour toutes informations concernant ceux ci veuillez voir avec leur documentation&#x20;


function checkRole(req, res, next) {
    const role = req.session.role;
    if ( role === "admin") {
      next(); // autoriser l'accès à la page suivante
    } else {
      res.status(403).send("Vous n'êtes pas autorisé à accéder à cette page.");
    }
}

module.exports = checkRole
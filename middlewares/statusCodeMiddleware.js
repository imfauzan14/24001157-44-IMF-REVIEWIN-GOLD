module.exports = (req, res, next) => {
  try {
    res.setStatus = (code, message) => {
      res.status(code);
      if (message) {
        res.render("error", { code, message });
      } else {
        res.end();
      }
    };

    res.ok = (message) => res.setStatus(200, message);
    res.created = (message) => res.setStatus(201, message);
    res.badRequest = (message) => res.setStatus(400, message);
    res.unauthorized = (message) => res.setStatus(401, message);
    res.forbidden = (message) => res.setStatus(403, message);
    res.notFound = (message) => res.setStatus(404, message);
    res.serverError = (message) => res.setStatus(500, message);

    next();
  } catch (err) {
    console.log(err);
  }
};

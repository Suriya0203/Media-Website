module.exports = (req, res, next) => {
    if (req.session.auth) {
      //req.user = { id: payload.id, name: payload.name };
      //console.log(req.user)
      next();
    } else {
      req.session.error = "You have to Login first";
      res.json({
        message:"login first"
      });
    }
  };
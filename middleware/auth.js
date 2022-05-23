// module.exports = (req, res, next) => {
//     if (req.session.auth) {
//       //req.user = { id: payload.id, name: payload.name };
//       //console.log(req.user)
//       next();
//     } else {
//       req.session.error = "You have to Login first";
//       res.json({
//         message:"login first"
//       });
//     }
//   };
const jwt = require("jsonwebtoken");

var jwtSecret = "my_secret_key";

module.exports = function (req, res, next) {

	const token = req.header("auth-token");

	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
    console.log(req.user)
		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};
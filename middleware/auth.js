const jwt = require("jsonwebtoken");

var jwtSecret = "mysecrettoken";

module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		console.log(req.user.id)
		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};
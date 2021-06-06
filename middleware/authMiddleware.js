const jwt = require("jsonwebtoken");
const Users = require("../models/users");

exports.authenticateUser = (req, res, next) => {
    const authHeader = req.cookies
    const token = authHeader.auth;
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodedToken.user
      req.partner = decodedToken.partner
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    if (!decodedToken) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    next()
}
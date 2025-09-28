const jwt = require('jsonwebtoken');

function AuthMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const secret = process.env.JWT_SECRET // ? process.env.JWT_SECRET : 'your_jwt_secret';

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = AuthMiddleware;

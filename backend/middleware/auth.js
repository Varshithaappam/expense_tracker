const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Remove "Bearer " if it's in the string
    const actualToken = token.split(" ")[1] || token;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    
    // Add the user ID from the token to the request object
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
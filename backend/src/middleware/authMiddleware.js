const admin = require('../firebaseAdmin');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('No authorization header');
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new Error('No token found');
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { id: decodedToken.uid, name: decodedToken.name || 'Anonymous' };
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { authMiddleware };

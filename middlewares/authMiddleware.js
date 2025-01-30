const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token missing" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = { authenticateJWT };

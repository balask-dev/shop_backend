import jwt from "jsonwebtoken";

export function verify (req, res, next)  {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).send("Error");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send("Not authenticated");
  }
};

export function verifyAndAuth (req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Not Allowed");
    }
  });
};

export function verifyAndAdmin (req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Not Allowed");
    }
  });
};

 
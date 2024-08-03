import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(400).json({
        message: "token header is not present or token is not provided",
      });
    }
  
    const token = header.split(" ")[1];
    
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "this is not a valid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  };
  
  export default auth;
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const  token  = req.cookies.token;
  if (!token) {
    return res.json({
      success: false,
      message: "You are not authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.body.userId = decoded.id;
    }else{
        return res.json({
            success: false,
            message: "You are not authrized, login again"
        })
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const sessionValidator = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  console.log("isLoggedIn", isLoggedIn);
  if (isLoggedIn) {
    next();
  } else {
    res.sendStatus(403);
  }
};
export const roleValidator = (req, res, next) => {
  const isAdmin = req.session.role;
  console.log("isAdmin", isAdmin);
  if (isAdmin === "admin") {
    next();
  } else {
    res.sendStatus(401);
  }
};

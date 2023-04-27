import session from "express-session";

export const createSession = session({
  secret: "batko",
  name: "session_id",
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000 * 5,
    secure: false,
  },
  saveUninitialized: true,
  resave: false,
});

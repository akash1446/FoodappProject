const cors = require("cors");

const allowedOrigins = [
  "https://foodapp-w2.netlify.app",
  "https://foodapp-project-umber.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  // add any preview URLs too, e.g.:
  // 'https://foodapp-project-git-main-anusakas-projects.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

const cors = require("cors");

const allowedOrigins = [
  "https://foodapp-w2.netlify.app",
<<<<<<< HEAD
  "https://foodapp-project-umber.vercel.app",
  "http://localhost:5173", // add this for local dev
  "http://localhost:3000", // add this too if you ever test on port 3000
  // add any preview URLs too, e.g.:
  // 'https://foodapp-project-git-main-anusakas-projects.vercel.app'
=======
  "http://localhost:5173",
>>>>>>> fa0c2e630b4f151658697811f4ff1b76ce784396
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
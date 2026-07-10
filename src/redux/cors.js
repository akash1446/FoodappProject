const cors = require("cors");

const allowedOrigins = [
  "https://foodapp-w2.netlify.app",
  "https://foodapp-project-umber.vercel.app",
  "http://localhost:5173", // add this for local dev
  "http://localhost:3000", // add this too if you ever test on port 3000
  // add any preview URLs too, e.g.:
  // 'https://foodapp-project-git-main-anusakas-projects.vercel.app'
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
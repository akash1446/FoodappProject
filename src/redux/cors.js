const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://foodapp-project-umber.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // only if you're using cookies/auth headers
  }),
);

const cors = require("cors");

const allowedOrigins = [
  "https://foodapp-project-umber.vercel.app",
  "https://foodapp-w2.netlify.app", // keep if still in use
  "http://localhost:5173", // for local dev, adjust port as needed
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
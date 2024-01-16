// import express from "express";

// const router = express.Router();

// router.get("/admin-page");

// export default router;
// Assuming this is your server-side route in admin.route.js
// import express from "express";

// const router = express.Router();

// router.get("/admin-page");

// export default router;

import express from "express";
import path from "path";

const router = express.Router();

router.get("/admin-page", (req, res) => {
  // Send the AdminPage HTML file or handle rendering logic here
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default router;

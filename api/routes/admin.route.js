// import express from "express";

// const router = express.Router();

// router.get("/admin-page");

// export default router;
// Assuming this is your server-side route in admin.route.js
import express from "express";

const router = express.Router();

router.get("/admin-page", (req, res) => {
  // Your logic for handling the request and sending a response
  res.send("This is the admin page!");
});

export default router;

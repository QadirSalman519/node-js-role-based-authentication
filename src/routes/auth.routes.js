import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ success: true, message: "Welcome Admin!" });
});

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    res.json({ success: true, message: "Dashboard for Admin & Manager" });
  }
);

export default router;

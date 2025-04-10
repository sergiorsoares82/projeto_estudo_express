import express from "express";
import status from "../pages/api/v1/status";

const router = express.Router();

// Import your routes here
// Example: import userRoutes from './userRoutes';
// router.use('/users', userRoutes);

router.get("/", (req, res) => {
  res.send("API is running");
});

router.get("/api/v1/status", status);

export default router;

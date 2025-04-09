import express from "express";

const router = express.Router();

// Import your routes here
// Example: import userRoutes from './userRoutes';
// router.use('/users', userRoutes);

router.get("/", (req, res) => {
  res.send("API is running");
});

export default router;

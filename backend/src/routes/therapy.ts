import { Router } from "express";
import { TherapyController } from "../controllers/therapyController";
import { validateRoomAndUser, validateRoom } from "../middleware/validation";

const router = Router();
const therapyController = new TherapyController();

// GET /api/next-question/:roomId/:userId
router.get(
  "/next-question/:roomId/:userId",
  validateRoomAndUser,
  therapyController.getNextQuestion.bind(therapyController)
);

// GET /api/feedback/:roomId
router.get(
  "/feedback/:roomId",
  validateRoom,
  therapyController.getFeedback.bind(therapyController)
);

// Debug endpoint to see user data (remove in production)
router.get(
  "/debug/:roomId/:userId",
  validateRoomAndUser,
  therapyController.debugUserData.bind(therapyController)
);

export default router;

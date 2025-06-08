import { Request, Response, NextFunction } from "express";

export const validateRoomAndUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { roomId, userId } = req.params;

  if (!roomId || typeof roomId !== "string" || roomId.trim().length === 0) {
    res.status(400).json({ error: "Valid Room ID is required" });
    return;
  }

  if (userId && (typeof userId !== "string" || userId.trim().length === 0)) {
    res.status(400).json({ error: "Valid User ID is required" });
    return;
  }

  next();
};

export const validateRoom = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { roomId } = req.params;

  if (!roomId || typeof roomId !== "string" || roomId.trim().length === 0) {
    res.status(400).json({ error: "Valid Room ID is required" });
    return;
  }

  next();
};

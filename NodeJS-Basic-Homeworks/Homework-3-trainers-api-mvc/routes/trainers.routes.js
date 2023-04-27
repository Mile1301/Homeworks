import { Router } from "express";
import { TrainerController } from "../controllers/trainers.controllers.js";
export const trainerRouter = Router();

// 1.Get all trainers
trainerRouter.get("/", TrainerController.getAllTrainers);
// 2.Get trainer by ID
trainerRouter.get("/:id", TrainerController.getTrainerByID);
// 3.Create trainer
trainerRouter.post("/", TrainerController.createTrainer);
// 4.Update Traienr
trainerRouter.patch("/:id", TrainerController.updateTrainer);
// 5.Delete trainer by ID
trainerRouter.delete("/:id", TrainerController.deleteTrainerByID);
// 6.Delete all trainers
trainerRouter.delete("/", TrainerController.deleteAllTrainers);

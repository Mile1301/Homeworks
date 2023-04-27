import { Router } from "express";
import { StudentsController } from "../controllers/students.controller.js";
import { roleValidator } from "../middlewares/middlewares.js";
import { catchAsync } from "../utils/utils.js";
export const studentsRoute = Router();

studentsRoute
  .route("/")
  .get(catchAsync(StudentsController.getAllStudents))
  .post(catchAsync(StudentsController.createStudent))
  .delete(catchAsync(StudentsController.deleteAllStudents));
studentsRoute
  .route("/:id")
  .get(catchAsync(StudentsController.getStudentByID))
  .patch(roleValidator, catchAsync(StudentsController.updateStudent))
  .delete(catchAsync(StudentsController.deleteStudent));

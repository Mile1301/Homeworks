import { Router } from "express";
import { StudentsController } from "../controllers/students.controller.js";
import { catchAsync } from "../utils/utils.js";
export const studentsRouter = Router();

studentsRouter
  .route("/")
  .get(catchAsync(StudentsController.getAllStudents)) // 1.Get all students
  .post(catchAsync(StudentsController.createStudent)) // 3.Create student
  .delete(catchAsync(StudentsController.deleteAllStudents)); // 6.Delete all students

studentsRouter
  .route("/:id")
  .get(catchAsync(StudentsController.getStudentByID)) // 2.Get students by ID
  .patch(catchAsync(StudentsController.updateStudent)) // 4.Update student
  .delete(catchAsync(StudentsController.deleteStudent)); // 5.Delete student
